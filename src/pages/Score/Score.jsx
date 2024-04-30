import { useEffect, useState } from "react";
import { useUserData } from "../../Hooks/Hooks";
import { useParams } from "react-router-dom";


const Score = () => {

    const userData = useUserData()
    console.log(userData)
    const { getByCatName } = useParams();
    console.log(getByCatName)
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
        console.log(questions)

    return (
        <div className="pt-20 quiz-option-container">
            this is Score page
        </div>
    );
};

export default Score;