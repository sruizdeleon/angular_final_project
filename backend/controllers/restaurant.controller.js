const Restaurant = require("../models/restaurant.model");

async function findAllRestaurants(req, res) {
	try {
		const restaurants = await Restaurant.find();
		return res.json(restaurants);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al buscar los restaurantes." });
	}
}

async function findOneRestaurantById(req, res) {
	try {
		const restaurant = await Restaurant.findById(req.params.id);
		return res.json(restaurant);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al buscar el restaurante." });
	}
}

async function insertRestaurant(req, res) {
	try {
		console.log(req.body.role);
		let newRestaurant;
		if (req.body.petitionerRole === "influencer" || req.body.petitionerRole === "admin") {
			newRestaurant = new Restaurant({
				name: req.body.name,
				phoneNumber: req.body.phoneNumber,
				typesOfFood: req.body.typesOfFood,
				images: {
					frontPage: req.body.images.frontPage,
					miniature: req.body.images.miniature,
				},
				address: {
					street: req.body.address.street,
					postalCode: req.body.address.postalCode,
					population: req.body.address.population,
					province: req.body.address.province,
				},
				price: {
					minPrice: req.body.price.minPrice,
					maxPrice: req.body.price.maxPrice,
				},
				influencerScores: {
					foodTaste: req.body.influencerScores.foodTaste,
					decoration: req.body.influencerScores.decoration,
					service: req.body.influencerScores.service,
					priceQuality: req.body.influencerScores.priceQuality,
				},
				influencerId: req.body.petitionerUserId,
				creatorId: req.body.petitionerUserId,
				lastModifiedId: req.body.petitionerUserId,
			});
			if (req.body.petitionerRole === "admin") {
				newRestaurant["influencerId"] = req.body.influencerId;
			}
		};

		const newRestaurantSaved = await newRestaurant.save();
		return res.json({ msg: "Restaurante guardado con éxito.", data: newRestaurantSaved});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al crear el restaurante."});
	}
}

async function modifyRestaurant(req, res) {
	let changesToModify = new Object();
	let actualRestaurant = await Restaurant.findById(req.params.id);
	console.log(req.body)
	if (req.body.petitionerRole === "influencer" || req.body.petitionerRole === "admin") {
			changesToModify["lastModifiedId"] = req.body.petitionerUserId; // Last user in modify item

			req.body.name ?  changesToModify["name"] = req.body.name : false
			req.body.phoneNumber ?  changesToModify["phoneNumber"] = req.body.phoneNumber : false
			req.body.typesOfFood ?  changesToModify["typesOfFood"] = req.body.typesOfFood : false

			if (req.body.images) {
				let newImages = Object();
				if (actualRestaurant.images) {
					newImages = actualRestaurant.images;
					req.body.images.frontPage ? (newImages["frontPage"] = req.body.images.frontPage) : false;
					req.body.images.miniature ? (newImages["miniature"] = req.body.images.miniature) : false;
					changesToModify["images"] = newImages;
				} else {
					req.body.images.frontPage ? (newImages["frontPage"] = req.body.images.frontPage) : false;
					req.body.images.miniature ? (newImages["miniature"] = req.body.images.miniature) : false;
					changesToModify["images"] = newImages;
				}
			}

			if (req.body.address) {
				let newAddress = Object();
				if (actualRestaurant.address) {
					newAddress = actualRestaurant.address;
					req.body.address.street
						? (newAddress["street"] = req.body.address.street)
						: false;
					req.body.address.postalCode
						? (newAddress["postalCode"] = req.body.address.postalCode)
						: false;
					req.body.address.population
						? (newAddress["population"] = req.body.address.population)
						: false;
					req.body.address.province
						? (newAddress["province"] = req.body.address.province)
						: false;
					changesToModify["address"] = newAddress;
				} else {
					req.body.address.street
						? (newAddress["street"] = req.body.address.street)
						: false;
					req.body.address.postalCode
						? (newAddress["postalCode"] = req.body.address.postalCode)
						: false;
					req.body.address.population
						? (newAddress["population"] = req.body.address.population)
						: false;
					req.body.address.province
						? (newAddress["province"] = req.body.address.province)
						: false;
					changesToModify["address"] = newAddress;
				}
			}

			if(req.body.price) {
				let newPrice = Object();
				if(actualRestaurant.price) {
					newPrice = actualRestaurant.price;
					req.body.price.minPrice
						? newPrice["minPrice"] =  req.body.price.minPrice : false
					req.body.price.maxPrice
						? newPrice["maxPrice"] =  req.body.price.maxPrice : false
					changesToModify["price"] = newPrice;
				} else {
					req.body.price.minPrice
						? oldData["minPrice"] =  req.body.price.minPrice : false
					req.body.price.maxPrice
						? oldData["maxPrice"] =  req.body.price.maxPrice : false
					changesToModify["price"] = newPrice;
				}
			}

			if(req.body.influencerScores) {
				let newInfluencerScores = Object();
				if(actualRestaurant.influencerScores) {
					newInfluencerScores = actualRestaurant.influencerScores;
					req.body.influencerScores.foodTaste
						? newInfluencerScores["foodTaste"] =  req.body.influencerScores.foodTaste : false
					req.body.influencerScores.decoration
						? newInfluencerScores["decoration"] =  req.body.influencerScores.decoration : false
					req.body.influencerScores.service
						? newInfluencerScores["service"] =  req.body.influencerScores.service : false
					req.body.influencerScores.priceQuality
						? newInfluencerScores["priceQuality"] =  req.body.influencerScores.priceQuality : false
					changesToModify["influencerScores"] = newInfluencerScores;
				} else {
					req.body.influencerScores.foodTaste
						? newInfluencerScores["foodTaste"] =  req.body.influencerScores.foodTaste : false
					req.body.influencerScores.decoration
						? newInfluencerScores["decoration"] =  req.body.influencerScores.decoration : false
					req.body.influencerScores.service
						? newInfluencerScores["service"] =  req.body.influencerScores.service : false
					req.body.influencerScores.priceQuality
						? newInfluencerScores["priceQuality"] =  req.body.influencerScores.priceQuality : false
					changesToModify["influencerScores"] = newInfluencerScores;
				}
			}

		if (req.body.petitionerRole === "admin") {
			req.body.influencerId ? changesToModify["influencerId"] = req.body.influencerId : false;
		}
	};
	console.log(changesToModify);
	const lastModifierRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, changesToModify);
	console.log(lastModifierRestaurant)
	return res.json({ msg: "Restaurante modificado con éxito", data: lastModifierRestaurant });
}

