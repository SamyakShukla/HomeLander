import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createUser=asyncHandler(async(req, res)=>{
    console.log("Creating a user");
    let { email }= req.body;
    
    const userExists=await prisma.user.findUnique({where:{email:email}})
    if(!userExists)
    {
        const user=await prisma.user.create({data: req.body}); //creating user document inside user collection
        res.send({
            message: "User is now creaated",
            user:user,
        })

    }
    else
    {
        res.status(201).json({message: "User already exists"});
    }
    
})

//book visit to a residency
//req body will need email to figure out which user is going to book the date, and also the date that needs to be booked
// id is needed to figure out against which residency user is trying to book visit
export const bookVisit=asyncHandler(async(req,res)=>{
    const { email, date} =req.body;
    const {id}=req.params;

    try{
        const alreadyBooked=await prisma.user.findUnique({
            where:{email:email},
            select: {bookedVisits:true}
        })
        if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id))
        {
            res.status(400).json({message:"This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id, date}}
                }
            })
            res.send("Your visit is booked successfully")
        }

    }catch(err)
    {
        throw new Error(err.message)
    }

})

//funcn to get all bookings of user
export const allBookings=asyncHandler(async(req,res)=>{
    const {email}= req.body;
    try{
        const bookings=await prisma.user.findUnique({
            where:{email:email},
            select:{
                bookedVisits:true
            }
        })
        res.status(200).send(bookings);
    }catch(err)
    {
        throw new Error(err.message);
    }
})

//to cancel a booking againsta a id of residency
export const cancelBooking=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params;
    try{
        const user= await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
    })
    const index= user.bookedVisits.findIndex((visit)=>visit.id===id)
    if(index===-1)
    {
        res.status(404).json({message:"Booking not found !!"})
    }
    else{
        user.bookedVisits.splice(index,1);
        await prisma.user.update({
            where:{email:email},
            data:{
                bookedVisits:user.bookedVisits
            }
        })
        res.send("Booking successfully deleted");
    }
    }catch(err){
        throw new Error(err.message);

    }
})

//function to add a residency to favourite
export const toFav=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {rid}=req.params;
    try{
        const user=await prisma.user.findUnique({
            where:{email:email},

        })
        if(user.favResidenciesID.includes(rid))
        {
            const updateUser=await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter((id)=>id!==rid)
                    }
                }

            })
            res.send({message:"Removed from favourites", user:updateUser})
        }
        else{
            const updateUser= await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            })
            res.send({message:"Added to Favourites", user:updateUser})
        }

    }catch(err)
    {
        throw new Error(err.message);
    }
})

//function to get all fav residencies
export const allFav=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const favResd= await prisma.user.findUnique({
            where:{email:email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favResd)
    }catch(err)
    {
        throw new Error(err.message);
    }
})