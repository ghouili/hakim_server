const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema ({
    message:{type: String, required: true},
    date:{type: String,},
    type_Nc:{type: String,},
    mtotif_nc:{type: String,},
    qte_totale:{type: Number,},
    qte_c:{type: Number,},
    qte_nc_present:{type: Number,},
    recyclage:{type: Number,},
    destruction:{type: Number,},
    df:{type: String,},
    lign_prod:{type: String,},
    incubation:{type: String,},
    temoin:{type: String,},
    observation:{type: String,},
    
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    reclamationid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },

})

module.exports = mongoose.model('task', taskSchema);