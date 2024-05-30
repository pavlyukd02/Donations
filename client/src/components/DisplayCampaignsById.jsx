import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplayCampaigns from '../components/DisplayCampaigns';

function DisplayCampaignsById() {

  const [isLoading, setisLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getUserCampaigns} = useStateContext();


  const fetchCampaigns = async () => {
    setisLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setisLoading(false);

  }


  useEffect(() => {
    if (contract) fetchCampaigns();

  }, [address, contract])

  return (
    <div>
      <DisplayCampaigns
        title="All campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  )
}

export default DisplayCampaignsById