import React from 'react'
import Like from '../components/Like'
import BottomNavigation from '../components/BottomNavigation'

function LikePage() {
  return (
    <div className="page-wrapper" style={{ overflow: 'hidden' }}>
      <Like/>
      <BottomNavigation/>
    </div>
  )
}

export default LikePage
