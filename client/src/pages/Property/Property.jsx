import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation } from 'react-router-dom';
import { cancelBooking, getProperty } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import './Property.css'
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa'
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import UserDetailContext from '../../context/UserDetailContext';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import Heart from '../../components/Heart/Heart';

const Property = () => {
  const { pathname } = useLocation(); //it will give me complete path name of my page
  const id = pathname.split("/").slice(-1)[0]; //path gets divided into array elements on basis of / and-1 for from last indx 0th element
  // console.log(id);
  const { data, isError, isLoading } = useQuery(["resd", id], () => getProperty(id));

  const [modalOpened, setModalOpened]= useState(false);
  const {validateLogin}= useAuthCheck();
  const {user}= useAuth0();
  
  const {userDetails : {token, bookings}, setUserDetails}= useContext(UserDetailContext)

  const {mutate: removeBooking, isLoading: cancelling} =useMutation({
    mutationFn: ()=> cancelBooking(id, user?.email, token),
    onSuccess: ()=> {
      setUserDetails((prev)=>({
        ...prev,
        bookings: prev.bookings.filter((booking)=> booking?.id !== id)
      }))
      toast.success("Booking Cancelled successfully", {position: "bottom-right"})
    }
  })

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    )
  }

  if (isError) {
    <div className="wrapper">
      <div className="flexCenter paddings">
        <span>Error while fetching property details</span>
      </div>
    </div>
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">

        {/* like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/*image */}
        <img src={data?.image} alt="property image" />

        <div className="flexCenter property-details">

          {/* left side */}
          <div className="flexColStart left">
            {/*head */}
            <div className="flexStart head">
              <span className='primaryText' >{data?.title}</span>
              <span className='orangeText' style={{ fontSize: '1.5rem' }} >$ {data?.price}</span>
            </div>

            {/*facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color='#1F3E72' />
                <span>{data?.facilities?.bathrooms} Bathrooms </span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color='#1F3E72' />
                <span>{data?.facilities?.parkings} Parkings </span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color='#1F3E72' />
                <span>{data?.facilities?.bedrooms} Bedrooms </span>
              </div>
            </div>

            {/*description */}
            <span className='secondaryText' style={{ textAlign: 'justify' }} >
              {data?.description}
            </span>

            {/*address */}
            <div className="flexStart" style={{ gap: "1rem" }} >
              <MdLocationPin size={25} />
              <span className='secondaryText' >
                {data?.address} {" "}
                {data?.city} {" "}
                {data?.country}
              </span>
            </div>

            {/*booking button */}

            { bookings?.map((booking)=>booking.id).includes(id) ? (
              <>
              
              <Button variant="outline" w={"100%"} color="red" onClick={()=> removeBooking()} disabled={cancelling} >
                <span>Cancel Booking</span>
              </Button>

              <span>Your visit is already booked for date {bookings?.filter((booking)=>booking?.id===id)[0].date}</span>

              </>
            ) : (
            <button className="button"
            onClick={()=>{
              validateLogin() && setModalOpened(true)
            }}           
            >
              Book your visit
            </button>
            )}

            <BookingModal 
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId={id}
            email={user?.email}
            />

          </div>

          {/* right side */}
          <div className="map">
            <Map address={data?.address} city={data?.city} country={data?.country} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Property
