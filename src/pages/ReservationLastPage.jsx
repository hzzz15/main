import React from 'react'
import ReservationLast from '../components/ReservationLast'
import BottomNavigation from '../components/BottomNavigation'

function ReservationPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <ReservationLast/>
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default ReservationPage
