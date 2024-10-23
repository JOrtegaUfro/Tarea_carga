import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        min: 2,
    },
    genre: {
        type: String,
        required: true,
        min: 2,
    },
    platform: {
        type: String,
        required: true,
        min: 2,
    },
    launch_date: {
        type: Date,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    }

});

const gameModel = mongoose.model('Game', gameSchema);
export default gameModel;