import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";

const index = () => {
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center">
      <div className="w-10/12 flex items-center justify-between">
        <p className="flex capitalize justify-center items-center gap-1"><MdCopyright/> 2024 <span className="text-orange-500">manotech.</span> All copyrights reserved</p>
        <div className="flex justify-center items-center gap-5 py-5">
            <span className="text-lg">Connect with Us</span> 
            <a href="" className="text-gray-800 hover:text-orange-500"><BsFacebook size={30}/></a>
            <a href="" className="text-gray-800 hover:text-orange-500"><FaInstagram size={30}/></a>
            <a href="" className="text-gray-800 hover:text-orange-500"><FaXTwitter size={30}/></a>
            <a href="" className="text-gray-800 hover:text-orange-500"><FaYoutube size={30}/></a>
        </div>
      </div>
    </div>
  );
};

export default index;
