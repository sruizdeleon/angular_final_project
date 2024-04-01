const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	typesOfFood: [{ type: String, required: true }],
	images: {
		frontPage: { type: String, required: true },
		miniature: { type: String, required: true },
	},
	address: {
		street: { type: String, required: true },
		postalCode: { type: Number, required: true },
		population: { type: String, required: true },
		province: { type: String, required: true },
	},
	price: {
		minPrice: { type: Number, required: true },
		maxPrice: { type: Number, required: true },
	},
	influencerScores: {
		foodTaste: { type: Number, required: true },
		decoration: { type: Number, required: true },
		service: { type: Number, required: true },
		priceQuality: { type: Number, required: true },
	},
	usersScores: {
		average: { type: Number, required: false },
		reviews: { type: Number, required: false },
		scores: [
			{
				userId: { type: String, required: false },
				userScore: { type: Number, required: false },
			},
		],
	},
	influencerId: {
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

module.exports = mongoose.model("restaurants", restaurantSchema);
