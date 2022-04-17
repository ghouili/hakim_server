const reclamation = require('../models/Reclamation');
const user = require('../models/user');

const GetAll = async (req, res) => {

    let existingreclamation;
    try {
        existingreclamation = await reclamation.find();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'success', data: existingreclamation});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({message: "reclamation doens't exist!!"});
    }

    return res.status(200).json({messag: 'success', data: existingreclamation});
}

const Deletereclamation = async (req, res) => {
 
    const {id} = req.params;

    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({message: "reclamation doens't exist!!"});
    }

    try {
        await existingreclamation.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

const Updatereclamation = async (req, res) => {

    const { pro_name, qte, date, reason } = req.body;
    const {id} = req.params;

    let existingreclamation;

    try {
        existingreclamation = await reclamation.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingreclamation) {
        return res.status(500).json({message: "reclamation doens't exist!!"});
    }

    existingreclamation.pro_name = pro_name;
    existingreclamation.qte = qte;
    existingreclamation.date = date;
    existingreclamation.reason = reason;

    try {
        await existingreclamation.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existingreclamation});

}

const Ajout = async (req, res) => {

    const { prod_name, qte, date, reason, userid } = req.body;

    const newreclamation = new reclamation({
        prod_name, 
        qte,
        date,
        reason,
        userid,
        image: req.file.filename
    })

    let existinguser;

    try {
        existinguser = await user.findById(userid);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    try {
        await newreclamation.save();
        existinguser.reclamations.push(newreclamation);
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({messag: 'success', data: newreclamation});
}




exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updatereclamation = Updatereclamation;
exports.Ajout = Ajout;
exports.Deletereclamation = Deletereclamation;

