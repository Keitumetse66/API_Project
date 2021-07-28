/* allow to use models to interact with db easily */
const mongoose = require('mongoose');

/* creates a new db schema */
const clientSchema = new mongoose.Schema({
    /* object containing keys of all properties of clients */
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

/*allows interaction betwn cd and others */
module.exports = mongoose.model('Client', clientSchema);