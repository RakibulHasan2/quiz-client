import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuizOptionPage.css'
import ScrollTrigger from 'react-scroll-trigger';
const QuizOptionPage = () => {
    const { getByCatName } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7274/api/Question/getByCatName/${getByCatName}`);
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getByCatName]);
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
      <div className='pt-20 quiz-option-container'>
            <div className='flex justify-center mb-10 topic-name animate__animated animate__flip'>
                <h1>{getByCatName}</h1>
            </div>
            <div>
          {questions?.map((question, index) => (
                    <div key={question._id} className='pb-5 mb-10 border-line'>
              
                        <div className='flex justify-center w-full'>
                          {animationOn &&  <div className='w-1/2 p-4 bg-transparent shadow-2xl h-44 qus-border backdrop-blur-xl animate__animated animate__backInUp'>
                                <h2 className='text-lg italic'>Qus {index + 1} - <span className='font-bold'>{question.question}</span></h2>
                            </div>}
                        </div>
                        <div className='flex justify-center mt-5'>
                            {animationOn && <div className='flex w-1/2 italic justify-evenly '>
                                <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInLeft'>A- <span className='font-bold'>{question.option1}</span></p>
                                <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInRight'>B- <span className='font-bold'>{question.option2}</span></p>
                            </div>}
                        </div>
                        <div className='flex justify-center mt-5'>
                            {animationOn&&  <div className='flex w-1/2 italic justify-evenly'>
                                <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInLeft'>C- <span className='font-bold'>{question.option3}</span></p>
                                <p className='p-4 bg-transparent shadow-2xl w-60 option backdrop-blur-xl animate__animated animate__backInRight'>D- <span className='font-bold'>{question.option4}</span></p>
                            </div>}
                        </div>   
                         </div> 
             
                ))}
            </div>
        </div>
        </ScrollTrigger>
    );
};

export default QuizOptionPage;
