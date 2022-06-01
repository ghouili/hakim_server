const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema ({
    message:{type: String,},
    date:{type: String,},
    message: { type: String}, 
    reclamationid: { type: String}, 
    userid: { type: String},
    activeStep: { type: String},
    task_d: { type: String},
    reclam: { type: String},
    client: { type: String},
    receptionaire: { type: String},
    nature_reclam: { type: String},
    date_livaraison: { type: String},
    nbr_facture: { type: String},
    gravite: { type: String},
    service: { type: String},
    dlc: { type: String},
    responsable_invst: { type: String},
    dalai_invst: { type: String},
    invst: { type: String},
    rapp_invst: { type: String},
    appr_invst: { type: String},
    date_appr: { type: String},
    date_clot: { type: String},
    date_clotdate_clot: { type: String},
    rapp_clot: { type: String},
    resp_approb: { type: String},
    date_approb: { type: String},
    comment: { type: String},
    date_retour: { type: String},
    piece_joint: { type: String},
    natilait: { type: String},
    qte_totale: { type: String},
    DLC: { type: String},
    df: { type: String},
    source: { type: String},
    qte_c: { type: String},
    condition: { type: String},
    ligne_prod: { type: String},
    article: { type: String},
    qte_nc: { type: String},
    incubation: { type: String},
    type_nc: { type: String},
    recycle: { type: String},
    temoin: { type: String},
    motif_nc: { type: String},
    destruction: { type: String},
    observation: { type: String},
    done: { type: Boolean},
    
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    reclamationid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },

})

module.exports = mongoose.model('task', taskSchema);