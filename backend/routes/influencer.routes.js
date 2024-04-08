const express = require("express");
const router = express.Router();
const { findAllInfluencers, findOneInfluencerById, insertInfluencer, modifyInfluencer, deleteOneInfluencer } = require("../controllers/influencer.controller");
const { isAuthenticated, isInfluencer, isAdmin, petitionerCanChangeInfluencer } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, findAllInfluencers);
router.get("/:id", isAuthenticated, findOneInfluencerById);
router.post("/", isInfluencer, insertInfluencer);
router.post("/admin", isAdmin, insertInfluencer);
router.patch("/:id", isInfluencer, petitionerCanChangeInfluencer, modifyInfluencer);
router.patch("/admin/:id", isAdmin, modifyInfluencer);
router.delete("/:id", isInfluencer, petitionerCanChangeInfluencer, deleteOneInfluencer);
router.delete("/admin/:id", isAdmin, deleteOneInfluencer);

// Faltaria que sólo el user asociado al  influencer pudiera modificar y borrar un influencer.
// El admin necesita otra ruta para que sólo él pudiera eliminar cualquier influencer.

module.exports = router;
