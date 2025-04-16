import React from 'react'
import {Loader} from  '@mantine/core'
function LoadingSpinner() {
  return (
    <div className='h-screen flex justify-center items-center'>
    <Loader size={24} color='black' />  
    </div>
  )
}

export default LoadingSpinner
