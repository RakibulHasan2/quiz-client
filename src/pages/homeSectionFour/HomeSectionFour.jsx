import ScrollTrigger from 'react-scroll-trigger';
import './HomeSectionFour.css'
import { useState } from 'react';
import CountUp from "react-countup";
import celebrate from '../../images/our-particioent-sention-four/1af8d3b487b77085d5288814f151e1de_w200.gif'
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
                <img className='absolute' src={celebrate} alt="" />
                    <div className='flex justify-center '>
                        { animationOn &&
                        <div className='w-2/3 italic uppercase'>
                            <div className='flex mt-24 justify-evenly'>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Over student</h1>
                                        <p className='text-6xl'><CountUp start={0} end={25} duration={4} delay={0.2} />+</p>
                                        <h1>countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Top Platfrom over</h1>
                                        <p className='text-6xl'><CountUp start={0} end={13} duration={4} delay={0.2} /></p>
                                        <h1>Countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Participate</h1>
                                        <p className='text-6xl'><CountUp start={0} end={500} duration={4} delay={0.2} />K+</p>
                                        <h1>Students</h1>
                                    </div>
                                </div>
                               
                            </div>
                            <div className='flex mt-28 justify-evenly'>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Over student</h1>
                                        <p className='text-6xl'><CountUp start={0} end={75} duration={4} delay={0.2} />+</p>
                                        <h1>Countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Top Platfrom over</h1>
                                        <p className='text-6xl'><CountUp start={0} end={32} duration={4} delay={0.2} /></p>
                                        <h1>Countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl backdrop-blur-md count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Participate</h1>
                                        <p className='text-6xl'><CountUp start={0} end={950} duration={4} delay={0.2} />K+</p>
                                        <h1>Students</h1>
                                    </div>
                                </div>
                               
                            </div>

                        </div>}

                    </div>
                 <div className='flex justify-end'>
                    <img className='absolute' src={celebrate} alt="" />
                </div>   
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default HomeSectionFour;