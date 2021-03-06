const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema ({
    email:{type: String, required: true, unique: true},
    nom:{type: String, required: true},
    prenom:{type: String, required: true},
    tel:{type: Number, required: true},
    avatar:{type: String, default: 'avatar.png'},
    password: {type: String, },
    poste: {type: String, },        
    reclamations:[{ type: mongoose.Types.ObjectId, ref: "reclamation" }],
    services:[{ type: mongoose.Types.ObjectId, ref: "service" }],
    suggestions:[{ type: mongoose.Types.ObjectId, ref: "suggestion" }],
    tasks:[{ type: mongoose.Types.ObjectId, ref: "task" }],
})

module.exports = mongoose.model('user', userSchema);