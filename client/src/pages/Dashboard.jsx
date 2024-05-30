import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import { daysLeft } from '../utils';
import { Navbar } from '../components';

const Dashboard = () => {
    const [isLoading, setisLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const { address, contract, getUserCampaigns, closeCampaign } = useStateContext();

    const { state } = useLocation();

    const navigate = useNavigate();


    const handleNavigate = (campaign) => {
        navigate(`/update-project/${campaign.pId}`, { state: campaign })
    }

    const fetchCampaigns = async () => {
        setisLoading(true);
        const data = await getUserCampaigns();
        setCampaigns(data);
        setisLoading(false);
    };

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);



    const handleDelete = async (pId) => {
        try {
            console.log("Closing campaign with ID:", pId);
            await closeCampaign(pId);
            console.log("Campaign closed successfully");
            setCampaigns(campaigns.filter(campaign => campaign.pId !== pId));
        } catch (error) {
            console.error("Failed to close campaign:", error);
        }
    };

    return (
        <div>
            <div className='bg-[#5C2E2E] p-4'>
                <Navbar />
            </div>

            <div className="flex min-h-screen bg-gray-100">
                <aside id="default-sidebar" className="top-0 left-0 w-64 transition-transform" aria-label="Sidebar">
                    <div className="h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/withdraw" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Вивід грошей</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Мої фонди</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <main className="flex-1 p-8 sm:ml-5">
                    <h1 className="text-3xl font-bold mb-6">Мої фонди</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Картинка</th>
                                    <th scope="col" className="px-6 py-3">Ім'я</th>
                                    <th scope="col" className="px-6 py-3">Статус</th>
                                    <th scope="col" className="px-6 py-3">Дедлайн</th>
                                    <th scope="col" className="px-6 py-3">Баланс (ETH)</th>
                                    <th scope="col" className="px-6 py-3">Зміни</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.pId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            <img src={campaign.image} alt={campaign.title} className="w-16 h-16 object-cover rounded" />
                                        </td>
                                        <td className="px-6 py-4">{campaign.title}</td>
                                        <td className="px-6 py-4">{campaign.status || 'Active'}</td>
                                        <td className="px-6 py-4">{daysLeft(campaign.deadline)}</td>
                                        <td className="px-6 py-4">{campaign.amountCollected}</td>
                                        <td className="px-6 py-4">
                                            <div className='flex flex-row gap-4'>
                                                <div>
                                                    <button className='hover:text-green-500 translate hover:scale-110 hover:font-semibold' onClick={() => handleNavigate(campaign)}>Edit</button>
                                                </div>
                                                <div>
                                                    <button className='hover:text-red-500 translate hover:scale-110 hover:font-semibold' onClick={() => handleDelete(campaign.pId)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-l-lg">1</button>
                        <button className="px-4 py-2 bg-green-200 text-green-800">2</button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
