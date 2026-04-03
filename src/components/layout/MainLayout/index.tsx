import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Header';
import Footer from '../Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;