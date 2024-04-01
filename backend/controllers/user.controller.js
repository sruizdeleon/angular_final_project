const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

async function findAllUsers(req, res) {
	try {
		const users = await User.find();
		return res.json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al buscar los usuarios." });
	}
}

async function deleteOneUser(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id);
		return res.json({ msg: "Usuario eliminado con éxito." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al eliminar el usuario." });
	}
}

async function login(req,res){
    try {
        const foundUser = await User.findOne({email: req.body.email})
        if(!foundUser){
            return res.status(400).json({msg: "Error: el usuario no existe o las credenciales no son válidas."})
        }
        else{
            const resultCompare = await bcrypt.compare(req.body.password, foundUser.password)
            if(!resultCompare){
                return res.status(400).json({msg: "Error: el usuario no existe o las credenciales no son válidas."})
            }
            else{
                const token = jwt.sign({ userId: foundUser._id }, process.env.DB_PASSWORD, { expiresIn: "1h" });
                return res.status(200).json({msg: "ok", token: token})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Error: interno del servidor."})
    }
}

// registro
async function signup(req,res){
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = new User(
            {
                name: req.body.name,
                surname: req.body.surname,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hash,
                favoriteFoods: req.body.favoriteFoods,
                followedInfluencers: req.body.followedInfluencers,
                role: 'user',
                enabled: true,
            })
        const newUserSaved = await newUser.save();
        newUserSaved["creatorId"] = newUserSaved._id;
        newUserSaved["lastModifiedId"] = newUserSaved._id;
        await User.findByIdAndUpdate(newUserSaved._id, newUserSaved);
        return res.json({msg: "Registro realizado con éxito"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error: interno del servidor." });
    }
}

// registro por un Admin
async function registerByAdmin(req,res){
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
			name: req.body.name,
			surname: req.body.surname,
			phoneNumber: req.body.phoneNumber,
			email: req.body.email,
			password: hash,
			favoriteFoods: req.body.favoriteFoods,
			followedInfluencers: req.body.followedInfluencers,
			role: req.body.role,
			enabled: req.body.enabled,
			creatorId: req.body.petitionerUserId,
            lastModifiedId: req.body.petitionerUserId
		});
        await newUser.save();
        return res.json({msg: "Registro realizado con éxito"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error: interno del servidor." });
    }
}

async function modifyUser(req, res) {
    let changesToModify = new Object();
        req.body.name ? changesToModify["name"] = req.body.name : false
        req.body.surname ? changesToModify["surname"] = req.body.surname : false
        req.body.phoneNumber ? changesToModify["phoneNumber"] = req.body.phoneNumber : false
        req.body.email ? changesToModify["email"] = req.body.email : false
        req.body.favoriteFoods ? changesToModify["favoriteFoods"] = req.body.favoriteFoods : false
        req.body.followedInfluencers ? changesToModify["followedInfluencers"] = req.body.followedInfluencers : false

        changesToModify["lastModifiedId"] = req.body.petitionerUserId

    if (req.body.petitionerRole === "admin") {
        req.body.role ? changesToModify["role"] = req.body.role : false
        req.body.enabled ? changesToModify["enabled"] = req.body.enabled : false
    }
    const lastModifierUser = await User.findByIdAndUpdate(req.params.id, changesToModify);
    return res.json({ msg: "Usuario modificado con éxito", data: lastModifierUser });
}

module.exports = {
	findAllUsers,
	modifyUser,
	deleteOneUser,
	login,
	signup,
	registerByAdmin,
};