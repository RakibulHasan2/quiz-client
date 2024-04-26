import ScrollTrigger from 'react-scroll-trigger';
import './HomeSectionThree.css'
import { useState } from 'react';
const HomeSectionThree = () => {
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
            <div className="">
                <div className="flex justify-center">
                {animationOn && <div className='animate__animated animate__backInLeft'>
                        <h1 className="uppercase text-8xl">earn <span className='font-bold rewards'>rewards</span></h1>
                    </div>
                    }
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default HomeSectionThree;