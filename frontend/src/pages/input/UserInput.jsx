import { useState } from 'react';
import { getCompletion } from '../../helper/geminiAiService';
import Contract from '../contract/Contract';
import Loading from '../loading/Loading';

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
            {loading && <Loading />}
            {/* {loading && <p>Loading...</p>} */}
            {!loading && contractData.length === 0 && (
                <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                    <form onSubmit={page === 2 ? handleSubmit : handleNext}>
                        {page === 0 && (
                            <div>
                                <h1 className="text-2xl font-bold mb-4">Personal</h1>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="profession" className="block text-gray-700 font-bold mb-2">Profession:</label>
                                    <input
                                        type="text"
                                        id="profession"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="services" className="block text-gray-700 font-bold mb-2">Services:</label>
                                    <textarea
                                        id="services"
                                        value={services}
                                        onChange={(e) => setServices(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                        {page === 1 && (
                            <div>
                                <h1 className="text-2xl font-bold mb-4">Timeline</h1>
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Start Date:</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">End Date:</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                        {page === 2 && (
                            <div>
                                <h1 className="text-2xl font-bold mb-4">Payment</h1>
                                <div className="mb-4">
                                    <label htmlFor="payment" className="block text-gray-700 font-bold mb-2">Payment:</label>
                                    <input
                                        type="text"
                                        id="payment"
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                        {page < 2 && (
                            <button onClick={handleNext} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Next
                            </button>
                        )}
                        {page === 2 && (
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            )}
            {!loading && contractData.length > 0 && (
                <Contract headers={sections} contractData={contractData} />
            )}
        </>
    );
};

export default UserInput;