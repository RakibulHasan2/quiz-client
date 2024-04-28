/* eslint-disable react/prop-types */
import './Quiz.css'
import { SiVisualstudioappcenter } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbBinaryTree } from "react-icons/tb";
import { FaMicrochip } from "react-icons/fa6";
import { GrCloudComputer } from "react-icons/gr";
import { GrAndroid } from "react-icons/gr";
import { NavLink } from 'react-router-dom';

const QuizCard = ({ categoryName }) => {

    return (
        <div>
       <NavLink to={`/quizPage/${encodeURIComponent(categoryName)}`}>     <div className='flex flex-col items-center justify-center w-64 bg-transparent shadow-xl backdrop-blur-sm h-52 rounded-2xl category-card'>

                {categoryName === "Visual Progamming" && <SiVisualstudioappcenter className="text-6xl animate-pulse" />}
                {categoryName === "Java" && <FaJava className="text-6xl animate-pulse" />}
                {categoryName === "Data structure & algorithms" && <TbBinaryTree className="text-6xl animate-pulse" />}
                {categoryName === "Machine learning" && <FaMicrochip className="text-6xl animate-pulse" />}
                {categoryName === "Computer networks" && <GrCloudComputer className="text-6xl animate-pulse" />}
                {categoryName === "Operating Systems" && <GrAndroid className="text-6xl animate-pulse" />}
               <h1 className='text-lg italic font-bold'>{categoryName}</h1>
            </div>
            </NavLink> 
        </div>
    );
};

export default QuizCard;