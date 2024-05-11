
import { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import logo from "../../images/logo/pngwing.com (6).png";
import './Navbar.css'
import { useUserData } from "../../Hooks/Hooks";
import { useToasts } from "react-toast-notifications";
import student from '../../images/logo/output-onlinegiftools (21) (1).gif'
import teacher from '../../images/logo/output-onlinegiftools (21).gif'
import { FaHome } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineLeaderboard } from "react-icons/md";

const Navbar = () => {

  const { addToast } = useToasts();
  const userData = useUserData()
  const handleLogout = () => {
    sessionStorage.removeItem('userData')
    addToast('User log out', { appearance: 'success' })
    window.location.reload();

  }
  // console.log(userData)
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
      className={`fixed w-full z-50 bg-transparent transition-all duration-300 ${scrolled ? "bg-transparent backdrop-blur-lg shadow-md" : ""
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
        <div className="flex gap-5 ">
          <div
           className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
                <p className="flex items-center gap-1">HOME<FaHome /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
              <p className="flex items-center gap-1">HOME<FaHome /></p>
              </span>
            </NavLink>
          </div>
          {userData?.user?.role === "student" && 
          <div className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/quiz" >
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
              <p className="flex items-center gap-1">Quiz<MdOutlineQuiz /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/quiz">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
              <p className="flex items-center gap-1">Quiz<MdOutlineQuiz /></p>
              </span>
            </NavLink>
          </div>}
          {userData?.user?.role === "teacher" && 
          <div className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/question">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
              <p className="flex items-center gap-1">Add_Qus<IoIosAddCircleOutline /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/question">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[125%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
              <p className="flex items-center gap-1">Add_Qus<IoIosAddCircleOutline /></p>
              </span>
            </NavLink>
          </div>}
          {userData && 
          <div className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/leaderBoard">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
              <p className="flex items-center gap-1">LEADER_BOARD<MdOutlineLeaderboard /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-lime-600'
              : 'text-black'
            } to="/leaderBoard">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[155%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
              <p className="flex items-center gap-1">LEADER_BOARD<MdOutlineLeaderboard /></p>
              </span>
            </NavLink>
          </div>}
        </div>
        <div className="flex items-center gap-2" >
          <div>
            {userData?.user?.role === "student" && <NavLink to='/myProfile'><img className="w-12 rounded-full bg-lime-200" src={student} alt="" /></NavLink>}
            {userData?.user?.role === "teacher" && <NavLink to='/myProfile'><img className="w-12 rounded-full bg-lime-200" src={teacher} alt="" /></NavLink>}
          </div>
          <div className="font-bold transition hover:text-lime-800">
            {!userData ? <NavLink to="/signUp">LOG-IN</NavLink>
              : <h1 onClick={() => handleLogout()} className="cursor-pointer">LOG-OUT</h1>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
