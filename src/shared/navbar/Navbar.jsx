import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="flex justify-between p-4 mb-5 shadow-md">
            <div className="text-2xl font-bold">
                LOGO
            </div>
            <div className="flex gap-5">
                <div className="group overflow-hidden relative cursor-pointer text-2xl uppercase leading-6 text-black">
                    <NavLink to='/home'><span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">HOME</span></NavLink>
                    <NavLink to='/home'><span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">HOME</span></NavLink>
                </div>
                <div className="group overflow-hidden relative cursor-pointer text-2xl uppercase leading-6 text-black">
                    <NavLink to='/quiz'><span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">Quiz</span></NavLink>
                    <NavLink to='/quiz'><span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">Quiz</span></NavLink>
                </div>
                
            </div>
            <div className="text-2xl font-bold">
                LOG-IN
            </div>
        </div>

    );
};

export default Navbar;