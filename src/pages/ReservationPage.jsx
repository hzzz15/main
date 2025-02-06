import React from 'react'
import Reservation from '../components/Reservation'
import BottomNavigation from '../components/BottomNavigation'

function ReservationPage() {
  return (
    <div className="page-wrapper">
      <Reservation/>
      <BottomNavigation/>
    </div>
  )
}

export default ReservationPage
