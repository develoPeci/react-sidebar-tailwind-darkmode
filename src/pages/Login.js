import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logofondo from "../assets/images/fondo.webp";
import LogoHeader from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { ImSpinner8 } from "react-icons/im";

import { Link } from "react-router-dom";
import AppFirebase from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(AppFirebase);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const functionAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
      console.log('inicio de sesion exitoso')
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Usuario no registrado');
      } else {
        setErrorMessage('Correo o contraseña incorrectos');
      }
    } finally {
      setLoading(false);

    }


  }




  return (
    <div
      className="dark:text-white top-0 left-0 w-full bg-cover bg-center bg-no-repeat min-h-screen flex-col justify-center"
      style={{
        backgroundImage: `url(${Logofondo})`,
      }}
    >
      <div className="bg-white p-4 flex justify-center">
        <img className="h-14" src={LogoHeader} alt="Logo" />
      </div>

      <div className=" mt-14 md:mt-0 py-4 md:py-14 flex justify-center rounded-md">
        <form onSubmit={functionAuth} className="bg-white rounded-xl flex flex-col justify-center py-10 px-7 md:px-14 md:py-18 gap-4 w-auto
">
          <div className="flex flex-col">
            <label className="font-semibold py-0 md:py-1">User</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                className="p-2 border border-gray-300 w-full rounded-full placeholder-gray-300 pl-10"
                type="text"
                required
                id="email"
                placeholder="Enter user"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold py-0 md:py-1">Password</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                className="p-2 border border-gray-300 w-full rounded-full placeholder-gray-300 pl-10"
                type={showPassword ? "text" : "password"}
                required
                id="password"
                placeholder="Enter password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <label>Remember Me</label>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </div>
          )}
          <button className="p-2 bg-black text-white rounded-xl transition  flex items-center justify-center">
            {loading ?
              <ImSpinner8 className="animate-spin text-white h-5 w-5" />

              : 'Log in'

            }
          </button>

          <div className="flex justify-center items-center gap-4">
            <div>
              <Link
                to="/password-reset"
                className="text-xs font-semibold"
                style={{ fontSize: "15px" }}
              >
                Lost Your Password?
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="text-xs font-semibold"
                style={{ fontSize: "15px" }}
              >
                Don't have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
