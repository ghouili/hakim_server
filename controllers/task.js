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

    const { message, userid, reclamationid, type_Nc, mtotif_nc, qte_totale, qte_c, qte_nc_present, recyclage, destruction, df, lign_prod, incubation, temoin, observation, } = req.body;
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

    existingtask.message = message;
    existingtask.useid = userid;
    existingtask.reclamationid  = reclamationid = 
    existingtask.type_Nc = type_Nc;
    existingtask.mtotif_nc = mtotif_nc;
    existingtask.qte_totale = qte_totale;
    existingtask.qte_c = qte_c;
    existingtask.qte_nc_present = qte_nc_present;
    existingtask.recyclage = recyclage;
    existingtask.destruction = destruction;
    existingtask.df = df;
    existingtask.lign_prod = lign_prod;
    existingtask.incubation = incubation;
    existingtask.temoin = temoin;
    existingtask.observation = observation;

    try {
        await existingtask.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existingtask});

}

const Ajout = async (req, res) => {

    const { message, userid, reclamationid, type_Nc, mtotif_nc, qte_totale, qte_c, qte_nc_present, recyclage, destruction, df, lign_prod, incubation, temoin, observation, } = req.body;
    const date = moment(new Date()).format('YYYY-DD-YY HH:MM:SS');
    // console.log(req.body);
    const newtask = new task({
        reclamationid,
        message,
        userid,
        date,
        type_Nc,
        mtotif_nc,
        qte_totale,
        qte_c,
        qte_nc_present,
        recyclage,
        destruction,
        df,
        lign_prod,
        incubation,
        temoin,
        observation,
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

