import React from 'react';
import { DisplayCampaigns } from '../components';

const HomeCampaigns = ({ isLoading, campaigns }) => {

    const limitedCampaigns = campaigns.slice(0, 3);

    return (
        <div className='flex justify-center gap-[30px]  font-montserrat'> 
            <DisplayCampaigns
                title="Найвідоміщі фонди "
                isLoading={isLoading}
                campaigns={limitedCampaigns}
            />
        </div>
    );
};

export default HomeCampaigns;
