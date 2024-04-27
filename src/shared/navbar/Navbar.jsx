// import { NavLink } from "react-router-dom";
// import logo from "../../images/logo/pngwing.com (6).png"

// const Navbar = () => {
//     return (
//         <div className="flex justify-between p-4 shadow-md">
//             <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
//                <NavLink to="/"><img src={logo} className="w-20 group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out" alt="" /></NavLink> 
//                <NavLink to="/"><img src={logo} className="w-20 absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0" alt="" /></NavLink> 
//             </div>
//             <div className="flex gap-5">
//                 <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
//                     <NavLink to='/'><span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">HOME</span></NavLink>
//                     <NavLink to='/'><span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">HOME</span></NavLink>
//                 </div>
//                 <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
//                     <NavLink to='/quiz'><span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">Quiz</span></NavLink>
//                     <NavLink to='/quiz'><span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">Quiz</span></NavLink>
//                 </div>
                
//             </div>
//             <div className="text-2xl font-bold">
//               <NavLink to='/signUp'>LOG-IN</NavLink>  
//             </div>
//         </div>

//     );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo/pngwing.com (6).png";
import './Navbar.css'
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-50 bg-transparent transition-all duration-300 ${
        scrolled ? "bg-transparent backdrop-blur-lg shadow-md" : ""
      }`}
    >
      <div className="flex justify-between p-4">
        <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
          <NavLink to="/">
            <img
              src={logo}
              className="w-20 group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out"
              alt=""
            />
          </NavLink>
          <NavLink to="/">
            <img
              src={logo}
              className="w-20 absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0"
              alt=""
            />
          </NavLink>
        </div>
        <div className="flex gap-5">
          <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
            <NavLink to="/">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
                HOME
              </span>
            </NavLink>
            <NavLink to="/">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
                HOME
              </span>
            </NavLink>
          </div>
          <div className="relative h-10 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
            <NavLink to="/quiz">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
                Quiz
              </span>
            </NavLink>
            <NavLink to="/quiz">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
                Quiz
              </span>
            </NavLink>
          </div>
        </div>
        <div className="text-2xl font-bold">
          <NavLink to="/signUp">LOG-IN</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
