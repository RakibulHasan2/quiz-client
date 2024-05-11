import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import '../signUp/signUp.css'

const TeacherLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const handleLoginUser= async(data) => {
        try {
            const response = await fetch('https://quiz-server-omarfarukees-projects.vercel.app/api/User/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            const responseData = await response.json();
            console.log(responseData);
      
            if (responseData.message === "Login successful") {
              console.log('Login successful');
              addToast('User Log in successfully',{ appearance: 'success' })
              sessionStorage.setItem('userData', JSON.stringify(responseData));
                navigate('/')
                reset();
            } else {
                addToast(`${responseData.error}`,{ appearance: 'error' })
             
            }
          } catch (error) {
            // console.error('Error during login:', error);
            addToast('some problem occured while login',{ appearance: 'error' })
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
    
    return (
        <div>
               <form onSubmit={handleSubmit(handleLoginUser)}>
                            <span className=""> <FaUserTie className="text-6xl font-bold icons" /></span>
                            <h1 className="text-2xl font-bold uppercase ">teacher Login</h1>
                            <input type="text" {...register("phoneNumber", {
                                    required: "Required"
                                })} placeholder="Phone Number" defaultValue='1943797513' />
                                {errors.phoneNumber && <small className='relative ml-2 text-red-500 right-2 '>{errors.phoneNumber?.message}</small>}

                                <input type={passwordFieldType("current")}  {...register("pass", {
                                required: "Required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} placeholder="🗝 Password..."defaultValue='4XNd@qDc5ZHxp6T' />
                            <div className="flex justify-end">
                                <a className='relative bottom-14 left-32' title="See password" onClick={() => seePass("current")}><FaEye className="text-2xl" /></a>
                            </div>
                            {errors.pass && <small className='relative ml-2 text-red-500 bottom-14'>{errors.pass.message}</small>}
                            <button type="submit">LOG-IN</button>
                        </form>
        </div>
    );
};

export default TeacherLogin;