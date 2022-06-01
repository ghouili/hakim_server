const user = require('../models/user');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reclamation.natilait@gmail.com', // generated ethereal user
      pass: 'natilait123', // generated ethereal password
    },
  });

const register = async (req, res) => {

    let avatar= 'avatar.png';
    if (req.file){
        avatar = req.file.filename;
    }
    const { nom, prenom, tel, email, poste } = req.body;
    console.log(req.body);
    const password = generator.generate({
        length: 10,
        numbers: true
    });

    let existinguser;

    try {
        existinguser = await user.findOne({email : email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (existinguser) {
        return res.status(200).json({success: false, message: "user already exist!!"});
    }

    const hashedpassword = await bcrypt.hash(password, 12);

    const newuser = new user({
        nom,
        prenom,
        tel,
        avatar,
        email, 
        poste,
        password: hashedpassword
    })

    try {
        await newuser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    var mailOptions = {
        from: 'reclamation.natilait@gmail.com',
        to: email,
        subject: ' BienVenue Chez Natilait Reclamations',
        text: ' BienVenue Chez Natilait Reclamations',

        html: `<h1 style="color: blue">Natilait</h1>
            <h3 style="color: black">Centre Reclamation :</h3>
            <b style="color: black">Bie,venue Mr(s) ${nom} ${prenom} vous eessayez de crieer un compte dans notre mobile app, pour acceder notre app merci d'utiliser<h3> votre email:</h3></b>
            <h3 style="color: #1155CC " ><u>${email}</u></h3>
            <h3 style="color: black"> Et Votre Mot de Passe est: </h3>
            <h3 style="color: #1155CC " >${password}</h3>`,
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      }); 

    return res.status(201).json({success: true, message: 'success', data: newuser});
}

const forgotten = async (req, res) => {

    const {email} = req.body;

    // console.log({email: email, pass: password});
    // console.log(req.body);
    let existinguser;

    try {
        existinguser = await user.findOne({email: email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const hashedpassword = await bcrypt.hash(password, 12);

    if (!existinguser) {
        return res.status(200).json({success: false, message: "user doens't exist!!"});
    }

    existinguser.password = hashedpassword;

    try {
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    var mailOptions = {
        from: 'reclamation.natilait@gmail.com',
        to: email,
        subject: ' BienVenue Chez Natilait Reclamations',
        text: ' BienVenue Chez Natilait Reclamations',

        html: `<h1 style="color: blue">Natilait</h1>
            <h3 style="color: black">Centre Reclamation :</h3>
            <b style="color: black">Bie,venue Mr(s) ${existinguser.nom} ${existinguser.prenom} vous eessayez de crieer un compte dans notre mobile app, pour acceder notre app merci d'utiliser<h3> votre email:</h3></b>
            <h3 style="color: #1155CC " ><u>${email}</u></h3>
            <h3 style="color: black"> Et Votre Nouveau Mot de Passe est: </h3>
            <h3 style="color: #1155CC " >${password}</h3>`,
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });

    return res.status(201).json({success: true, message: 'success', data: existinguser});
}

const login = async (req, res) => {

    const {email, password} = req.body;

    // console.log({email: email, pass: password});
    console.log(req.body);
    let existinguser;

    try {
        existinguser = await user.findOne({email: email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(200).json({success: false, message: "user doens't exist!!"});
    }

    const check = await bcrypt.compare( password, existinguser.password);

    if (!check) {
        return res.status(200).json({success: false, message: "Password is wrong"});
    }

    return res.status(201).json({success: true, message: 'success', data: existinguser});
}

const GetAll = async (req, res) => {

    let existinguser;
    try {
        existinguser = await user.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existinguser});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(200).json({success: false, message: "user doens't exist!!"});
    }

    return res.status(200).json({success: true, messag: 'success', data: existinguser});
}

const UpdateUser = async (req, res) => {

    const { nom, prenom, tel, email, poste } = req.body;
    console.log(req.body);
    if (req.file){
        const avatar = req.file.filename;
    }
    
    const {id} = req.params;

    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({success: false, message: "user doens't exist!!"});
    }

    if (req.body.password && req.body.currentPassword){
        const currentPassword = req.body.currentPassword;
        const check = await bcrypt.compare( currentPassword, existinguser.password);

        if (!check) {
            return res.status(500).json({success: false, message: "Current Password is wrong"});
        }
        const password = await bcrypt.hash(req.body.password, 12);
    }

    existinguser.nom = nom;
    existinguser.prenom = prenom;
    existinguser.tel = tel;
    existinguser.poste = poste;
    if(req.file) {
        existinguser.avatar = req.file.filename;
    }
    existinguser.email = email;
    if(req.body.password) {
        // const password = await bcrypt.hash(req.body.password, 12);
        existinguser.password = await bcrypt.hash(req.body.password, 12);
    }
    

    try {
        await existinguser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existinguser});

}

const Ajout = async (req, res) => {

    const { nom, prenom, tel, email, poste } = req.body;

    const newuser = new user({
        nom,
        prenom,
        tel,
        email, 
        password
    })

    try {
        await newuser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({messag: 'success', data: newuser});
}

const Deleteuser = async (req, res) => {
 
    const {id} = req.params;

    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({success: false, message: "user doens't exist!!"});
    }

    try {
        await existinguser.remove();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'deleted successfully'});

}

exports.GetAll = GetAll;
exports.FindById = FindById;
exports.UpdateUser = UpdateUser;
exports.Ajout = Ajout;
exports.Deleteuser = Deleteuser;
exports.register = register;
exports.login = login;
exports.forgotten = forgotten;

