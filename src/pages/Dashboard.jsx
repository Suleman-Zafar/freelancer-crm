import React from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import MainContent from '../components/layout/MainContent'
const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Footer />
    </div>
  )
}

export default Dashboard;