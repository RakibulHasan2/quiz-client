import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="">
      <div>
        <Navbar/> 
      </div>
      <div className="w-full pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
