import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <Outlet></Outlet>
        <Footer></Footer>
        
        </>
    );
};

export default MainLayout;