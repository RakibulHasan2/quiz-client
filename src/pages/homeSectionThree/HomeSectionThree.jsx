import ScrollTrigger from 'react-scroll-trigger';
import './HomeSectionThree.css'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import dailyReward from '../../images/rewards-img/output-onlinegiftools (19).gif'
import weelklyReward from '../../images/rewards-img/output-onlinegiftools (18).gif'
import monthlyReward from '../../images/rewards-img/output-onlinegiftools (20).gif'
const HomeSectionThree = () => {
    useEffect(()=>{
        AOS.init();
    },[])
    const [animationOn, setAnimationOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
            {animationOn && <div className="mt-20">
                <div className="flex justify-center mb-20">
                 
                <div className='reward-content animate__animated animate__backInDown'>
                         
                      <h1 className="uppercase">earn,rewards</h1>
                        <h1 className="uppercase">earn,rewards</h1>
                 
                    </div>
                
                </div>
                <div className='flex justify-center blob-container'>
                    <div className='p-5 '>
                        <div className='flex justify-evenly'>
                            <div className='blob1' data-aos="fade-right">
                                <img className='' src={dailyReward} alt="" />
                                <div className='flex justify-center'>
                                    <h2 className='text-3xl italic font-bold'>Daily win 5+</h2>
                                </div>
                            </div>
                            <div className='blob2 'data-aos="fade-left">
                                <img className='' src={weelklyReward} alt="" />
                                <div className='flex justify-center'>
                                    <h2 className='text-3xl italic font-bold'>Weekly win 10+</h2>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className='blob3 'data-aos="fade-up">
                                <img className='' src={monthlyReward} alt="" />
                                <div className='flex justify-center'>
                                    <h2 className='text-3xl italic font-bold'>Monthly win 25+</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>}
        </ScrollTrigger>
    );
};

export default HomeSectionThree;