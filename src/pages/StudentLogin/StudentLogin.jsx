import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import '../signUp/signUp.css'
const StudentLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const handleLoginUser = async (data) => {
        try {
            const response = await fetch('https://localhost:7118/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData) {
                console.log('Login successful');
                addToast('User Log in successfully', { appearance: 'success' })
                sessionStorage.setItem('userData', JSON.stringify(responseData));
                navigate('/')
                reset();
            } else {
                addToast('login in fail please try again', { appearance: 'error' })

            }
        } catch (error) {
            // console.error('Error during login:', error);
            addToast('some problem occured while login', { appearance: 'error' })
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
                <span className=""> <PiStudent
                    className="text-6xl font-bold icons" /></span>
                <h1 className="text-2xl font-bold uppercase ">Student Login</h1>
                <input type="text" {...register("phoneNumber", {
                    required: "Required"
                })} placeholder="Phone Number" defaultValue="01868686979" />
                {errors.phoneNumber && <small className='relative ml-2 text-red-500 right-2 '>{errors.phoneNumber?.message}</small>}

                <input type={passwordFieldType("current")}  {...register("pass", {
                    required: "Required",
                    minLength: { value: 6, message: "Password must be 6 characters long" },
                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                })} placeholder="🗝 Password..." defaultValue="Porosh1122##" />
                <div className="flex justify-end">
                    <a className='relative bottom-14 left-32' title="See password" onClick={() => seePass("current")}><FaEye className="text-2xl" /></a>
                </div>
                {errors.pass && <small className='relative ml-2 text-red-500 bottom-14'>{errors.pass.message}</small>}
                <button type="submit">LOG-IN</button>
            </form>
        </div>
    );
};

export default StudentLogin;