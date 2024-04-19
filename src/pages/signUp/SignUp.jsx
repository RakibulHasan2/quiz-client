import { useState } from "react";
import './signUp.css'
import logo from '../../images/logo/pngwing.com (6).png';
import { FiUserCheck } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from "react-router-dom";




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
                        <div className="flex justify-end"><NavLink to='/'><h2  className="flex items-center w-20 gap-2 p-1 mt-3 mr-5 rounded-md sign-up-home"><FaArrowLeft />HOME</h2></NavLink></div>
                        <form >
                        <span className=""> <LuUserCog className="text-6xl font-bold icons" /></span>
                        <h1 className="text-2xl font-bold uppercase">Student Sign-Up</h1>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    
                    <div className="form-container sign-in">
                    <div className="flex "><NavLink to='/'><h2  className={`flex items-center w-20 gap-2 p-1 mt-3 ml-5 rounded-md sign-up-home ${!isSignUp ? 'block' : 'hidden'}`}><FaArrowLeft />HOME</h2></NavLink></div>
                        <form>
                            <span className=""> <FiUserCheck className="text-6xl font-bold icons" /></span>
                            <h1 className="text-2xl font-bold uppercase">Student Login</h1>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>LOG-IN</button>
                        </form>
                    </div>
                    
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className={`toggle-panel toggle-left ${!isSignUp ? 'active' : ''}`}>
                                <img className="w-52" src={logo} alt="" />
                                <div className="relative overflow-hidden leading-6 uppercase cursor-pointer group">
                                    <button className="group-hover:-translate-y-[120%] inline-block  transition duration-500 ease-out">LOG-IN</button>
                                    <button className=" absolute left-0 rotate-12 inline-block translate-y-[120%] transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0" onClick={toggleForm}>Log-In</button>
                                </div>
                            </div>
                            <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
                                <img className="w-52" src={logo} alt="" />
                                <div className="relative overflow-hidden leading-6 uppercase cursor-pointer group">
                                    <button className="group-hover:-translate-y-[120%] inline-block  transition duration-500 ease-out">sign-up</button>
                                    <button className=" absolute left-0 rotate-12 inline-block translate-y-[120%] transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0" onClick={toggleForm}>sign-up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;
