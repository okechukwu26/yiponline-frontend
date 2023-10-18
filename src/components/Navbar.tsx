// import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

//AiOutlineMenuUnfold AiOutlineClose

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const ChangeIcon = () => {
    setOpen(!open);
  };
  const style = () => {
    let classes =
      "md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500";
    console.log(open);
    if (open) {
      classes += " top-[80px] opacity-100 z-[100]";
    }

    console.log(classes);

    return classes;
  };
  return (
    <>
      <nav className="p-5 bg-white shadow font-[poppins] md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <span className="sm:text-xl text-2xl cursor-pointer ">
            {" "}
            <TbTruckDelivery color="emerald" size="3em" className="inline" />
            Swift-Express
          </span>

          <span
            className="text-3xl cursor-pointer mx-2 md:hidden block"
            onClick={ChangeIcon}
          >
            {!open && <AiOutlineMenuUnfold size="1em" />}
            {open && <AiOutlineClose size="1em" />}
          </span>
        </div>
        <ul className={style()}>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Home
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              About
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Blog
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Service
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="#" className="text-xl hover:text-green-500 duration-500">
              Contact
            </a>
          </li>
          <button className="bg-green-800 duration-500 text-white font-[poppins] px-6 py-2 mx-4 hover:bg-green-500 rounded-xl">
            Get Started
          </button>
        </ul>
      </nav>
      {/* <div className=" bg-emerald-400 flex  justify-between items-center overflow-hidden   w-full h-20">
    <div className='flex items-center justify-center ml-5'>
  <TbTruckDelivery color="white"  size="3em" className="ml-5" /> 
  <div className="ml-3 font-bold text-2xl text-white">
  <p className="font-sans"> Swift </p>
  <p>Express</p>

  </div>
      </div>

      <ul className="list-none xs:hidden sm:hidden md:flex mr-4">
        <li className=' p-3 hover:text-white '>Home</li>
        <li className=' p-3 hover:text-white '>About</li>
        <li className=' p-3 hover:text-white '>Blog</li>
        <li className=' p-3 hover:text-white '>Contact</li>
        

</ul>



  </div> */}
    </>
  );
};

export default Navbar;

//GrDeliver
