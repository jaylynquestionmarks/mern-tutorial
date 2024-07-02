import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
})

export interface Event {
    _id: string
    name: string
    day: string
}

export type NewEvent = Omit<Event, "_id">;

export const EventModel = mongoose.model("events", EventSchema);
