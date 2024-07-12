import React, { useState } from "react";
import Logofondo from "../assets/images/fondo.webp";
import LogoHeader from "../assets/images/logo.svg";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock , faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
    className="dark:text-white top-0 left-0 w-full bg-cover bg-center bg-no-repeat min-h-screen flex-col justify-center"
    style={{
      backgroundImage: `url(${Logofondo})`,
    }}
  >
      <div className="bg-white p-4 flex justify-center">
        <Link to='/'>
          <img alt="logo" className="h-14" src={LogoHeader} />
        </Link>
      </div>

      <div className=" mt-14 md:mt-0 py-4 md:py-14 flex justify-center rounded-md">
      <form className="bg-white rounded-xl flex flex-col justify-center py-10 px-7 md:px-14 md:py-18 gap-4 w-auto
">
          <div className="flex flex-col">
          <label className="text-center text-2xl font-semibold">Reset Password</label>
            <label className="font-regular py-0 md:py-1 text-1xl md:text-title text-center mb-2">
            This password should be differtent<br/>
 from the previouse password.
            </label>
            <label className="font-semibold py-0 md:py-1">Password</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                className="p-2 border border-gray-300 w-full rounded-full placeholder-gray-100 pl-10"
                type={showPassword ? "text" : "password"}
                required
                id='NewPassword'
                placeholder="Enter new password"
              />
                 <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
         onClick={togglePasswordVisibility}
        />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold py-0 md:py-1">Confirm Password</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                className="p-2 border border-gray-300 w-full rounded-full placeholder-gray-100 pl-10"
                type= "password"
                required
                id='Confirmpassword'
                placeholder="Confir new password"
              />
       
            </div>
          </div>

          <button className="p-2 bg-black text-white rounded-xl transition">
           Reset password
          </button>

         
        </form>
      </div>
    </div>
  );
};

export default Account;
