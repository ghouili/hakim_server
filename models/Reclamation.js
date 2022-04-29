const mongoose = require('mongoose');

const schema = mongoose.Schema;

const reclamationSchema = new schema ({
    problem:{type: String, required: true},
    product:{type: String, required: true},
    type:{type: String, required: true},
    place:{type: String, required: true},
    nbr:{type: Number, required: true},
    image:{type: String},
    date:{type: String},
    userid:{ type: mongoose.Types.ObjectId, ref: "user" },
})

module.exports = mongoose.model('reclamation', reclamationSchema);