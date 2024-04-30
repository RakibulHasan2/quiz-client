/* eslint-disable no-undef */

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './QuizOptionPage.css'
// const QuizOptionPage = () => {
//     const { getByCatName } = useParams();
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`https://localhost:7274/api/Question/getByCatName/${getByCatName}`);
//                 const data = await response.json();
//                 setQuestions(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, [getByCatName]);
//     console.log(questions)
//     return (
//       <div className='pt-20 quiz-option-container'>
//             <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
//                 <h1>{getByCatName}</h1>
//             </div>
//             <div>
//           {questions?.map((question, index) => (
//                     <div key={question._id} className='pb-5 mb-10 border-line'>

//                         <div className='flex justify-center w-full'>
//                          <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
//                                 <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
//                             </div>
//                         </div>
//                         <div className='flex justify-center mt-5'>
//                              <div className='flex w-1/2 italic justify-evenly '>
//                                 <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInLeft'>A- <span className='font-bold'>{question.option1}</span></p>
//                                 <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInRight'>B- <span className='font-bold'>{question.option2}</span></p>
//                             </div>
//                         </div>
//                         <div className='flex justify-center mt-5'>
//                             <div className='flex w-1/2 italic justify-evenly'>
//                                 <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInLeft'>C- <span className='font-bold'>{question.option3}</span></p>
//                                 <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInRight'>D- <span className='font-bold'>{question.option4}</span></p>
//                             </div>
//                         </div>   
//                          </div> 

//                 ))}
//             </div>
//         </div>

//     );
// };

// export default QuizOptionPage;

import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './QuizOptionPage.css';
import { useUserData } from './../../Hooks/Hooks';
import { useToasts } from 'react-toast-notifications';
import { useQuery } from 'react-query';

const QuizOptionPage = () => {
    const { addToast } = useToasts();
    const { getByCatName } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const userData = useUserData()
    // console.log(selectedOptions)

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
            addToast('You must have to answer all the avobe questions, otherwize the answer will not submited', { appearance: 'warning' })
            return;
        }

        const optionSelectedData = {
            selectedOptions,
            categoryName: getByCatName,
            userName: userData.userName,
            userPhoneNumber: userData.phoneNumber
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

    const getCorrectAnswer = (questionId) => {
        const correctAnswer = questions.find(question => question.questionID.increment === questionId)?.answer;
        return correctAnswer;
    };

    // const options = finalResult.map(result => result.selectedOptions);
    // const newOptions = options.map(op => op)
    // console.log(newOptions[0])

    const phoneNumber = finalResult?.map(result => result?.userPhoneNumber).join(', ')

    const [questionsWithSingleCorrectOption, setQuestionsWithSingleCorrectOption] = useState(0);

    useEffect(() => {
        // Calculate the number of questions with only one correct option
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
    return (
        <div className='pt-20 quiz-option-container'>
            <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
                <h1>{getByCatName}</h1>
            </div>
            <div className='flex justify-center mb-10 font-bold text-green-700'>
                {finalResult?.length > 0 && phoneNumber === userData?.phoneNumber ? <div> <h1>Your already performed the {getByCatName} Quizes</h1><NavLink to='/score'><button className='p-2 border rounded-lg bg-lime-100'>view score</button></NavLink> </div> : <></>}
            </div>
            {finalResult?.length > 0 && phoneNumber === userData?.phoneNumber && <div className='flex justify-center'><p>Your Score: {questionsWithSingleCorrectOption}/{questions.length}</p></div>  }
         {finalResult?.length > 0 && phoneNumber === userData?.phoneNumber ?  
       <></>: <div><div>
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
                {finalResult?.length > 0 && phoneNumber === userData?.phoneNumber ? (
                    <button className="btn-12" disabled><span>Submit Answers</span></button>
                ) : (
                    <button onClick={handleSubmit} className="btn-12"><span>Submit Answers</span></button>
                )}


            </div>
</div> }  


{/* --------------------------score field------------------------------ */}
       {finalResult?.length > 0 && phoneNumber === userData?.phoneNumber ?    <div>
                <div>
                {questions?.map((question, index) => (
                    <div key={question.questionID.increment} className='pb-5 mb-10 border-line'>
                        <div className='flex justify-center w-full'>
                            <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                                <p className='font-bold'>Correct Answer: {getCorrectAnswer(question.questionID.increment)}</p>
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
                                        else if(option === correctAnswer){
                                            optionStyle = 'bg-green-500';
                                        }
                                        return (
                                            <p
                                                key={optionKey}
                                                className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${optionStyle}`}
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
            </div>:<></>
                }
        </div>
    );
};

export default QuizOptionPage;
