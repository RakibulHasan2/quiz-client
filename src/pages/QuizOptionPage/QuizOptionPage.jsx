/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuizOptionPage.css';
import { useUserData } from './../../Hooks/Hooks';
import { useToasts } from 'react-toast-notifications';
import { useQuery } from 'react-query';

const QuizOptionPage = () => {
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const { getByCatName } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const userData = useUserData()
    const [questionsWithSingleCorrectOption, setQuestionsWithSingleCorrectOption] = useState(0);
   if(!userData){
        navigate('/')
   }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7274/api/Question/getByCatName/${getByCatName}`);
                const data = await response.json();
                setQuestions(data);
                const initialSelectedOptions = {};
                const initialCorrectAnswers = {};
                data.forEach(question => {
                    initialSelectedOptions[question.questionID.
                        increment] = null;
                    initialCorrectAnswers[question.questionID.
                        increment] = question.answer;
                });
                setSelectedOptions(initialSelectedOptions);
                setCorrectAnswers(initialCorrectAnswers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getByCatName]);

    const handleOptionSelect = (questionId, option) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionId]: option,
        }));
    };

    const handleSubmit = async () => {
        // Check if any of the selected options are null
        const isAnyOptionNull = Object.values(selectedOptions).some(option => option === null);

        // If any option is null, display an error message and return early
        if (isAnyOptionNull) {
            addToast('Please answer all questions otherwise you cannot submit answers to questions', { appearance: 'warning' })
            return;
        }
        function generateRandom10DigitNumber() {
            // Generate a random number between 1 and 9999999999
            const random10DigitNumber = Math.floor(Math.random() * 1e10);
            // Convert the number to a string
            const randomNumberString = random10DigitNumber.toString();
            // Pad the string with leading zeros if necessary to make it 10 digits
            return randomNumberString.padStart(10, '0');
        }
        const optionSelectedData = {
            _id: generateRandom10DigitNumber(),
            selectedOptions,
            categoryName: getByCatName,
            userName: userData.userName,
            userPhoneNumber: userData.phoneNumber,
            score: ""
        };
        console.log(optionSelectedData);

        try {
            const response = await fetch('https://localhost:7274/api/Result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(optionSelectedData)
            });

            const responseResultData = await response.json();
            console.log(responseResultData)

            if (responseResultData) {
                addToast(`your ${getByCatName} Quizes submited successfully`, { appearance: 'success' })
            }
            else {
                addToast(`your ${getByCatName} Quizes fail to submit`, { appearance: 'error' })
            }

        } catch (error) {
            console.error('Error submitting answers:', error);
            addToast('internal server error', { appearance: 'error' })
        }
    };


    const { data: finalResult = [] } = useQuery({
        queryKey: ['finalResult'],
        queryFn: async () => {
            const res = await fetch(`https://localhost:7274/api/Result/getByCatName/${getByCatName}`);
            const data = await res.json();
            return data;
        }
    });
    const filterFinalResult = finalResult.filter(res => res?.userPhoneNumber === userData?.phoneNumber)
    console.log(filterFinalResult[0]?.score)
    const getCorrectAnswer = (questionId) => {
        const correctAnswer = questions.find(question => question.questionID.increment === questionId)?.answer;
        return correctAnswer;
    };

    const phoneNumber = filterFinalResult?.map(result => result?.userPhoneNumber).join(', ')

    useEffect(() => {
        let count = 0;
        questions.forEach(question => {
            const correctAnswer = getCorrectAnswer(question.questionID.increment);
            const isCorrect = finalResult.some(result => result.selectedOptions[question.questionID.increment] === correctAnswer);
            const numCorrectOptions = ['option1', 'option2', 'option3', 'option4'].reduce((acc, optionKey) => {
                if (question[optionKey] === correctAnswer) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            if (isCorrect && numCorrectOptions === 1) {
                count++;
            }
        });
        setQuestionsWithSingleCorrectOption(count);
    }, [questions, finalResult]);

    const handleViewScore = async () => {
        const scoreData = {
            resultID: "",
            selectedOptions,
            categoryName: getByCatName,
            userName: userData.userName,
            userPhoneNumber: userData.phoneNumber,
            score: `${questionsWithSingleCorrectOption}`
        }

        try {
            const response = await fetch(`https://localhost:7274/api/Result/${filterFinalResult[0]?.resultID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scoreData)
            });

            const responseResultData = await response.json();
            console.log(responseResultData)

            if (responseResultData) {
                console.log("score added")
                window.location.reload()
            }
            else {
                console.log('score did not added')
            }

        } catch (error) {
            console.error('Error submitting answers:', error);
            addToast('internal server error', { appearance: 'error' })
        }

    }


    return (
        <div className='pt-20 quiz-option-container'>
            <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
                <h1>{getByCatName}</h1>
            </div>
            <div className='flex justify-center mb-10 font-bold text-green-700'>
                {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber ?
                    <div> <h1 className='text-2xl animate__animated animate__bounceInRight'>You have already taken the {getByCatName} Quiz</h1>
                       {filterFinalResult[0]?.score === "" ? <div className='flex justify-center mt-5'>
                            <button onClick={handleViewScore} className='score-btn'>view score<span></span></button>
                        </div> : <></>}
                    </div> : <></>}
            </div>
            {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber &&
                <div className='flex justify-center mb-5'>
                   {filterFinalResult[0]?.score != "" ? 
                   <div className='p-5 text-2xl bg-transparent rounded-md shadow-2xl backdrop-blur-2xl animate__animated animate__bounceIn'>
                         <p>Your Score: {questionsWithSingleCorrectOption}/{questions.length}</p>
                    </div>:<></>}  
                </div>}
                {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber &&

                <div className='flex justify-center mt-5 mb-5 italic animate__animated animate__bounceInLeft'>
                    <p>[Note: If you have not answered a question correctly then the correct answer option of that question will show <span className='font-bold text-green-600'>Green</span>  color ]</p>
                </div>

                }
            {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber ?
                <></> : <div><div>
                    {questions?.map((question, index) => (
                        <div key={question.questionID.
                            increment} className='pb-5 mb-10 border-line'>
                            <div className='flex justify-center w-full'>
                                <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                    <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                                    <p className='hidden font-bold'>Correct Answer: {correctAnswers[question.questionID.increment]}</p>
                                </div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <div className='w-1/2'>
                                    <div className='flex justify-evenly'>
                                        <button
                                            className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option1 ? 'selected-option bg-green-500 text-black font-bold' : ''}`}
                                            onClick={() => handleOptionSelect(question.questionID.
                                                increment, question.option1)}
                                        >
                                            A- {question.option1}
                                        </button>
                                        <button
                                            className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option2 ? 'selected-option bg-green-500 text-black  font-bold' : ''}`}
                                            onClick={() => handleOptionSelect(question.questionID.
                                                increment, question.option2)}
                                        >
                                            B- {question.option2}
                                        </button>
                                    </div>
                                    <div className='flex mt-5 justify-evenly'>
                                        <button
                                            className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option3 ? 'selected-option bg-green-500 text-black  font-bold' : ''}`}
                                            onClick={() => handleOptionSelect(question.questionID.
                                                increment, question.option3)}
                                        >
                                            C- {question.option3}
                                        </button>
                                        <button
                                            className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option4 ? 'selected-option bg-green-500 text-black  font-bold' : ''}`}
                                            onClick={() => handleOptionSelect(question.questionID.
                                                increment, question.option4)}
                                        >
                                            D- {question.option4}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    <div className='flex justify-center pb-10 mt-5'>
                        {/* <button className='' >Submit Answers</button> */}
                        {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber ? (
                            <button className="btn-12" disabled><span>Submit Answers</span></button>
                        ) : (
                            <button onClick={handleSubmit} className="btn-12"><span>Submit Answers</span></button>
                        )}


                    </div>
                </div>}


            {/* --------------------------score field------------------------------ */}
            {filterFinalResult?.length > 0 && phoneNumber === userData?.phoneNumber ? <div>
                <div>
                    {questions?.map((question, index) => (
                        <div key={question.questionID.increment} className='pb-5 mb-10 border-line'>
                            <div className='flex justify-center w-full'>
                                <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                    <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                                    <p className='text-lg italic font-bold text-green-700'>Correct Answer: {getCorrectAnswer(question.questionID.increment)}</p>
                                </div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <div className='w-1/2'>
                                    <div className='flex justify-evenly'>
                                        {['option1', 'option2', 'option3', 'option4'].map((optionKey) => {
                                            const correctAnswer = getCorrectAnswer(question.questionID.increment);
                                            const option = question[optionKey];
                                            const isCorrect = finalResult.some(result => result.selectedOptions[question.questionID.increment] === option);
                                            console.log(isCorrect.length)
                                            let optionStyle = '';
                                            if (isCorrect) {
                                                optionStyle = 'bg-blue-400';
                                            }
                                            else if (option === correctAnswer) {
                                                optionStyle = 'bg-green-500';
                                            }
                                            return (
                                                <p
                                                    key={optionKey}
                                                    className={`animate__animated animate__bounceInUp p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${optionStyle}`}
                                                >
                                                    {option}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div> : <></>
            }
        </div>
    );
};

export default QuizOptionPage;
