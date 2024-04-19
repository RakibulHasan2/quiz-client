import { useState } from "react";
import './signUp.css'
import logo from   '../../images/logo/pngwing.com (6).png';
const SignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
      setIsSignUp(prevState => !prevState);
    };
    
    return (
        <div className="flex justify-center mt-20">
            <div>
        <div className={`container ${isSignUp ? 'active' : ''}`}>
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className={`toggle-panel toggle-left ${!isSignUp ? 'active' : ''}`}>
                    <img className="w-52" src={logo} alt="" />
                        <button className="" onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
                        <img className="w-52" src={logo} alt="" />
                        <button className="" onClick={toggleForm}>Sign-up</button>
                    </div>
                </div>
            </div>
        </div>
          </div> 
        </div>
       
    );
};

export default SignUp;
