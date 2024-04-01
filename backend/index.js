const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurant.routes")
const influencerRoutes = require("./routes/influencer.routes")


const app = express()

app.use(cors())

app.use(express.json())


mongoose
	.connect(process.env.DB_USER)
	.then(() => {
		console.log(`Conexion con base de datos exitosa`);
	})
	.catch((err) => {
		console.log(`Error al conectar con la base de datos: ${err}`);
	});

app.use("/api/users",userRoutes)
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/influencers", influencerRoutes);

app.listen(process.env.PORT, () => {
	console.log(`API funcionado... en puerto 3000`);
});