import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplayCampaigns from '../components/DisplayCampaigns';

function Home() {

  const [isLoading, setisLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getCampaigns } = useStateContext();


  const fetchCampaigns = async () => {
    setisLoading(true);
    const data = await getCampaigns();
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

export default Home