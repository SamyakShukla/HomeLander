import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()

const app=express();

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // so we do not get to see cross-origin error
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} `);

});
//prisma is an abstraction of our database layer. we can have many databases like postgresql, mongo...prisma gives us a general way to deal with all kinds of databases. 

app.use('/api/user', userRoute)
app.use('/api/residency', residencyRoute);