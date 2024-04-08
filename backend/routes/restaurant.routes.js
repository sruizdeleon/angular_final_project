const express = require("express");
const router = express.Router();
const {
	findAllRestaurants,
	findOneRestaurantById,
	insertRestaurant,
	modifyRestaurant,
	modifyUsersScoresRestaurant,
    deleteOneRestaurant,
} = require("../controllers/restaurant.controller");
const { isAuthenticated, isInfluencer, isAdmin, petitionerCanChangeRestaurant } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, findAllRestaurants);
router.get("/:id", isAuthenticated, findOneRestaurantById);
router.post("/", isInfluencer, insertRestaurant);
router.post("/admin", isAdmin, insertRestaurant);
router.patch("/reviews/:id", isAuthenticated, modifyUsersScoresRestaurant);
router.patch("/:id", isInfluencer, petitionerCanChangeRestaurant, modifyRestaurant);
router.patch("/admin/:id", isAdmin, modifyRestaurant);
router.delete("/:id", isInfluencer, petitionerCanChangeRestaurant, deleteOneRestaurant);
router.delete("/admin/:id", isAdmin, deleteOneRestaurant);

// Faltaria que sólo el user asociado al  influencer y asociado al restaruante pudiera modificar y borrar.
// El admin necesita otra ruta para que sólo él pudiera eliminar cualquier restaurante

module.exports = router;
