import { useState } from 'react';
import { getCompletion } from '../../helper/geminiAiService';
import UrComponent from './UrComponent.jsx';
import Loading from '../Loading.jsx';

const UserInput = () => {

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);

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
        setLoading(true);
        setPage(page + 1);

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
        const sections = [
            "Introduction",
            "Scope of Work",
            "Payment Terms",
            "Deliverables",
            "Timeline",
            "Intellectual Property",
            "Termination"
        ];
        sections.forEach(async (sections) => {
            console.log(sections)
            let completion
            try {
                completion = await getCompletion(`
                    Generate the "${sections}" section of the contract. Return a string response. Use these parameters:
                    Name: ${name}
                    Profession: ${profession}
                    Services: ${services}
                    Start Date: ${startDate}
                    End Date: ${endDate}
                    Payment: ${payment}
                `);
                
            } catch (error) {
                console.error(`Error generating "${sections}" section:`, error);
            } finally {
                setContent(prevContent => [...prevContent, completion, ]);
                setLoading(false)
            }
        });
        // let completion

        // try {
        //     const c1 = await getCompletion(`
        //         Create a contract for a user who is offering their services to a client. Return a string response. Use these parameters:
        //         Name: ${name}
        //         Profession: ${profession}
        //         Services: ${services}
        //         Start Date: ${startDate}
        //         End Date: ${endDate}
        //         Payment: ${payment}
        //     `)
        // }

        // try {
        //     // Replace the actual user input with mock data for testing purposes
        //     completion = await getCompletion(`
        //         Create a contract for a user who is offering their services to a client. Return a string response. Use these parameters:
        //         Name: ${name}
        //         Profession: ${profession}
        //         Services: ${services}
        //         Start Date: ${startDate}
        //         End Date: ${endDate}
        //         Payment: ${payment}
        //         `); // specify token count here
            
        //     console.log(completion);
        // } catch (error) {
        //     console.error('Error fetching completion:', error);
        // } finally {
        //     setContent(completion);
        //     setLoading(false);
        // }
    };

    const handleNext = (e) => {
        e.preventDefault();
        setPage(page + 1);
    };

    return (
        <div className="flex flex-row justify-center items-center h-screen">
            <UrComponent />
            <div className="relative flex justify-left items-center">
                <img src={'./src/pics/anim1.png'} alt="Anim1" className="anim1 h-[650px] w-auto ml-[150px]"/>
                <img src={'./src/pics/anim2.png'} alt="Anim2" className="anim2 h-[450px] w-auto"/>
            </div>
            <div className='flex justify-center align-center h-full w-full ml-[250px] p-[150px] bg-gray rounded-[30px]'>
                <form onSubmit={page === 2 ? handleSubmit : handleNext} className='flex flex-col justify-center align-center max-w-auto'>
                {/* {loading && <p>Loading...</p>} */}
                {loading && <Loading />}

                {!loading && content && 
                
                Array.isArray(content) && content.map((para, index) => (
                    <div key={index} >
                        <p key={index}>{para}</p><br/>
                    </div>
                ))}
                    {page === 0 && (
                        <div>
                            <h1 className="flex text-5xl font-bold mb-4 text-blue text-shadow-custom justify-center align-center">Let's get to know you!</h1>
                            <h1 className="flex justify-center align-center text-3xl mb-4 text-blue">Part A: Bio</h1>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-white font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <div className="mb-4">
                                <label htmlFor="checkIns" className="block text-white font-bold mb-4">Check-Ins</label>
                                <input
                                    type="text"
                                    id="checkIns"
                                    value={checkIns}
                                    onChange={(e) => setCheckIns(e.target.value)}
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
                                <label htmlFor="yearsOfExp" className="block text-white font-bold mb-4">Years of Experience</label>
                                <input
                                    type="number"
                                    id="yearsOfExp"
                                    value={yearsOfExp}
                                    onChange={(e) => setYearsOfExp(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="payment" className="block text-white font-bold mb-4">Payment</label>
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
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red to-blue rounded-lg blur opacity-75"></div>
                            <button onClick={handleNext} className="relative w-full bg-black text-2xl text-white font-bold py-4 rounded-md
                            group-hover:bg-blue group-hover:text-black transition-colors duration-300 ease-in-out">
                                Next
                            </button>
                        </div>
                        
                    )}
                    {page === 2 && (
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red to-blue rounded-lg blur opacity-75"></div>
                            <button type="submit" className="relative w-full bg-black text-white text-2xl font-bold py-4 rounded-md
                            group-hover:bg-blue group-hover:text-black transition-colors duration-300 ease-in-out">
                            Submit
                        </button>
                        </div>
                    )}
                </form>
                
            </div>
        </div>
    );
};

export default UserInput;
