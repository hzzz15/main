import React from 'react'
import Profile from '../components/Profile'
import BottomNavigation from '../components/BottomNavigation'

function ProfilePage() {
  return (
    <div className="page-wrapper">
      <Profile/>
      <BottomNavigation/>
    </div>
  )
}

export default ProfilePage