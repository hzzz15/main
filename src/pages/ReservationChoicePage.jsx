import React from 'react'
import ReservationChoice from '../components/ReservationChoice'
import BottomNavigation from '../components/BottomNavigation'

function ReservationChoicePage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <ReservationChoice/>
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default ReservationChoicePage
