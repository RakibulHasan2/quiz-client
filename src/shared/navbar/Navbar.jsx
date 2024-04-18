import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div>
            <NavLink to='/home'><button>home</button></NavLink> 
        </div>
    );
};

export default Navbar;