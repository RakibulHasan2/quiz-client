import Footer from "../footer/Footer";
import './home.css'
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
          <div className="flex justify-center">
            <p className="animate__animated animate__rubberBand">this is home man</p>
            </div>  
          
        </div>
        <Footer></Footer>
</div>
   
    );
};

export default Home;