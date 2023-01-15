import React from 'react'
import RightPaneScreen from '../Components/Home/RightPaneScreen';
import LeftPaneScreen from '../Components/Home/LeftPaneScreen';
function Home() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        <div className='md:w-full sm:w-full w-4/12 border-2'>
            <LeftPaneScreen />
        </div>

        <div className='md:w-full sm:w-full w-8/12 border-2'>
            <RightPaneScreen />
        </div>
    </div>
  )
}

export default Home