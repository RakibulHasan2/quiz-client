import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuizOptionPage.css'
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

    return (
        <div className='pt-20 quiz-option-container'>
            <div className='flex justify-center topic-name'>
                    <h1>{getByCatName}</h1>
            </div>
            <div>
                {questions.map(question => (
                    <div key={question._id}>
                        <h2>{question.question}</h2>
                        <p>{question.option1}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizOptionPage;
