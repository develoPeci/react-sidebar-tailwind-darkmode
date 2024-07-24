// src/Routers.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData, clearUserData } from './redux/slices/userData';
import Appfirebase from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc,getDoc } from 'firebase/firestore';

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

// SubPages Course
import DetailCouser from './pages/subpages/subpagesCourse/DetailCourse';

// Pages log in & register & newPassword
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import NewPassword from './pages/CreateNewPass';
import Register from './pages/Register';
import { getFirestore } from 'firebase/firestore';

const auth = getAuth(Appfirebase);
const db=getFirestore(Appfirebase)
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
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  
        console.log('User is signed in:', user);
        setUser(user);
        // dispatch(setUserData({
        //   uidUser: user.uid,
        //   nombres: user.nombres,
        //   apellidos: user.apellidos,
        //   correo: user.correo,
        //   // fotoDeperfil: user.photoURL,
        //   timezona: user.timezona,
        // }));
   
    });

    return () => unsubscribe();
  }, [dispatch]);

  const fetchUserData = async () => {
    try {
      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const dataUser = userDocSnap.data();
      if (userDocSnap.exists()) {
        console.log("la data es:",dataUser);
        await dispatch(setUserData({
          nombres: dataUser.nombres,
          apellidos: dataUser.apellidos,
          correo: dataUser.correo,
          fotoDeperfil: dataUser.nombre,
          uidUser: user.uid
        }));
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  };


useEffect(() => {
  if (user) {
    fetchUserData();
  }else{
    dispatch(clearUserData());
  }
 }, [user]);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/create-new-password' element={<NewPassword />} />
        <Route path='/register' element={<Register />} />

        {user ? (
          <Route>
            <Route path='/letsstart' element={<Questions />} />
            <Route path='/home' index element={<Home />} />
            <Route path='/course' element={<Course />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/MyAccount' element={<Account />} />
            <Route path='/MyAccount/PaymentMethod' element={<PaymentMethod />} />
            <Route path='/MyAccount/PastInvoices' element={<PastInvoices />} />
            <Route path="/course/:nombre" element={<DetailCouser />} />
          </Route>
        ) : (
          <Route path='*' element={<NotFound />} />
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
