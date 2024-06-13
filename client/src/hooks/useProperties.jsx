import React from 'react'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'
//useQuery is a hook used for handling data fetching. returns object which is destructured
const useProperties = () => {
    const{data, isLoading, isError, refetch}= useQuery(
        "allProperties", getAllProperties, {refetchOnWindowFocus:false}
    )
  return {
    data, isError, isLoading, refetch
  }
}

export default useProperties
