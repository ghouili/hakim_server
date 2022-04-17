const mongoose = require('mongoose');

const schema = mongoose.Schema;

const reclamationSchema = new schema ({
    image:{type: String, required: true},
    prod_name:{type: String, required: true},
    qte:{type: Number, required: true},
    date:{type: String},
    reason: {type: String, required: true},
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
})

module.exports = mongoose.model('reclamation', reclamationSchema);