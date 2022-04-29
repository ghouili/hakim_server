const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema ({
    email:{type: String, required: true, unique: true},
    nom:{type: String, required: true},
    prenom:{type: String, required: true},
    tel:{type: Number, required: true},
    avatar:{type: String, default: 'avatar.png'},
    password: {type: String, },
    reclamations:[{ type: mongoose.Types.ObjectId, ref: "reclamation" }],
    suggestions:[{ type: mongoose.Types.ObjectId, ref: "suggestion" }],
})

module.exports = mongoose.model('user', userSchema);