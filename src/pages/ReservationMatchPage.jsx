import React from 'react'
import ReservationMatch from '../components/ReservationMatch'
import BottomNavigation from '../components/BottomNavigation'

function ReservationMatchPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <ReservationMatch/>
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default ReservationMatchPage
