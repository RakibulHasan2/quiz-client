import './home.css'
import man from '../../images/cartoon image/360_F_458630388_h2oAUzpYozE7lmpswiot0DPfy7ptYufJ-removebg-preview.png'
import qmark from '../../images/gif/system-regular-57-help-question.gif'
import arrow from '../../images/logo/4902548424a02117b7913c17d2e379ff.gif'
import 'animate.css';
import Footer from '../footer/Footer'
// import { useEffect } from "react";
import HomeSectionTwo from '../HomeSectionTwo/HomeSectionTwo';
import HomeSectionThree from '../homeSectionThree/HomeSectionThree';
import HomeSectionFour from '../homeSectionFour/HomeSectionFour';
import ScrollToTop from 'react-scroll-to-top';

const Home = () => {
    // useEffect(() => {
    //     const timer1 = setTimeout(() => {
    //         const element = document.querySelector('.tx-1');
    //         if (element) {
    //             element.classList.add('animate__bounceInLeft');
    //         }
    //     }, 4000);

    //     return () => clearTimeout(timer1);
    // }, []);
    // useEffect(() => {
    //     const timer2 = setTimeout(() => {
    //         const element = document.querySelector('.tx-2');
    //         if (element) {
    //             element.classList.add('animate__jello');
    //         }
    //     }, 4500);

    //     return () => clearTimeout(timer2);
    // }, []);
    // useEffect(() => {
    //     const timer3 = setTimeout(() => {
    //         const element = document.querySelector('.tx-3');
    //         if (element) {
    //             element.classList.add('animate__bounceInRight');
    //         }
    //     }, 4300);

    //     return () => clearTimeout(timer3);
    // }, []);
      
    return (
<div>
<ScrollToTop smooth top="500" 
        component={<img className='bg-lime-200 rounded-xl' src={arrow}/>}
        width="50"/>
<div className=" h-screens">
            {/* RippleBackground applied as background */}
            <div className="ripple-background">
                <div className="circle xxlarge shade1"></div>
                <div className="circle xlarge shade2"></div>
                <div className="circle large shade3"></div>
                <div className="circle medium shade4"></div>
                <div className="circle small shade5"></div>
            </div>
          <div className="flex justify-between h-screen ">
                <div className="uppercase three-tx">
                    <p className="ml-20 font-extrabold text-8xl tx-1 animate__animated animate__bounceInLeft">Show</p>
                    <p className="mt-10 font-extrabold tx-2 ml-44 text-8xl animate__animated animate__jello">your</p>
                    <span className="flex text-center tx-3 animate__animated animate__bounceInRight"><p className="mt-12 font-extrabold text-8xl ml-80">IQ</p><img className="w-20 h-20 mt-16" src={qmark} alt="" /></span>
                </div>
            <div className=" home-img-container animate__animated animate__fadeInRight">
                <img className=" home-img move-up-down" src={man} alt="" />
            </div>
            </div>  
          
        </div>
        <div>
            <HomeSectionTwo/> 
        </div>
          
        <div>
              <HomeSectionThree/>
        </div>
        <div>
            <HomeSectionFour/>
        </div>
     <Footer/>
</div>
   
    );
};

export default Home;