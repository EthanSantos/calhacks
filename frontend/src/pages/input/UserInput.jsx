import { useState } from 'react';
import { getCompletion } from '../../helper/geminiAiService';

const UserInput = () => {

    const [page, setPage] = useState(0)

    // personal
    const [name, setName] = useState(''); // Rian Corcino
    const [profession, setProfession] = useState(''); // Instagram influencer
    const [services, setServices] = useState(''); // Instagram reels

    const [startDate, setStartDate] = useState(''); // 6/12
    const [endDate, setEndDate] = useState('');
    const [checkIns, setCheckIns] = useState('');

    const [yearsOfExp, setYearsOfExp] = useState(0);
    const [payment, setPayment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPage(page + 1)

        console.log('Name:', name);
        console.log('Profession:', profession);
        console.log('Services:', services);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Check-Ins:', checkIns);
        console.log('Years of Experience:', yearsOfExp);
        console.log('Payment:', payment);
        // we will send this to the chatgpt api here
        // upload to database aswell

        try {
            const completion = await getCompletion("This is a test. What is 5 + 5?"); // put prompt here
            console.log(completion)
          } catch (error) {
            console.error('Error fetching completion:', error);
          }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            {page === 0 && <div>
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
            </div>}

            {page === 1 && <div>
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
                <div className="mb-4">
                    <label htmlFor="checkIns" className="block text-gray-700 font-bold mb-2">Check-Ins:</label>
                    <input
                        type="text"
                        id="checkIns"
                        value={checkIns}
                        onChange={(e) => setCheckIns(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>}

            {page === 2 && <div>
                <h1 className="text-2xl font-bold mb-4">Experience and Payment</h1>
                <div className="mb-4">
                    <label htmlFor="yearsOfExp" className="block text-gray-700 font-bold mb-2">Years of Experience:</label>
                    <input
                        type="number"
                        id="yearsOfExp"
                        value={yearsOfExp}
                        onChange={(e) => setYearsOfExp(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
            </div>}

            {page === 2 ? (
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            ) : (
                <button type="next" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Next
                </button>
            )}

        </form>
    );
};

export default UserInput;
