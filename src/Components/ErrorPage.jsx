import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  
  const navigate = useNavigate();

  return (
    <div className='text-center w-full'>
      <h1>Nothing Here Click <span onClick={() => navigate('/home')} className='cursor-pointer text-blue-600'> here </span> to go back to Home Page</h1>
    </div>
  )
}

export default ErrorPage
