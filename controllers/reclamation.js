const reclamation = require('../models/Reclamation');
const user = require('../models/user');
const moment = require('moment');

const GetAll = async (req, res) => {

    let existingreclamation;
    try {
        existingreclamation = await reclamation.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existingreclamation});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({success: false, message: "reclamation doens't exist!!"});
    }

    return res.status(200).json({success: true, messag: 'success', data: existingreclamation});
}

const Deletereclamation = async (req, res) => {
 
    const {id} = req.params;

    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({success: false, message: "reclamation doens't exist!!"});
    }

    try {
        await existingreclamation.remove();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'deleted successfully'});

}

const Updatereclamation = async (req, res) => {

    const { problem,  product, nbr, type, place } = req.body;
    console.log(req.body);
    const {id} = req.params;

    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong in DB", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({success: false, message: "reclamation doens't exist!!"});
    }

    existingreclamation.problem = problem;
    existingreclamation.nbr = nbr;
    existingreclamation.product = product;
    existingreclamation.type = type;
    existingreclamation.place = place;
    if(req.file){
        existingreclamation.image = req.file.filename;

    }

    try {
        await existingreclamation.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, messag: 'successfully updated', data: existingreclamation});

}

const Ajout = async (req, res) => {

    const { problem, userid, product, nbr, type, place } = req.body;

    let image = 'natilait.png';
    if(req.file) {
        image = req.file.filename;
    }

    const date = moment(new Date()).format('YYYY-DD-YY HH:MM:SS');

    const newreclamation = new reclamation({
        type,
        problem,
        product, 
        place,
        nbr,
        userid,
        image,
        affected: false,
        date
    })

    let existinguser;

    try {
        existinguser = await user.findById(userid);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    try {
        await newreclamation.save();
        existinguser.reclamations.push(newreclamation);
        await existinguser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong while saving", data: error});
    }

    return res.status(201).json({success: true, message: 'success', data: newreclamation});
}




exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updatereclamation = Updatereclamation;
exports.Ajout = Ajout;
exports.Deletereclamation = Deletereclamation;

