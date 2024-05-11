/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import ScrollToTop from 'react-scroll-to-top';
import { useNavigate, useParams } from 'react-router-dom';
import './QuizOptionPage.css';
import { useToasts } from 'react-toast-notifications';
import arrows from '../../images/logo/4902548424a02117b7913c17d2e379ff.gif'
import { useUserData } from '../../Hooks/Hooks';
import { useQuery } from 'react-query';
import { useState } from 'react';
const QuizOptionPage = () => {
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const { getByCatName } = useParams();
    const userData = useUserData()
    if (!userData) {
        navigate('/')
    }
    const { data: questions = [] } = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/Question/getByCatName/${getByCatName}`);
            const data = await res.json();
            return data;
        }
    });
    // const checkAllQuestionOption = questions?.data?.length

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionSelect = (questionId, selectedOption) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionId]: selectedOption
        }));
    };

    const isOptionSelected = (questionId, option) => {
        return selectedOptions[questionId] === option;
    };

    const handleSubmit = async () => {
        const unansweredQuestions = questions.data.filter(question => !selectedOptions[question._id]);
        if (unansweredQuestions.length > 0) {
            addToast("Please answer all questions otherwise you cannot submit answers to questions", { appearance: 'warning' });
            return;
        }
        const optionSelectedData = {
            selectedOptions,
            categoryName: getByCatName,
            userName: userData?.user?.userName,
            userPhoneNumber: userData?.user.phoneNumber,
            score: ""
        };

        try {
            const response = await fetch('http://localhost:5000/api/Result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(optionSelectedData)
            });

            const responseResultData = await response.json();
            // console.log(responseResultData.status)

            if (responseResultData?.status === true) {
                addToast(`your ${getByCatName} Quiz submited successfully`, { appearance: 'success' })
                window.location.reload();
            }
            else {
                addToast(`your ${getByCatName} Quiz fail to submit`, { appearance: 'error' })
            }

        } catch (error) {
            console.error('Error submitting answers:', error);
            addToast('internal server error', { appearance: 'error' })
        }
    };

    const { data: finalResult = [] } = useQuery({
        queryKey: ['finalResult'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/Result/getByCatName/${getByCatName}`);
            const data = await res.json();
            return data;
        }
    });

    const resultFiltering = finalResult?.data?.filter(result => result?.userPhoneNumber === userData?.user?.phoneNumber)
    const _id = resultFiltering && resultFiltering[0]?._id
    const ViewsScore = resultFiltering && resultFiltering[0]?.score
    console.log(ViewsScore)
    let correctCount = 0;

    questions?.data?.map((question) => {
        const questionResult = resultFiltering && resultFiltering[0]?.selectedOptions;
        const selectedOption = questionResult && questionResult[question._id];
        const isCorrect = selectedOption === question.answer;
        if (isCorrect) {
            correctCount++;
        }
    });



    const handleViewScore = async () => {
        const scoreData = {
            score: `${correctCount}`
        }
        try {
            const response = await fetch(`http://localhost:5000/api/Result/${_id}`, {
                method: 'PUT',
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
        <div className=''>
            <ScrollToTop smooth top="500"
                component={<img className='bg-lime-200 rounded-xl' src={arrows} />} />
            <div className='pt-20 border quiz-option-container'>
                <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
                    <h1>{getByCatName}</h1>
                </div>

                <div className='flex justify-center mb-10 font-bold text-green-700'>

                    <div> {resultFiltering?.length > 0 ? <h1 className='text-2xl italic animate__animated animate__bounceInRight'>You have taken the '{getByCatName}' Quiz</h1> : <></>}

                        {resultFiltering?.length > 0 &&

                            <> {ViewsScore !== "" ? <></> : <div className='flex justify-center mt-5'>
                                <button onClick={handleViewScore} className='score-btn'>view score<span></span></button>
                            </div>}</>

                        }

                    </div>
                </div>

                {resultFiltering?.length > 0 && <div className='flex justify-center mb-5'>

                    {ViewsScore === "" ? <></> : <div className='p-5 text-2xl bg-transparent rounded-md shadow-2xl backdrop-blur-2xl animate__animated animate__bounceIn'>
                        <p>Your Score: {ViewsScore}/{questions?.data?.length}</p>
                    </div>}
                </div>}

                {resultFiltering?.length > 0 && <div className='flex justify-center mt-5 mb-5 italic animate__animated animate__bounceInLeft'>
                    <p>[Note: If you have not answered a question correctly then that option will be <span className='font-bold text-red-600'>red</span>  and if you have answered correctly then it will be <span className='font-bold text-green-600'>green </span> ]</p>
                </div>}
                {resultFiltering?.length > 0 ? <></> :
                    <div>
                        {questions?.data?.map((question, index) => (
                            <div key={question?._id} className='pb-5 mb-10 border-line'>
                                <div className='flex justify-center w-full'>
                                    <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                        <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                                        <p className='hidden mt-2 italic font-bold'>Correct Answer: {question?.answer}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-5'>
                                    <div className='w-1/2'>
                                        <div className='flex justify-evenly'>
                                            <button
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isOptionSelected(question._id, question.option1) ? 'bg-green-500' : ''}`}
                                                onClick={() => handleOptionSelect(question._id, question.option1)}
                                            >
                                                A- {question.option1}
                                            </button>
                                            <button
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isOptionSelected(question._id, question.option2) ? 'bg-green-500' : ''}`}
                                                onClick={() => handleOptionSelect(question._id, question.option2)}
                                            >
                                                B- {question.option2}
                                            </button>
                                        </div>
                                        <div className='flex mt-5 justify-evenly'>
                                            <button
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isOptionSelected(question._id, question.option3) ? 'bg-green-500' : ''}`}
                                                onClick={() => handleOptionSelect(question._id, question.option3)}
                                            >
                                                C- {question.option3}
                                            </button>
                                            <button
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isOptionSelected(question._id, question.option4) ? 'bg-green-500' : ''}`}
                                                onClick={() => handleOptionSelect(question._id, question.option4)}
                                            >
                                                D- {question.option4}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                <div className='flex justify-center pt-5 pb-10'>
                    {resultFiltering?.length > 0 ? <></> : <button onClick={handleSubmit} className="btn-12"><span>Submit Answers</span></button>}
                </div>
            </div>
            {/*----------------------- questions ans area-------------------------------- */}
            {resultFiltering?.length > 0 &&
                <div>
                    {questions?.data?.map((question, index) => {
                        const questionResult = resultFiltering && resultFiltering[0]?.selectedOptions;
                        const selectedOption = questionResult && questionResult[question._id];
                        const isCorrect = selectedOption === question.answer;
                        return (
                            <div key={question?._id} className='pb-5 mb-10 border-line'>
                                <div className='flex justify-center w-full'>
                                    <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                        <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                                        <p className='mt-2 italic font-bold text-green-600 '>Correct Answer: {question?.answer}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-5'>
                                    <div className='w-1/2'>
                                        <div className='flex justify-evenly'>
                                            <button
                                                disabled
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isCorrect && selectedOption === question.option1 ? 'bg-green-500' : selectedOption === question.option1 ? 'bg-red-500' : ''}`}
                                            >
                                                A- {question.option1}
                                            </button>
                                            <button
                                                disabled
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-x ${isCorrect && selectedOption === question.option2 ? 'bg-green-500' : selectedOption === question.option2 ? 'bg-red-500' : ''}`}
                                            >
                                                B- {question.option2}
                                            </button>
                                        </div>
                                        <div className='flex mt-5 justify-evenly'>
                                            <button
                                                disabled
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isCorrect && selectedOption === question.option3 ? 'bg-green-500' : selectedOption === question.option3 ? 'bg-red-500' : ''}`}
                                            >
                                                C- {question.option3}
                                            </button>
                                            <button
                                                disabled
                                                className={`p-4 shadow-2xl w-60 option backdrop-blur-xl ${isCorrect && selectedOption === question.option4 ? 'bg-green-500' : selectedOption === question.option4 ? 'bg-red-500' : ''}`}
                                            >
                                                D- {question.option4}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>




            }


        </div>

    );
};

export default QuizOptionPage;
