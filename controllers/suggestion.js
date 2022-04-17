const suggestion = require('../models/suggestion');
const user = require('../models/user');

const GetAll = async (req, res) => {

    let existingsuggestion;
    try {
        existingsuggestion = await suggestion.find();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existingsuggestion});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingsuggestion;

    try {
        existingsuggestion = await suggestion.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingsuggestion) {
        return res.status(500).json({message: "suggestion doens't exist!!"});
    }

    return res.status(200).json({messag: 'success', data: existingsuggestion});
}

const Deletesuggestion = async (req, res) => {
 
    const {id} = req.params;

    let existingsuggestion;

    try {
        existingsuggestion = await suggestion.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingsuggestion) {
        return res.status(500).json({message: "suggestion doens't exist!!"});
    }

    try {
        await existingsuggestion.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

const Updatesuggestion = async (req, res) => {

    const { message, useid } = req.body;
    const {id} = req.params;

    let existingsuggestion;

    try {
        existingsuggestion = await suggestion.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingsuggestion) {
        return res.status(500).json({message: "suggestion doens't exist!!"});
    }

    existingsuggestion.message = message;
    existingsuggestion.useid = useid;

    try {
        await existingsuggestion.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existingsuggestion});

}

const Ajout = async (req, res) => {

    const { message, userid } = req.body;

    const newsuggestion = new suggestion({
        message,
        userid,
    })

    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    try {
        await newsuggestion.save();
        existinguser.suggestions.push(newsuggestion);
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({messag: 'success', data: newsuggestion});
}




exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updatesuggestion = Updatesuggestion;
exports.Ajout = Ajout;
exports.Deletesuggestion = Deletesuggestion;

