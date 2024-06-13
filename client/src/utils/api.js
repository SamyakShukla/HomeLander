import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify'
// axios is used to make http requests to api's directly from frontend 

export const api = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500) {
            throw response.data;
        }
        return response.data;

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}


export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500) {
            throw response.data;
        }
        return response.data;

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }

}

export const createUser = async (email, token) => {
    try {
        await api.post(`/user/register`, { email }, {
            headers: {
                Authorization: `Bearer ${token}` //we are sending authorization headers to authorize our requests
            }
        })
    } catch (error) {
        toast.error("Something went wrong, Please try again")
        throw error
    }
}

export const bookVisit=async(date, propertyId, email, token)=>{
    try{
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id:propertyId,
            date: dayjs(date).format("DD/MM/YYYY")
        },
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })

    }catch(error){
        toast.error("Something went wrong please try again")
        throw error;

    }

}

export const cancelBooking=async(id, email, token)=>{
    try{
        await api.post(
            `/user/cancelBooking/${id}`,
            {
                email
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

    }
    catch(error){
        toast.error("Something went wrong with cancelling, Pls try again")
        throw error;
    }
}

export const toFav=async(id, email, token)=>{
    try{
        await api.post(
            `/user/toFav/${id}`,
            {
                email
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

    }catch(error)
    {
        throw error;
    }

}

export const allFav=async(email, token)=>{
    if(!token) return

    try{
        const res= await api.post(
            `/user/allFav`,
            {
                email
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        
        return res.data["favResidenciesID"];
    }
    catch(e)
    {
        toast.error("Something went wrong while fetching favourites")
        throw e;
    }
    
}

export const allBookings=async(email, token)=>{
    if(!token) return
    try{
        const res=await api.post(
            `/user/allBookings`,
            {
                email
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        // console.log(res)
        return res.data["bookedVisits"]

    }catch(e){
        toast.error("Something went wrong while fetching bookings")
        throw e
    }
}


export const createResidency=async(data, token)=>{
    // if(!token) return
    try{
        const res= await api.post(
            `/residency/create`,
            {
                data
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            },

        )

    }
    catch(error)
    {
        throw error;
    }
}
