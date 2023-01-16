import React from 'react'
import { FiPlus } from 'react-icons/fi'

function LeftPaneScreen() {
  return (
    <div className=' h-screen flex justify-end bg-black'>
      <div className='mx-auto flex flex-col items-center justify-center gap-3 text-center'>
        <img src ='./logo.png' alt='logo' className='w-30 h-30' />
        <h3 className='font-semibold text-white'> Code Deck</h3>
        <h4 className='font-semibold text-white'> Code. Compile. Debug</h4>
        <button className='w-full p-4 bg-white shadow-lg rounded-full drop-shadow-2xl'>
          + Create New Playground
        </button>
      </div>
    </div>
  )
}

export default LeftPaneScreen