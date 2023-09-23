import express from "express";
import { ObjectId } from "mongodb";
import { collection } from "../db/mongoConn.mjs";

const router = express.Router();

// Getting List of all records

router.get("/", async (req, res) => {
	let results = await collection.find({}).toArray();
	res.send(results).status(200);
});

// Getting a single record by ID

router.get("/:id", async (req, res) => {
	const recordId = req.params.id;
	const record = await collection.findOne({ _id: new ObjectId(recordId) });
	if (!record) {
		res.send("Not Found").status(404);
	} else {
		res.send(record).status(200);
	}
});

// Creating a new record

router.post("/", async (req, res) => {
	try {
		let newRecord = {
			name: req.body.name,
			position: req.body.position,
			level: req.body.level,
		};
		const result = await collection.insertOne(newRecord);
		res.send(result).status(200);
	} catch (err) {
		console.error(err);
		res.send(err).status(500);
	}
});

// Updating a record by ID

router.patch("/:id", async (req, res) => {
	try {
		const recordId = req.params.id;
		const updatedData = {
			$set: {
				name: req.body.name,
				position: req.body.position,
				level: req.body.level,
			},
		};

		const result = await collection.updateOne(
			{ _id: new ObjectId(recordId) },
			updatedData
		);
		res.send(result).status(200);
	} catch (err) {
		console.log(err);
		res.send(err).status(500);
	}
});

// Delete a record by its ID

router.delete("/:id", (req, res) => {
	try {
		const recordId = req.params.id;

		const result = collection.deleteOne({ _id: new ObjectId(recordId) });
		res.send(result).status(200);
	} catch (err) {
		console.error(err);
	}
});

export default router;
