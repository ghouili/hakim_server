const service = require('../models/service');
const user = require('../models/user');
const moment = require('moment');



const GetAll_for_Client = async (req, res) => {
    const {id} = req.body;
    // console.log(req.body);
    let existingservice;
    try {
        existingservice = await service.find({userid : id});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existingservice});
}

const GetAll = async (req, res) => {

    let existingservice;
    try {
        existingservice = await service.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existingservice});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingservice;

    try {
        existingservice = await service.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingservice) {
        return res.status(500).json({success: false, message: "service doens't exist!!"});
    }

    return res.status(200).json({success: true, messag: 'success', data: existingservice});
}

const Deleteservice = async (req, res) => {
 
    const {id} = req.params;

    let existingservice;

    try {
        existingservice = await service.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", data: error});
    }

    if (!existingservice) {
        return res.status(500).json({success: false, message: "service doens't exist!!"});
    }

    try {
        await existingservice.remove();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'deleted successfully'});

}

const Updateservice = async (req, res) => {

    const { problem, type, place } = req.body;
    console.log(req.body);
    const {id} = req.params;

    let existingservice;

    try {
        existingservice = await service.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong in DB", data: error});
    }

    if (!existingservice) {
        return res.status(500).json({success: false, message: "service doens't exist!!"});
    }

    existingservice.problem = problem;
    existingservice.type = type;
    existingservice.place = place;
    if(req.file){
        existingservice.image = req.file.filename;

    }

    try {
        await existingservice.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, messag: 'successfully updated', data: existingservice});

}

const Ajout = async (req, res) => {

    const { problem, userid, type, place } = req.body;

    let image = 'natilait.png';
    if(req.file) {
        image = req.file.filename;
    }

    const date = moment(new Date()).format('YYYY-DD-YY HH:MM:SS');

    const newservice = new service({
        type,
        problem,
        place,
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
        await newservice.save();
        existinguser.services.push(newservice);
        await existinguser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong while saving", data: error});
    }

    return res.status(201).json({success: true, message: 'success', data: newservice});
}




exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updateservice = Updateservice;
exports.Ajout = Ajout;
exports.Deleteservice = Deleteservice;
exports.GetAll_for_Client = GetAll_for_Client;

