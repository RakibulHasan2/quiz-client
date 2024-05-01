/* eslint-disable react/jsx-key */
import Marquee from "react-fast-marquee";
import loader from '../../images/loader/loader.gif'
import { useQuery } from 'react-query';
import './Quiz.css'
import QuizCard from "./QuizCard";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../Hooks/Hooks";
const Quizes = () => {
    const userData = useUserData()
    const navigate = useNavigate();
    if(!userData) {
        navigate('/')
    }
    const { data: allCategory = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await fetch(`https://localhost:7274/api/Question/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const uniqueCategoryNames = new Set(allCategory?.map(category => category?.questionCategory));
    console.log(allCategory)
    return (
        <div className="pt-24 quiz-container">
            <div className="flex items-center justify-center w-full h-full">
                <div className='w-4/5 pt-16 shadow-2xl h-4/5 rounded-xl quiz-category-background'>
                {allCategory.length === 0 && <div className="flex justify-center mt-20"><img className="w-24" src={loader} alt="" /></div>}

                    <Marquee pauseOnHover>
                        <div className='flex gap-4 p-2 pb-6 animate__animated animate__fadeInDown'>
                            {
                                Array.from(uniqueCategoryNames)?.map(categoryName => (
                                    <QuizCard
                                        categoryName={categoryName}
                                    >
                                    </QuizCard>
                                
                                ))
                            }

                        </div>  </Marquee>

                    <div className="flex justify-center mt-5">
                        <div className='chose-topic animate__animated animate__backInUp'>
                            <h1 className="uppercase">Choose_Topic</h1>
                            <h1 className="uppercase">Choose_Topic</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizes;