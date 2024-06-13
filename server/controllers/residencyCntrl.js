import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createResidency = asyncHandler(async(req, res) => {
    console.log("Creating a Residency");

    const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data;
    //userEmail is a relationship which is used in owner field so we change only that
    console.log(req.body.data);
    // we are connecting user field with the owner field and owner field in return gets connected to email field
    try {
        const residency = await prisma.residency.create({
          data: {
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner: { connect: { email: userEmail } },
          },
        });
    
        res.send({ message: "Residency created successfully", residency });
      } 
    catch (err) {
        if (err.code === "P2002") {
            throw new Error("A residency with same address already exists");
        }
        throw new Error(err.message);
    }


})
//get all residencies
export const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
    res.send(residencies)
})

//gett specific residency
export const getResidency=asyncHandler(async(req,res)=>{
    const { id } = req.params;


    try{
        const residency = await prisma.residency.findUnique({
            where: {id:id}
        })
        res.send(residency);
    }catch(err){
        throw new Error(err.message);
    }

})

