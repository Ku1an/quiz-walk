import mongoose from "mongoose";


const seedSchema = new mongoose.Schema({
    seed: Boolean,
})

export const Seed = mongoose.model('Seed', seedSchema)