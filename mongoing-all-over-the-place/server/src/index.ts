//https://www.youtube.com/watch?v=rah1eSed3Nc&list=PLnZgHKyxHOEC_FgLfTEPxVp5_Pl-4qIJc

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { EventModel } from './models/events';

const app = express()
app.use(cors())
app.use(express.json());

//have to specify path in url
mongoose.connect(
    'mongodb+srv://jaylynwong30:MuNBXpm5kDWrlvPf@cluster0.ngbh0m0.mongodb.net/mern'
);
 
app.get("/get-events", async (req, res) => {
    console.log('/get-eventss called');
    try {
        const events = await EventModel.find();
        if (events.length > 0) {
            console.log('Mongoing all over the place', events);
        } else {
            console.log('no events found');
        }
        res.json(events);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

app.post('/create-event', async (req, res) => {
    const event = req.body;
    console.log('/create-event request body', event);
    const newEvent = new EventModel(event);
    await newEvent.save();
    res.json(event);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
app.listen(3000, ()=> {
    console.log("Server is Running");
})
*/