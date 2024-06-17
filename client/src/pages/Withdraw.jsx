import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { Navbar } from '../components';

const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [selectedCampaignId, setSelectedCampaignId] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const { getWithdraw, address, contract, getUserCampaigns } = useStateContext();

    const { id } = useParams();

    const handleWithdraw = async () => {
        if (!selectedCampaignId) {
            alert('Please select a campaign');
            return;
        }
        await getWithdraw(selectedCampaignId, amount);
        setAmount(''); // Очистить поле ввода после выполнения вывода
    };

    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    useEffect(() => {
        if (selectedCampaignId) {
            const campaign = campaigns.find(c => c.id === selectedCampaignId);
            setSelectedCampaign(campaign);
        }
    }, [selectedCampaignId, campaigns]);

    return (
        <div className="">
            <div className='bg-[#5C2E2E] p-4'>
                <Navbar />
            </div>

            <div className='flex'>
                <aside id="default-sidebar" className="top-0 left-0 w-64 h-[1000px] transition-transform" aria-label="Sidebar">
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

                <main className='flex-1 px-14 py-10 bg-gray-100'>
                    <h1 className="text-3xl font-bold mb-6">Вивід грошей</h1>
                    <div className="p-4 shadow-2xl rounded-xl w-[50%]">
                        <h2 className="text-black text-lg font-semibold mb-4">Виведіть збереження</h2>
                        <select
                            value={selectedCampaignId}
                            onChange={(e) => setSelectedCampaignId(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                        >
                            <option value="">Виберіть фонд</option>
                            {campaigns.map((campaign) => (
                                <option key={campaign.id} value={campaign.id}>
                                    {campaign.title} (ID: {campaign.id}) ETH: {campaign.amountCollected - campaign.withdrawedAmount}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Кількість грошей для виводу (ETH)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                        <button
                            onClick={handleWithdraw}
                            className="w-full p-2 bg-[#1dc071] hover:bg-[#46b842] text-white font-bold rounded"
                        >
                            Вивести
                        </button>
                        {selectedCampaign && (
                            <div className="mt-4 text-black">
                                <p>Всього зібрано: {selectedCampaign.amountCollected} ETH</p>
                                <p>Доступно для виводу: {selectedCampaign.amountCollected - selectedCampaign.withdrawedAmount} ETH</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Withdraw;
