import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x6881999E8e717f3b4dc6f4Ad2BB183dDB356550c');
  const { mutateAsync: createCompaign } = useContractWrite(contract, 'createCampaign');
  const { mutateAsync: updateForm } = useContractWrite(contract, 'updateCampaign');
  const { mutateAsync: doWithdraw } = useContractWrite(contract, 'withdraw');
  const { mutateAsync: closeCompaign } = useContractWrite(contract, 'closeCampaign');

  const address = useAddress();
  const connect = useMetamask();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  useEffect(() => {
    if (address) fetchBalance();
  }, [address]);


  const getWithdraw = async (pId, amount) => {
    try {
      const data = await doWithdraw({
        args: [pId, ethers.utils.parseEther(amount)]
      });
      console.log("Withdraw success", data);
    } catch (error) {
      console.log("Withdraw failure", error);
    }
  }
  const publishCampaign = async (form) => {
    try {
      const data = await createCompaign({
        args: [
          form.name, // owner
          form.title, // title
          form.description,
          form.imageUrl,// description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const closeCampaign = async (pId) => {
    try {
      await closeCompaign({
        args: [pId],
      });
    } catch (error) {
      console.log("closeCampaign failure", error);
    }
  };

  const updateCampaign = async (pId, form) => {
    try {
      await updateForm({
        args: [
          pId,
          form.name, // owner
          form.title, // title
          form.description,
          form.imageUrl,// description
          new Date(form.deadline).getTime(), // deadline,
        ],
      });
    } catch (error) {
      console.log("function call failure", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call('getCampaigns');
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const parsedCampaigns = campaigns
        .filter(campaign => campaign.deadline > currentTimestamp) 
        .map((campaign, i) => ({
          owner: campaign.owner,
          name: campaign.name,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.collectedAmount.toString()),
          withdrawedAmount: ethers.utils.formatEther(campaign.withdrawedAmount.toString()),
          image: campaign.imageUrl,
          pId: i
        }));
      return parsedCampaigns;
    } catch (error) {
      console.error("Error in getCampaigns:", error);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) =>
      campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call('donate', [pId], { value: ethers.utils.parseEther(amount) });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonations', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect: () => window.ethereum.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: {} }] }), // Assuming you want to use disconnect like this
        balance,
        createCompaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        updateCampaign,
        getWithdraw, 
        closeCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
