const mongoose = require('mongoose');

const schema = mongoose.Schema;

const serviceSchema = new schema ({
    problem:{type: String, required: true},
    type:{type: String, required: true},
    place:{type: String, required: true},
    image:{type: String},
    affected:{type: Boolean},
    date:{type: String},
    userid:{ type: mongoose.Types.ObjectId, ref: "user" },
})

module.exports = mongoose.model('service', serviceSchema);