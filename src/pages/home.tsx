import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
// import Dashboard from '../components/dashboard/dashboard';

export default function Home() {
  return (
    <div className="Home">
      <Navbar />
      {/* <Dashboard/> */}
      <h1>This is the Homepage.</h1>
      <Footer />
    </div>
  );
}
