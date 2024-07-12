import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import Loading from './Loading';
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
      {loading && <Loading />} 
      <div className='flex flex-auto min-h-screen '>
        <Sidebar />
        <div className='grow'>
          <Navbar setLoading={setLoading} />
          <div className='mx-0 md:mx-60 md:w-4/5'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout
