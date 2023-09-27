import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Record = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [recordData, setRecordData] = useState({
		name: "",
		position: "",
		level: "",
	});

	useEffect(() => {
		async function fetchRecordData() {
			const recordId = params.id;

			const response = await fetch(`http://localhost:3000/records/${recordId}`);

			const result = await response.json();
			console.log(result);
			setRecordData(result);
		}

		fetchRecordData();
		return;
	}, [params.id]);

	async function deletehandler() {
		await fetch(`http://localhost:3000/records/${params.id}`, {
			method: "DELETE",
		});
		navigate("/record-list");
	}

	return (
		<div>
			<h1>{recordData.name}</h1>
			<h3>{recordData.position}</h3>
			<p>{recordData.level}</p>
			<button onClick={() => navigate(`/update/${params.id}`)}>Update</button>
			<button onClick={deletehandler}>Delete</button>
		</div>
	);
};

export default Record;
