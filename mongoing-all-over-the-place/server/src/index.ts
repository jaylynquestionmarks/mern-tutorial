//https://www.youtube.com/watch?v=rah1eSed3Nc&list=PLnZgHKyxHOEC_FgLfTEPxVp5_Pl-4qIJc

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserModel } from './models/users';

const appHttpServer = express()
appHttpServer.use(cors())
appHttpServer.use(express.json());

//have to specify path in url
mongoose.connect(
    'mongodb+srv://jaylynwong30:MuNBXpm5kDWrlvPf@cluster0.ngbh0m0.mongodb.net/mern'
);
 
appHttpServer.get("/get-users", async (req, res) => {
    console.log('/get-users called');
    try {
        const users = await UserModel.find();
        if (users.length > 0) {
            console.log('Mongoing all over the place', users);
        } else {
            console.log('no users found');
        }
        res.json(users);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

appHttpServer.post('/create-user', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

const PORT = process.env.PORT || 3000;
appHttpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
app.listen(3000, ()=> {
    console.log("Server is Running");
})
*/