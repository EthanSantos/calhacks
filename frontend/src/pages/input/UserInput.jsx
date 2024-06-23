import { useState } from 'react';
import { getCompletion } from '../../helper/geminiAiService';
import UrComponent from './UrComponent.jsx';
import Contract from '../contract/Contract';
import Loading from '../loading/Loading.jsx';

const UserInput = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [contractData, setContractData] = useState([]);

    const sections = [
        "Introduction",
        "Scope of Work",
        "Payment Terms",
        "Deliverables",
        "Timeline",
        "Intellectual Property",
        "Termination"
    ];

    const [name, setName] = useState('');
    const [profession, setProfession] = useState(''); 
    const [services, setServices] = useState(''); 
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');
    const [payment, setPayment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const contractSections = [];
    
        try {
            for (const section of sections) {
                const completion = await getCompletion(`
                    Generate the "${section}" section of the contract. Return a string response. Use these parameters:
                    Name: ${name}
                    Profession: ${profession}
                    Services: ${services}
                    Start Date: ${startDate}
                    End Date: ${endDate}
                    Payment: ${payment}
                `);
                
                contractSections.push(completion);
            }
    
            setContractData(contractSections);
            setLoading(false);
        } catch (error) {
            console.error('Error generating contract sections:', error);
            setContractData([]); // Clear contract data on error
            setLoading(false);
        }
    };    

    const handleNext = (e) => {
        e.preventDefault();
        setPage(page + 1);
    };

    return (
        <>
        <div className="flex flex-row justify-center items-center h-screen">
            <UrComponent />
            <div className="relative flex justify-left items-center">
                <img src={'./src/pics/anim1.png'} alt="Anim1" className="anim1 h-[650px] w-auto ml-[150px]"/>
                <img src={'./src/pics/anim2.png'} alt="Anim2" className="anim2 h-[450px] w-auto"/>
            </div>

            {loading && <p>Loading...</p>}
            {!loading && contractData.length === 0 && (
            <div className='flex justify-center align-center h-full w-full ml-[250px] p-[150px] bg-gray rounded-[30px]'>
                <form onSubmit={page === 2 ? handleSubmit : handleNext}>
                        {page === 0 && (
                            <div>
                                <h1 className="flex text-5xl font-bold mb-4 text-blue text-shadow-custom justify-center align-center">Let's get to know you!</h1>
                                <h1 className="flex justify-center align-center text-3xl mb-4 text-blue">Part A Bio</h1>                                
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-white font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="profession" className="block text-white font-bold mb-2">Profession</label>
                                    <input
                                        type="text"
                                        id="profession"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                </div>
                                <div className="mb-4">
                                <label htmlFor="services" className="block text-white font-bold mb-2">Services</label>
                                    <textarea
                                        id="services"
                                        value={services}
                                        onChange={(e) => setServices(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                        {page === 1 && (
                            <div>
                            <h1 className="flex text-5xl font-bold mb-4 text-blue text-shadow-custom justify-center align-center">Let's get to know you!</h1>
                            <h1 className="flex justify-center align-center text-3xl mb-4 text-blue">Part B: Timeline</h1>
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="block text-white font-bold mb-4">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block text-white font-bold mb-4">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                </div>
                            </div>
                        )}
                        {page === 2 && (
                            <div>
                                <h1 className="flex text-5xl font-bold mb-4 text-blue text-shadow-custom justify-center align-center">Let's get to know you!</h1>
                                <h1 className="flex justify-center align-center text-3xl mb-4 text-blue">Part C: Experience and Payment</h1>
                                <div className="mb-4">
                                    <label htmlFor="payment" className="block text-white font-bold mb-4">Pay rate</label>
                                    <input
                                        type="text"
                                        id="payment"
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                </div>
                            </div>
                        )}
                        {page < 2 && (
                            <div className="relative group mt-10">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red to-blue rounded-lg blur opacity-75"></div>
                                <button onClick={handleNext} className="relative w-full bg-black text-2xl text-white font-bold py-4 rounded-md
                                group-hover:bg-blue group-hover:text-black transition-colors duration-300 ease-in-out">
                                    Next
                                </button>
                            </div>
                        )}
                        {page === 2 && (
                            <div className="relative group mt-10">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red to-blue rounded-lg blur opacity-75"></div>
                                <button type="submit" className="relative w-full bg-black text-white text-2xl font-bold py-4 rounded-md
                                group-hover:bg-blue group-hover:text-black transition-colors duration-300 ease-in-out">
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            )}
            {!loading && contractData.length > 0 && (
                <Contract headers={sections} contractData={contractData} />
            )}
            </div>
        </>
    );
};

export default UserInput;