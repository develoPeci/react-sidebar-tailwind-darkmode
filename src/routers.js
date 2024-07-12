import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Layout from './components/Layout';
import ImgFound from './assets/images/imgnofound.png'
//Pages
import Home from './pages/Home';
import Course from './pages/Course';
import Resources from './pages/Resources';
import Account from './pages/Account';

//SubPages Account
import PaymentMethod from './pages/subpages/subpagesAccount/PaymentMethod';
import PastInvoices from './pages/subpages/subpagesAccount/PastInvoices';

//Subpages Course
import DetailCouser from './pages/subpages/subpagesCourse/DetailCourse';


//Pages log in & register & newPassword
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import NewPassword from './pages/CreateNewPass';
import Register from './pages/register'
//Auth firebase
import Appfirebase from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(Appfirebase);

const NotFound = () => {
  return(
    <div className='h-screen bg-black'>
      <div className=' bg-black flex'>
      <img src={ImgFound} alt="logo" className='h-96' />
      <h1>404 - Page Not Found</h1>;
      </div>
     
    </div>
  ) 
};

const Routers = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/create-new-password' element={<NewPassword />} />
        <Route path='/register' element={<Register />} />

        {user ? (
          <Route >
            <Route path='/home' index element={<Home />} />
            <Route path='/course' element={<Course />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/MyAccount' element={<Account />} />
            <Route path='/MyAccount/PaymentMethod' element={<PaymentMethod />} />
            <Route path='/MyAccount/PastInvoices' element={<PastInvoices />} />
            <Route path="/course/:courseName" element={<DetailCouser />} />
            </Route>
        ) : (
          <Route path='*' element={<NotFound />} />
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
