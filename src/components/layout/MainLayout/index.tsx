import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Header'
import Footer from '../Footer';

/* Main Layout structure 
   Estrutura principal do Layout */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content-area">
        {/* Outlet renders the current route component 
            Outlet renderiza o componente da rota atual */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;