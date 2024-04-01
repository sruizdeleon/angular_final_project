const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	phoneNumber: { type: String, required: false, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	favoriteFoods: [{ type: String, required: false }],
	followedInfluencers: [{ type: String, required: false }],
	role: { type: String, required: true },
	enabled: { type: Boolean, required: true },
	creatorId: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: false,
	},
	lastModifiedId: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: false,
	},
});

module.exports = mongoose.model("users", userSchema);
