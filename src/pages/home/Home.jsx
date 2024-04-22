import Footer from "../footer/Footer";
import './home.css'
import man from '../../images/cartoon image/360_F_458630388_h2oAUzpYozE7lmpswiot0DPfy7ptYufJ-removebg-preview.png'
import paper from '../../images/gif/wired-lineal-56-document.gif'
import 'animate.css';
const Home = () => {
    return (
<div>
<div className="h-screen">
            {/* RippleBackground applied as background */}
            <div className="ripple-background">
                <div className="circle xxlarge shade1"></div>
                <div className="circle xlarge shade2"></div>
                <div className="circle large shade3"></div>
                <div className="circle medium shade4"></div>
                <div className="circle small shade5"></div>
            </div>
          <div className="flex justify-between border">
                <div>
                    <img className="w-12" src={paper} alt="" />
                </div>
            <div className="flex justify-end border">
                <img className="animate__animated animate__bounceInRight" src={man} alt="" />
            </div>
            </div>  
          
        </div>
        <Footer></Footer>
</div>
   
    );
};

export default Home;