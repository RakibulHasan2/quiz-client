/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */

import { useNavigate } from 'react-router-dom';
import './LeaderBoard.css'
import { useUserData } from '../../Hooks/Hooks';
import { useQuery } from 'react-query';
import ScrollToTop from 'react-scroll-to-top';
import up from '../../images/logo/4902548424a02117b7913c17d2e379ff.gif'
const LeaderBoard = () => {
    const navigate = useNavigate();
    const userData = useUserData();

    const { data: allResult = [] } = useQuery({
        queryKey: ['allProfile'],
        queryFn: async () => {
            const res = await fetch(`https://localhost:7274/api/Result/Fetch`);
            const data = await res.json();
            return data;
        }
    });

    const computerNetworks = allResult.filter(computer => computer?.categoryName === 'Computer networks');
    computerNetworks.sort((a, b) => b.score - a.score);
    const categoryName1 = computerNetworks[0]?.categoryName


    const visualProgamming = allResult.filter(visual => visual?.categoryName === 'Visual Progamming');
    visualProgamming.sort((a, b) => b.score - a.score);
    const categoryName2 = visualProgamming[0]?.categoryName

    const java = allResult.filter(jav => jav?.categoryName === 'Java');
    java.sort((a, b) => b.score - a.score);
    const categoryName3 = java[0]?.categoryName


    const operatingSystems = allResult.filter(ops => ops?.categoryName === 'Operating Systems');
    operatingSystems.sort((a, b) => b.score - a.score);
    const categoryName4 = operatingSystems[0]?.categoryName

    const dataStructur = allResult.filter(data => data?.categoryName === 'Data structure & algorithms');
    dataStructur.sort((a, b) => b.score - a.score);
    const categoryName5 = dataStructur[0]?.categoryName
    console.log(dataStructur.length)

    const machineLearning = allResult.filter(ml => ml?.categoryName === 'Machine learning');
    machineLearning.sort((a, b) => b.score - a.score);
    const categoryName6 = machineLearning[0]?.categoryName




    if (!userData) {
        navigate('/');
    }

    return (
        <div className="pt-20 leader-container">
            <ScrollToTop smooth top="500" 
        component={<img className='bg-lime-200 rounded-xl' src={up}/>}
        width="50"/>
             <div className="flex justify-center">
                <div className='mb-20 mt-14 leader-content animate__animated animate__backInRight'>
                    <h1 className="uppercase">Leader_board</h1>
                    <h1 className="uppercase">Leader_board</h1>
                </div>
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {computerNetworks?.length > 0 &&
                    <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                        <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                            "{categoryName1}" Leader board
                        </div>
                        {computerNetworks?.map((computer, index) => (
                            <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                                <p>Rank: {index + 1}</p>
                                <p>Category: {computer?.categoryName}</p>
                                <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                                <p>Score: {computer?.score}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {visualProgamming?.length > 0 &&
                    <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                        <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                            "{categoryName2}" Leader board
                        </div>
                        {visualProgamming?.map((computer, index) => (
                            <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                                <p>Rank: {index + 1}</p>
                                <p>Category: {computer?.categoryName}</p>
                                <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                                <p>Score: {computer?.score}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {java.length > 0 &&
                    <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                        <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                            "{categoryName3}" Leader board
                        </div>
                        {java?.map((computer, index) => (
                            <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                                <p>Rank: {index + 1}</p>
                                <p>Category: {computer.categoryName}</p>
                                <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                                <p>Score: {computer.score}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {operatingSystems.length > 0 &&
                    <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                        <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                            "{categoryName4}" Leader board
                        </div>
                        {operatingSystems?.map((computer, index) => (
                            <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                                <p>Rank: {index + 1}</p>
                                <p>Category: {computer.categoryName}</p>
                                <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                                <p>Score: {computer.score}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {dataStructur.length > 0 && <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                    <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                        "{categoryName5}" Leader board
                    </div>
                    {dataStructur?.map((computer, index) => (
                        <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                            <p>Rank: {index + 1}</p>
                            <p>Category: {computer.categoryName}</p>
                            <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                            <p>Score: {computer.score}</p>
                        </div>
                    ))}
                </div>}
            </div>
            <div className='flex justify-center animate__animated animate__backInUp'>
                {machineLearning.length > 0 && <div className='w-10/12 p-5 mb-10 shadow-2xl computer-bg bg-lime-300 rounded-2xl'>
                    <div className='flex justify-center mb-5 text-3xl italic font-bold'>
                        "{categoryName6}" Leader board
                    </div>
                    {machineLearning?.map((computer, index) => (
                        <div key={index} className="flex justify-between p-4 mt-2 italic font-bold shadow-2xl bg-lime-100 rounded-xl score-entry">
                            <p>Rank: {index + 1}</p>
                            <p>Category: {computer.categoryName}</p>
                            <p> {userData?.userName === computer?.userName ? "you" : `${computer?.userName}`}</p>
                            <p>Score: {computer.score}</p>
                        </div>
                    ))}
                </div>}
            </div>

        </div>
    );
};

export default LeaderBoard;
