import { useEffect, useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import './HomeSecTwo.css'
import Footer from './../footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
const HomeSectionTwo = () => {
    useEffect(()=>{
        AOS.init();
    },[])
    
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
                
            
              <div className="mt-20">
                
                  {animationOn &&
                    <div className="flex justify-center animate__animated animate__fadeInDown">
                        <h1 className="text-5xl uppercase">be the top on the list</h1>
                    </div>
             }
                     <div className="mt-20 border h-72 wave-container"data-aos="fade-up">
                        <p >jel</p>
                    </div> 
                    <Footer/>
                </div>  
             
        </ScrollTrigger>
    );
};

export default HomeSectionTwo;