async function modifyUsersScoresRestaurant(req, res) {
	let actualRestaurantScores = await Restaurant.findById(req.params.id);
	console.log("Restaurante encontrado", actualRestaurantScores);
	let usersScores;
	actualRestaurantScores.usersScores ? usersScores = actualRestaurantScores.usersScores : false;
	console.log("Estado inicial userScores", usersScores)
	if (usersScores && usersScores.scores && usersScores.scores.length > 0) {
		console.log("Entrando en ya hay scores");
		usersScores.scores.push({userId: req.body.petitionerUserId, userScore: req.body.usersScores.userScore})
		const reviews = usersScores.scores.length;
		let sum = 0;
		usersScores.scores.forEach((user) => {
			sum += user.userScore;
		})
		const average = sum / reviews;
		usersScores.average ? usersScores.average = average : usersScores["average"] = average
		usersScores.reviews ? usersScores.reviews = reviews : usersScores["reviews"] = reviews
		console.log("Entrando en ya hay scores: ", usersScores);
	} else {
		console.log("Entrando en no hay scores");
		usersScores = {
			average: req.body.usersScores.userScore,
			reviews: 1,
			scores: [{userId: req.body.petitionerUserId, userScore: req.body.usersScores.userScore}]
		}
		console.log("Entrando en no hay scores: ", usersScores);
	}
	actualRestaurantScores["usersScores"] = usersScores
	console.log("User scores a enviar para modificar:", actualRestaurantScores);
	const lastModifierRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, actualRestaurantScores);
	return res.json({ msg: "Valoración del restaurante registrada con éxito", data: lastModifierRestaurant });
}

async function deleteOneRestaurant(req, res) {
	try {
		await Restaurant.findByIdAndDelete(req.params.id);
		return res.json({ msg: "Restaurante eliminado con éxito." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error: interno del servidor al eliminar el restaurante." });
	}
}

module.exports = {
	findAllRestaurants,
	findOneRestaurantById,
	insertRestaurant,
	modifyRestaurant,
	modifyUsersScoresRestaurant,
	deleteOneRestaurant,
}