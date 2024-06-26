import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { useNavigate, useParams } from 'react-router-dom';
import Dashboard from './Dashboard';

const UpdateProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateCampaign, getCampaignById } = useStateContext();
    const [Form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        imageUrl: '',
        deadline: ''
    });

    useEffect(() => {
        const fetchCampaign = async () => {
            const campaign = await getCampaignById(id);
            setForm({
                name: campaign.name,
                title: campaign.title,
                description: campaign.description,
                imageUrl: campaign.image,
                deadline: new Date(campaign.deadline * 1000).toISOString().substring(0, 10)
            });
        };

        fetchCampaign();
    }, [id, getCampaignById]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCampaign(id, { ...Form });
        navigate('/dashboard');
    };

    return (
        <div>
            <Dashboard />
            <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 `}>
                <div className="bg-white drop-shadow-xl shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-black">
                                Обновити дані
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <div className="rounded-xl overflow-hidden h-[100px] w-[100px]">
                                <img src={Form.imageUrl || 'https://i0.wp.com/living.ai/wp-content/uploads/2020/12/product2.jpg?fit=1024%2C1024&ssl=1'}
                                    alt="project title"
                                    className="h-full w-full object-cover cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-yellow-300 rounded-xl mt-5 p-2">
                            <input className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
                                type="text"
                                name="name"
                                placeholder="name"
                                value={Form.name}
                                onChange={(e) => setForm({ ...Form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center bg-yellow-300 rounded-xl p-2 mt-5">
                            <input className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
                                type="text"
                                name="title"
                                placeholder="title"
                                value={Form.title}
                                onChange={(e) => setForm({ ...Form, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center bg-yellow-300 rounded-xl p-3 mt-5">
                            <input
                                className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
                                type="date"
                                name="deadline"
                                placeholder="Expires"
                                value={Form.deadline}
                                onChange={(e) => setForm({ ...Form, deadline: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center bg-yellow-300 rounded-xl p-2 mt-5">
                            <input className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
                                type="url"
                                name="imageURL"
                                placeholder="Image URL"
                                value={Form.imageUrl}
                                onChange={(e) => setForm({ ...Form, imageUrl: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center bg-yellow-300 rounded-xl p-5 mt-5">
                            <textarea className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
                                type="text"
                                name="description"
                                placeholder="description"
                                value={Form.description}
                                onChange={(e) => setForm({ ...Form, description: e.target.value })}
                                required>
                            </textarea>
                        </div>
                        <button type="submit" className="inline-block px-6 py-2.5 bg-yellow-700 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-yellow-800 mt-5">
                            Обновити дані
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProject;
