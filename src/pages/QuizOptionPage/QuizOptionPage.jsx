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
import { useParams } from 'react-router-dom';
import './QuizOptionPage.css';
import { useUserData } from './../../Hooks/Hooks';
import { useToasts } from 'react-toast-notifications';

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
            phoneNumber: userData.phoneNumber
        };
        console.log(optionSelectedData);
        
        try {
            await fetch('https://localhost:7274/api/submitAnswers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedOptions),
            });
            // Handle success
        } catch (error) {
            console.error('Error submitting answers:', error);
            // Handle error
        }
    };
    

    // console.log(questions.map(q => q.questionID.
    //     increment))

    return (
        <div className='pt-20 quiz-option-container'>
            <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
                <h1>{getByCatName}</h1>
            </div>
            <div>
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
                                    className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option1 ? 'selected-option bg-lime-400 text-black font-bold' : ''}`}
                                    onClick={() => handleOptionSelect(question.questionID.
                                        increment, question.option1)}
                                >
                                    A- {question.option1}
                                </button>
                                <button
                                    className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option2 ? 'selected-option bg-lime-400 text-black  font-bold' : ''}`}
                                    onClick={() => handleOptionSelect(question.questionID.
                                        increment, question.option2)}
                                >
                                    B- {question.option2}
                                </button>
                                </div>
                               <div className='flex mt-5 justify-evenly'>
                                 <button
                                    className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option3 ? 'selected-option bg-lime-400 text-black  font-bold' : ''}`}
                                    onClick={() => handleOptionSelect(question.questionID.
                                        increment, question.option3)}
                                >
                                    C- {question.option3}
                                </button>
                                <button
                                    className={`p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl ${selectedOptions[question.questionID.increment] === question.option4 ? 'selected-option bg-lime-400 text-black  font-bold' : ''}`}
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
                <button onClick={handleSubmit} className="btn-12"><span>Submit Answers</span></button>

            </div>
        </div>
    );
};

export default QuizOptionPage;
