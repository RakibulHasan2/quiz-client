import { useEffect, useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import './HomeSecTwo.css'
import Footer from './../footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import timer from '../../images/be the top gif/timer.gif'
import medel1 from '../../images/be the top gif/1.gif'
import medel2 from '../../images/be the top gif/2.gif'
import medel3 from '../../images/be the top gif/3.gif'
import qus from '../../images/be the top gif/qus.gif'
import chapm from '../../images/be the top gif/output-onlinegiftools (12).gif'
import play from '../../images/be the top gif/output-onlinegiftools (17).gif'

const HomeSectionTwo = () => {
    useEffect(()=>{
        AOS.init();
    },[])
    
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
                
            
              <div className="mt-52">
                
                  {animationOn &&
                    <div className="flex justify-center animate__animated animate__fadeInDown">
                        <div className="content">
                            <h2 className="uppercase ">be|the|top|on|the|list</h2>
                            <h2 className="uppercase ">be|the|top|on|the|list</h2>
                        </div>
                        
                    </div>
             }
                     <div className="mt-32 wave-container"data-aos="fade-up">
                       <div className="flex h-72">
                            <div className=" img-1" data-aos="flip-right">
                                <img className="w-20"  src={chapm} alt="" />
                            </div>
                            <div className=" img-2">
                                <img className="w-12" src={medel1} alt="" />
                            </div>
                            <div className=" img-3">
                                <img className="w-20" src={qus} alt="" />
                            </div>
                            <div className=" img-4">
                                <img className="w-16" src={timer} alt="" />
                            </div>
                            <div className=" img-5">
                                <img className="w-12" src={medel2} alt="" />
                            </div> 
                            <div className=" img-6">
                                <img className="w-24" src={timer} alt="" />
                            </div>
                           
                            <div className=" img-7">
                                <img className="w-12" src={medel3} alt="" />
                            </div>
                            <div className=" img-8">
                                <img className="w-14" src={timer} alt="" />
                            </div>
                           
                            <div className=" img-9">
                                <img className="w-32" src={qus} alt="" />
                            </div>
                            <div className=" img-10">
                                <img className="w-10" src={play} alt="" />
                            </div>
                       </div>
                    </div> 
                    <Footer/>
                </div>  
             
        </ScrollTrigger>
    );
};

export default HomeSectionTwo;