const mongoose = require("mongoose")

const influencerSchema = new mongoose.Schema({
	nickName: { type: String, required: true, unique: true },
	accountIG: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	subscribers: { type: Number, required: true },
	images: {
		logo: { type: String, required: true },
		miniature: { type: String, required: true },
		frontPage: { type: String, required: true },
	},
	userId: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true,
	},
	creatorId: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true,
	},
	lastModifiedId: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: false,
	},
});

module.exports = mongoose.model("influencers", influencerSchema)
