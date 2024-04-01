const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Restaurant = require("../models/restaurant.model");
const Influencer = require("../models/influencer.model");
const User = require("../models/user.model");

async function isAuthenticated(req, res, next) {
	try {
		const token = req.query.token;
		if (!token) {
			return res.status(401).json({ msg: "Error: no estás autenticado" });
		} else {
			const tokenDecoded = jwt.verify(token, process.env.DB_PASSWORD);
			const petitionerUserId = tokenDecoded.userId;
			const foundPetitionerUser = await User.findById(petitionerUserId);
			if (!foundPetitionerUser) {
				return res.status(401).json({ msg: "Error: token no valido" });
			} else {
				req.body["petitionerUserId"] = new ObjectId(petitionerUserId);
				next();
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor." });
	}
}

async function isInfluencer(req, res, next) {
	const token = req.query.token;
	if (!token) {
		return res.status(401).json({ msg: "no estás autenticado" });
	} else {
		const tokenDecoded = jwt.verify(token, process.env.DB_PASSWORD);
		const petitionerUserId = tokenDecoded.userId;
		const foundPetitionerUser = await User.findById(petitionerUserId);
		if (!foundPetitionerUser) {
			return res.status(401).json({ msg: "token no valido" });
		} else {
			if (foundPetitionerUser.role !== "influencer") {
				return res.status(403).json({ msg: "no autorizado" });
			} else {
				req.body["petitionerUserId"] = new ObjectId(petitionerUserId);
				req.body["petitionerRole"] = foundPetitionerUser.role;
				next();
			}
		}
	}
}

async function isAdmin(req, res, next) {
	const token = req.query.token;
	if (!token) {
		return res.status(401).json({ msg: "no estás autenticado" });
	} else {
		const tokenDecoded = jwt.verify(token, process.env.DB_PASSWORD);
		const petitionerUserId = tokenDecoded.userId;
		const foundPetitionerUser = await User.findById(petitionerUserId);
		if (!foundPetitionerUser) {
			return res.status(401).json({ msg: "token no valido" });
		} else {
			if (foundPetitionerUser.role !== "admin") {
				return res.status(403).json({ msg: "no autorizado" });
			} else {
				req.body["petitionerUserId"] = new ObjectId(petitionerUserId);
				req.body["petitionerRole"] = foundPetitionerUser.role;
				next();
			}
		}
	}
}

async function petitionerCanChangeUser(req, res, next) {
	if (req.params.id === String(req.body.petitionerUserId)) {
		next();
	} else {
		return res.status(403).json({ msg: "Error: acceso no autorizado" });
	}
}

async function petitionerCanChangeInfluencer(req, res, next) {
	let actualInfluencer = undefined;
	try {
		actualInfluencer = await Influencer.findById(req.params.id);
	} catch (error) {
		return res.status(500).json({ msg: "Error: se ha producido un error interno en el servidor." });
	}
	if (!actualInfluencer) {
		return res.status(404).json({ msg: "Error: influencer no encontrado." });
	} else {
		if (actualInfluencer.userId.equals(req.body.petitionerUserId)) {
			console.log("Entro en son iguales", actualInfluencer.userId, "Petitioner", req.body.petitionerUserId);
			next();
		} else {
			return res.status(403).json({ msg: "Error: acceso no autorizado." });
		}
	}
}

async function petitionerCanChangeRestaurant(req, res, next) {
	let actualRestaurant = undefined;
	try {
		actualRestaurant = await Restaurant.findById(req.params.id);
	} catch (error) {
		return res.status(500).json({ msg: "Error: se ha producido un error interno en el servidor." });
	}
	if (!actualRestaurant) {
		return res.status(404).json({ msg: "Error: restaurante no encontrado." });
	} else {
		let actualInfluencer = undefined;
		try {
			actualInfluencer = await Influencer.findById(actualRestaurant.influencerId);
		} catch (error) {
			return res.status(500).json({ msg: "Error: se ha producido un error interno en el servidor." });
		}
		if (!actualInfluencer) {
			return res.status(404).json({ msg: "Error: influencer asociado al restaurante no encontrado." });
		} else {
			if (actualInfluencer.userId.equals(req.body.petitionerUserId)) {
				console.log("Restaurant", actualRestaurant.influencerId)
				console.log("Influencer", actualInfluencer.userId)
				console.log("Petitioner", req.body.petitionerUserId)
				next();
			} else {
				return res.status(403).json({ msg: "Error: acceso no autorizado." });
			}
		}
	}
}

module.exports = {
	isAuthenticated,
	isInfluencer,
	isAdmin,
	petitionerCanChangeUser,
	petitionerCanChangeInfluencer,
	petitionerCanChangeRestaurant,
};
