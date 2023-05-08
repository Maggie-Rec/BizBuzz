'use client'

import React from 'react'
import '@/styles/SideBar.css'

const SideBar = () => {
  return (
    <div className="container-sidebar">
      <div className="component">Reports</div>
      <div className="component">Emails</div>
      <div className="component">Campaigns</div>
      <div className="component">Complaints</div>
      <div className="component">Employee Manager</div>
      <div className="component">Inventory</div>
      <div className="component">Competition Map</div>
    </div>
  );
}

export default SideBar