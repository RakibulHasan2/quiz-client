import { useState } from "react";
import './signUp.css'
import logo from '../../images/logo/pngwing.com (6).png';
import { LuUserCog } from "react-icons/lu";
import { FaArrowLeft, FaEye } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import 'animate.css';
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import StudentLogin from "../StudentLogin/StudentLogin";
import TeacherLogin from "../TeacherLogin/TeacherLogin";


const SignUp = () => {
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [isSignUp, setIsSignUp] = useState(false);
    const toggleForm = () => {
        setIsSignUp(prevState => !prevState);
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleCreateUser = async (data) => {

        const userData = {
            userName: data.userName,
            userAddress: data.userAddress,
            phoneNumber: data.phoneNumber,
            role: data.role,
            pass: data.pass

        }
        // console.log(userData)
        try {
            const response = await fetch('https://quiz-server-omarfarukees-projects.vercel.app/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();
            console.log(responseData.result)
            if (responseData.message === "User created successfully") {
                console.log('User created successfully');
                addToast('User created successfully', { appearance: 'success' })
                sessionStorage.setItem('userData', JSON.stringify(userData));
                navigate('/')
                reset();
            } else {
                addToast(`${responseData.error}`, { appearance: 'error' })
                // console.log(`${responseData.error}`);
            }
        } catch (error) {
            console.error('Error creating', error);
        }

    }
    const [types, setTypes] = useState(true)

    const seePass = (type) => {
        switch (type) {
            case "current":
                setTypes(!types);
                break;
        }
    };
    const passwordFieldType = (type) => {
        switch (type) {
            case "current":
                return types ? "password" : "text";
        }
    };
    const [isStudentLoginVisible, setIsStudentLoginVisible] = useState(true);

    const toggleLoginType = () => {
        setIsStudentLoginVisible(!isStudentLoginVisible);
    };
    return (
        <div className="flex items-center justify-center h-screen">
            
            <div className="animate__animated animate__zoomInDown">
                <div className={`container ${isSignUp ? 'active' : ''}`}>
                    <div className="form-container sign-up ">
                        <div className="flex justify-end"><NavLink to='/'><h2 className="flex items-center w-20 gap-2 p-1 mt-3 mr-5 rounded-md sign-up-home"><FaArrowLeft />HOME</h2></NavLink></div>
                        <form onSubmit={handleSubmit(handleCreateUser)}>
                            <span className=""> <LuUserCog className="text-5xl font-bold icons" /></span>
                            <h1 className="text-lg font-bold uppercase ">user Sign-Up</h1>
                            <div className="flex gap-1">

                                <input type="text" {...register("userName", {
                                    required: "*"
                                })} placeholder="Enter Name" />
                                {errors.userName && <small className='relative ml-2 text-red-500 right-2'>{errors.userName?.message}</small>}


                                <input type="text" {...register("userAddress", {
                                    required: "*"
                                })} placeholder="Address" />
                                {errors.userAddress && <small className='relative ml-2 text-red-500 right-2'>{errors.userAddress?.message}</small>}

                            </div>
                            <div className="flex gap-1">
                                <div className="flex flex-col gap-1">
                                    <select className="w-36" {...register("role", {
                                        required: "*"
                                    })}>
                                        <option value="teacher">select Role</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                    {errors.role && <small className='relative ml-2 text-red-500 right-2'>{errors.role?.message}</small>}
                                </div>

                                <input type="text" {...register("phoneNumber", {
                                    required: "*"
                                })} placeholder="Phone Number" />
                                {errors.phoneNumber && <small className='relative ml-2 text-red-500 right-2 '>{errors.phoneNumber?.message}</small>}
                            </div>


                            <input type={passwordFieldType("current")}  {...register("pass", {
                                required: "Required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} placeholder="🗝 Password..." />
                            <div className="flex justify-end">
                                <a className='relative bottom-14 left-32' title="See password" onClick={() => seePass("current")}><FaEye className="text-2xl" /></a>
                            </div>
                            {errors.pass && <small className='relative ml-2 text-red-500 bottom-14'>{errors.pass.message}</small>}
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>

                    <div className="form-container sign-in">
                        <div className="flex "><NavLink to='/'><h2 className={`flex items-center w-20 gap-2 p-1 mt-3 ml-5 rounded-md sign-up-home ${!isSignUp ? 'block' : 'hidden'}`}><FaArrowLeft />HOME</h2></NavLink></div>

                        <div className="mt-12">
                            {isStudentLoginVisible ? (
                                <div className="animate__animated animate__flipInX">
                                    <TeacherLogin />
                                    <div className="flex justify-center mt-1">
                                        <small>Are you a Student? <span className="font-bold cursor-pointer text-lime-600" onClick={toggleLoginType}>Login Student Account</span></small>
                                    </div>
                                </div>

                            ) : (

                                <div className="animate__animated animate__flipInY">
                                    <StudentLogin />
                                    <div className="flex justify-center mt-1">
                                        <small>Are you a Teacher? <span className="font-bold cursor-pointer text-lime-600" onClick={toggleLoginType}>Login Teacher Account</span></small>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className={`toggle-panel toggle-left ${!isSignUp ? 'active' : ''}`}>
                                <img className="w-52" src={logo} alt="" />
                                <small className="text-black">Alreay have account?</small>
                                <div className="relative overflow-hidden leading-6 uppercase cursor-pointer group">
                                    <button className="group-hover:-translate-y-[120%] inline-block  transition duration-500 ease-out">LOG-IN</button>
                                    <button className=" absolute left-0 rotate-12 inline-block translate-y-[120%] transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0" onClick={toggleForm}>Log-In</button>
                                </div>
                            </div>
                            <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
                                <img className="w-52" src={logo} alt="" />
                                <small className="text-black">New in here? Create Account</small>
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
