const express = require("express")
const router = express.Router()
const {login, signup, tokenRenewal, registerByAdmin, modifyUser, findAllUsers, deleteOneUser} = require("../controllers/user.controller")
const { isAuthenticated, isAdmin, petitionerCanChangeUser } = require("../middlewares/auth.middleware")

router.get("/", isAuthenticated, findAllUsers);
router.post("/signup", signup)
router.post("/login", login)
router.post("/token-renewal", tokenRenewal);
router.post("/register-by-admin", isAdmin, registerByAdmin)
router.patch("/:id", isAuthenticated, petitionerCanChangeUser, modifyUser);
router.patch("/admin/:id", isAdmin, modifyUser);
router.delete("/:id", isAdmin, deleteOneUser);

module.exports = router