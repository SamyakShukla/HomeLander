//first we have to check user is authenticated, if it is only then user can book a visit

import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {toast} from 'react-toastify'

const useAuthCheck = () => {
    const {isAuthenticated} =useAuth0()
    const validateLogin=()=>{
        if(!isAuthenticated)
        {
            toast.error("You must be logged in to book a visit or similar functionality", {position:"bottom-right"})
            return false
        }
        else{
            return true
        }
    }
  return (
    {
        validateLogin
    }
  )
}

export default useAuthCheck
