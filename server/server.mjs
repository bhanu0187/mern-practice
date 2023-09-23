import express from "express";
import cors from "cors";

import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import { connect } from "./db/mongoConn.mjs";

const PORT = process.env.PORT || 8080;
const app = express();

// Enable CORS for all incoming requests
app.use(cors());
app.use(express.json());

app.use("/records", records);

// Connect to MongoDB ATLAS and start the server
connect()
	.then(() => {
		app.listen(3000, () => {
			console.log("Server is running on port 3000");
		});
	})
	.catch((err) => {
		console.error("Error connecting to the database:", err);
	});
