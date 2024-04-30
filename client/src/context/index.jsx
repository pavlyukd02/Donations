import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useConnect, ConnectWallet, metamaskWallet, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x6881999E8e717f3b4dc6f4Ad2BB183dDB356550c');
    const { mutateAsync: createCompaign } = useContractWrite(contract, 'createCampaign');
    const { mutateAsync: updateForm } = useContractWrite(contract, 'updateCampaign');



    const address = useAddress();
    const connect = useConnect();

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

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const updateCampaign = async (form) => {
        try {
            const data = await updateForm({
                args: [
                    id = pId,
                    form.name, // owner
                    form.title, // title
                    form.description,
                    form.imageUrl,// description
                    new Date(form.deadline).getTime(), // deadline,
                    console.log("functioт call success", data)


                ],
            });

        } catch (error) {
            console.log("function call failure", error)
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.collectedAmount.toString()),
            image: campaign.imageUrl,
            pId: i
        }))

        return (parsedCampaigns)
    }

    const getUserCampaigns = async () => {

        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) =>
            campaign.owner === address);

        return filteredCampaigns;


    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donate', [pId], { value: ethers.utils.parseEther(amount) });

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonations', [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString)
            })
        }
        return parsedDonations;
    }





    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCompaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                updateCampaign


            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);