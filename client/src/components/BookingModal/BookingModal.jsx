import React, { useContext, useState } from 'react'
import {Modal, Button} from '@mantine/core'
import {DatePicker} from '@mantine/dates'
import {useMutation} from 'react-query'
import UserDetailContext from '../../../src/context/UserDetailContext'
import { bookVisit } from '../../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
const BookingModal = ({opened, setOpened, email, propertyId}) => {

  const [value, setValue]=useState(null);

  const {userDetails : {token}, setUserDetails}= useContext(UserDetailContext)
// console.log(token)

  const handleBookingSuccess=()=>{
    toast.success("You have successfully booked your visit",{
      position:"bottom-right",
    });
    setUserDetails((prev)=>({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id:propertyId, date:dayjs(value).format("DD/MM/YYYY")   
        }
      ]
    }))
  }

  const {mutate, isLoading}= useMutation({
    mutationFn:()=> bookVisit(value, propertyId, email, token),
    onSuccess: ()=>handleBookingSuccess(),
    onError:({response})=> toast.error(response.data.message),
    onSettled:()=> setOpened(false)
     
  })
  return (
    <Modal
    opened={opened}
    onClose={()=>setOpened(false)}
    title="Select your preferred date for visit"
    centered
    >
      <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={()=>mutate()} >
          Book Visit
        </Button>
      </div>
        
    </Modal>
  )
}
//when we are using react query then we always try to use mutate function when we have to upload the data to the database
//when we areupdating something in the database then we mostly use useMutation instead of useQuery
export default BookingModal
