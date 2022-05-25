const task = require('../models/task');
const user = require('../models/user');
const reclamation = require('../models/Reclamation');
const moment = require('moment');

const GetAll = async (req, res) => {

    let existingtask;
    try {
        existingtask = await task.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, messag: 'success', data: existingtask});
}

const GetAll_assistant = async (req, res) => {

    const {id} = req.params;
    let existingretask;
    try {
        existingretask = await task.find({userid : id});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existingretask});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingtask;

    try {
        existingtask = await task.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingtask) {
        return res.status(500).json({message: "task doens't exist!!"});
    }

    return res.status(200).json({messag: 'success', data: existingtask});
}

const Deletetask = async (req, res) => {
 
    const {id} = req.params;

    let existingtask;

    try {
        existingtask = await task.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingtask) {
        return res.status(500).json({message: "task doens't exist!!"});
    }

    try {
        await existingtask.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

const Updatetask = async (req, res) => {

    const { message, 
        reclamationid, 
        userid,
        type_reclam,
        activeStep,
        task_d,
        reclam,
        client,
        receptionaire,
        nature_reclam,
        date_livaraison,
        nbr_facture,
        gravite,
        service,
        dlc,
        responsable_invst,
        dalai_invst,
        invst,
        rapp_invst,
        appr_invst,
        date_appr,
        date_clot,
        date_clotdate_clot,
        rapp_clot,
        resp_approb,
        date_approb,
        comment,
        date_retour,
        piece_joint,
        natilait,
        qte_totale,
        DLC,
        df,
        source,
        qte_c,
        condition,
        ligne_prod,
        article,
        qte_nc,
        incubation,
        type_nc,
        recycle,
        temoin,
        motif_nc,
        destruction,
        observation } = req.body;
    const {id} = req.params;
    console.log(id);

    let existingtask;

    try {
        existingtask = await task.findById(id);
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingtask) {
        return res.status(500).json({success: false, message: "task doens't exist!!"});
    }


    existingtask.activeStep = activeStep;
    existingtask.task_d = task_d;
    existingtask.reclam = reclam;
    existingtask.client = client;
    existingtask.receptionaire = receptionaire;
    existingtask.nature_reclam = nature_reclam;
    existingtask.date_livaraison = date_livaraison;
    existingtask.nbr_facture = nbr_facture;
    existingtask.gravite = gravite;
    existingtask.service = service;
    existingtask.dlc = dlc;
    existingtask.responsable_invst = responsable_invst;
    existingtask.dalai_invst = dalai_invst;
    existingtask.invst = invst;
    existingtask.rapp_invst = rapp_invst;
    existingtask.appr_invst = appr_invst;
    existingtask.date_appr = date_appr;
    existingtask.date_clot = date_clot;
    existingtask.date_clotdate_clot = date_clotdate_clot;
    existingtask.rapp_clot = rapp_clot;
    existingtask.resp_approb = resp_approb;
    existingtask.date_approb = date_approb;
    existingtask.comment = comment;
    existingtask.date_retour = date_retour;
    existingtask.piece_joint = piece_joint;
    existingtask.natilait = natilait;
    existingtask.qte_totale = qte_totale;
    existingtask.DLC = DLC;
    existingtask.df = df;
    existingtask.source = source;
    existingtask.qte_c = qte_c;
    existingtask.condition = condition;
    existingtask.ligne_prod = ligne_prod;
    existingtask.article = article;
    existingtask.qte_nc = qte_nc;
    existingtask.incubation = incubation;
    existingtask.type_nc = type_nc;
    existingtask.recycle = recycle;
    existingtask.temoin = temoin;
    existingtask.motif_nc = motif_nc;
    existingtask.destruction = destruction;
    existingtask.observation = observation;
    existingtask.type_reclam = type_reclam;

    try {
        await existingtask.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existingtask});

}

const Ajout = async (req, res) => {


    const { message, 
        reclamationid, 
        userid,
        activeStep,
        task_d,
        reclam,
        client,
        receptionaire,
        nature_reclam,
        date_livaraison,
        nbr_facture,
        gravite,
        service,
        dlc,
        responsable_invst,
        dalai_invst,
        invst,
        rapp_invst,
        appr_invst,
        date_appr,
        date_clot,
        date_clotdate_clot,
        rapp_clot,
        resp_approb,
        date_approb,
        comment,
        date_retour,
        piece_joint,
        natilait,
        qte_totale,
        DLC,
        df,
        source,
        qte_c,
        condition,
        ligne_prod,
        article,
        qte_nc,
        incubation,
        type_nc,
        recycle,
        temoin,
        motif_nc,
        destruction,
        observation } = req.body;

    const date = moment(new Date()).format('YYYY-DD-YY HH:MM:SS');

    const newtask = new task({
        message,
        reclamationid,
        userid,
        date,
        activeStep: null,
        type_reclam: null,
        task_d: null,
        reclam: null,
        client: null,
        receptionaire: null,
        nature_reclam: null,
        date_livaraison: null,
        nbr_facture: null,
        gravite: null,
        service: null,
        dlc: null,
        responsable_invst: null,
        dalai_invst: null,
        invst: null,
        rapp_invst: null,
        appr_invst: null,
        date_appr: null,
        date_clot: null,
        date_clotdate_clot: null,
        rapp_clot: null,
        resp_approb: null,
        date_approb: null,
        comment: null,
        date_retour: null,
        piece_joint: null,
        natilait: null,
        qte_totale: null,
        DLC: null,
        df: null,
        source: null,
        qte_c: null,
        condition: null,
        ligne_prod: null,
        article: null,
        qte_nc: null,
        incubation: null,
        type_nc: null,
        recycle: null,
        temoin: null,
        motif_nc: null,
        destruction: null,
        observation: null,
    })

    let existinguser;

    try {
        existinguser = await user.findById(userid);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong find ", data: error});
    }

    try {
        await newtask.save();
        existinguser.tasks.push(newtask);
        await existinguser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong here ", data: error});
    }

    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(reclamationid);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    existingreclamation.affected = true;

    try {
        await existingreclamation.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong here ", data: error});
    }
    return res.status(201).json({success: true, message: 'Task affected succefully', data: newtask});
}




exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updatetask = Updatetask;
exports.Ajout = Ajout;
exports.Deletetask = Deletetask;
exports.GetAll_assistant = GetAll_assistant;

