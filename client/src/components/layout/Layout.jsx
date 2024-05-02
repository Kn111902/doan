import React from 'react';
import Footer from '../footter/Footer';
import Header from './components/Header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
