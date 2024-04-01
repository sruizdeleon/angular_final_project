const Influencer = require("../models/influencer.model");

async function findAllInfluencers(req, res) {
	try {
		const influencers = await Influencer.find();
		return res.json(influencers);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al buscar los influencers." });
	}
}

async function insertInfluencer(req, res) {
	try {
		let newInfluencer;
		if (req.body.petitionerRole === "influencer" || req.body.petitionerRole === "admin") {
			newInfluencer = new Influencer({
				nickName: req.body.nickName,
				accountIG: req.body.accountIG,
				description: req.body.description,
				subscribers: req.body.subscribers,
				images: {
					logo: req.body.images.logo,
					miniature: req.body.images.miniature,
					frontPage: req.body.images.frontPage,
				},
				userId: req.body.petitionerUserId,
				creatorId: req.body.petitionerUserId,
				lastModifiedId: req.body.petitionerUserId,
			});
			if (req.body.petitionerRole === "admin") {
				newInfluencer["userId"] = req.body.userId;
				// atributo que sólo puede enviar el admin con id de usuario.
			};
		}
		await newInfluencer.save();
		return res.json({ msg: "Influencer guardado con éxito." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al crear el influencer." });
	}
}

async function modifyInfluencer(req, res) {
	let changesToModify = new Object();
	let actualInfluencer = await Influencer.findById(req.params.id);

	if (req.body.petitionerRole === "influencer" || req.body.petitionerRole === "admin") {
		changesToModify["lastModifiedId"] = req.body.petitionerUserId; // Last user in modify item

		req.body.nickName ? changesToModify["nickName"] = req.body.nickName : false;
		req.body.accountIG ? changesToModify["accountIG"] = req.body.accountIG : false;
		req.body.description ? changesToModify["description"] = req.body.description : false;
		req.body.subscribers ? changesToModify["subscribers"] = req.body.subscribers : false;

		if (req.body.images) {
			let newImages = Object();
			if (actualInfluencer.images) {
				newImages = actualInfluencer.images;
				req.body.images.frontPage ? (newImages["frontPage"] = req.body.images.frontPage) : false;
				req.body.images.miniature ? (newImages["miniature"] = req.body.images.miniature) : false;
				req.body.images.logo ? (newImages["logo"] = req.body.images.logo) : false;
				changesToModify["images"] = newImages;
			} else {
				req.body.images.frontPage ? (newImages["frontPage"] = req.body.images.frontPage) : false;
				req.body.images.frontPage ? (newImages["frontPage"] = req.body.images.frontPage) : false;
				req.body.images.logo ? (newImages["logo"] = req.body.images.logo) : false;
				changesToModify["images"] = newImages;
			}
		}

		if (req.body.petitionerRole === "admin") {
			req.body.userId ? (changesToModify["userId"] = req.body.userId) : false;
		}
	}
	console.log(changesToModify);
	const lastModifierInfluencer = await Influencer.findByIdAndUpdate(req.params.id, changesToModify);
	return res.json({ msg: "Influencer modificado con éxito", data: lastModifierInfluencer });
}

async function deleteOneInfluencer(req, res) {
	try {
		await Influencer.findByIdAndDelete(req.params.id);
		return res.json({ msg: "Influencer eliminado con éxito." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al eliminar el influencer." });
	}
}

module.exports = {
	findAllInfluencers,
	insertInfluencer,
	modifyInfluencer,
	deleteOneInfluencer,
};
