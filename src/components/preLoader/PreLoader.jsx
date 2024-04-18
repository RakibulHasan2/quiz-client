/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import './preloader.css'
import { preLoaderAnim } from "../../animations";
import img from "../../images/homeimg/pngwing.com (5).png"

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span className="mt-10">It's</span>
        <span><img src={img} alt="" className="w-32" /></span>
        <span  className="mt-10">Vives</span>
      </div>
    </div>
  );
};

export default PreLoader;