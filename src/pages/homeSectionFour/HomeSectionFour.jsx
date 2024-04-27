import ScrollTrigger from 'react-scroll-trigger';
import './HomeSectionFour.css'
import { useState } from 'react';
import CountUp from "react-countup";
const HomeSectionFour = () => {
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>

            <div className='mt-52'>
                {animationOn && <div className="flex justify-center mb-20 animate__animated animate__backInUp">

                    <div className='map-content '>
                        <h1 className="uppercase">our_popularity</h1>
                        <h1 className="uppercase">our_popularity</h1>

                    </div>

                </div>}
                <div className='section-four-container'>
                    <div className='flex justify-center'>
                        <div className='w-40 p-5 font-bold bg-transparent border rounded-xl backdrop-blur-md'>
                        {animationOn &&    <div className='flex flex-col items-center'>
                              
                                    <h1 className=''>over student</h1>
                                    <p className='text-6xl'><CountUp start={0} end={25} duration={4} delay={0.2} />+</p>
                                    <h1>countries</h1>
                            

                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default HomeSectionFour;