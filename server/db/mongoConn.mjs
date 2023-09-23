import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let collection;

async function connect() {
	try {
		await client.connect();
		console.log("Connected to MongoDB ATLAS server");

		const database = client.db("mernLearning");
		collection = database.collection("records");
	} catch (err) {
		console.error("Error connecting to MongoDB ATLAS server", err);
	}
}

export { connect, collection };
