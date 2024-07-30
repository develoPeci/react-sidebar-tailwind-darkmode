import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, clearUserData } from './redux/slices/userData';
import Appfirebase from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import ImgFound from './assets/images/imgnofound.png';

// Pages
import Home from './pages/Home';
import Course from './pages/Course';
import Resources from './pages/Resources';
import Account from './pages/Account';
import Questions from './pages/Questions';

// SubPages Account
import PaymentMethod from './pages/subpages/subpagesAccount/PaymentMethod';
import PastInvoices from './pages/subpages/subpagesAccount/PastInvoices';
import Logo from "./assets/images/logo.svg";
// SubPages Course
import DetailCouser from './pages/subpages/subpagesCourse/DetailCourse';

// Pages log in & register & newPassword
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import NewPassword from './pages/CreateNewPass';
import Register from './pages/Register';

const auth = getAuth(Appfirebase);
const db = getFirestore(Appfirebase);

const NotFound = () => {
  return (
    <div className='h-screen bg-black'>
      <div className='bg-black flex'>
        <img src={ImgFound} alt="logo" className='h-96' />
        <h1>404 - Page Not Found</h1>
      </div>
    </div>
  );
};

const Routers = () => {
  const [user, setUser] = useState(null);
  const [ordenTrue, setOrdenTrue] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Stop loading after checking authentication
    });

    return () => unsubscribe();
  }, [dispatch]);

  const fetchUserData = () => {
    if (!user) return;

    const userDocRef = doc(db, 'usuarios', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
      if (userDocSnap.exists()) {
        const dataUser = userDocSnap.data();
        console.log("la data es:", dataUser);

        setOrdenTrue(dataUser.orden);
        console.log("la orden es:", dataUser.orden);

        dispatch(setUserData({
          nombres: dataUser.nombres,
          apellidos: dataUser.apellidos,
          correo: dataUser.correo,
          fotoDeperfil: dataUser.nombre,
          uidUser: user.uid,
          orden: dataUser.orden
        }));
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    }, (error) => {
      console.error('Error al obtener datos de usuario:', error);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = fetchUserData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } else {
      dispatch(clearUserData());
      setLoading(false); // Stop loading if no user
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (ordenTrue === undefined || ordenTrue === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [ordenTrue]);

  if (loading) {
    return <div>
      <div className="bg-blue">
        <div className='flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
          <div className='flex items-center justify-center gap-2'>
            <img src={Logo} alt="logo" className='h-100 w-100 invert' />
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <Router>
      <Routes>
        {user ? (
          ordenTrue === "" ? (
            <>
              <Route path="*" element={<Navigate to="/letsstart" />} />
              <Route path="/letsstart" element={<Questions />} />
            </>
          ) : (
            <>
              <Route path="/letsstart" element={<Navigate to="/home" />} />
              <Route path='/home' index element={<Home />} />
              <Route path='/course' element={<Course />} />
              <Route path='/resources' element={<Resources />} />
              <Route path='/MyAccount' element={<Account />} />
              <Route path='/MyAccount/PaymentMethod' element={<PaymentMethod />} />
              <Route path='/MyAccount/PastInvoices' element={<PastInvoices />} />
              <Route path="/course/:nombre" element={<DetailCouser />} />
              <Route path="*" element={<NotFound />} />
            </>
          )
        ) : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/password-reset' element={<PasswordReset />} />
            <Route path='/create-new-password' element={<NewPassword />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
