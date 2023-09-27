import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordList = () => {
	const [recordsList, setRecordsList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("http://localhost:3000/records");

			const records = await response.json();
			console.log(records[0]._id);

			setRecordsList(records);
		}
		fetchData();
		return;
	}, []);

	return (
		<div>
			{recordsList.map((record) => (
				<div
					key={record._id}
					className='p-1 flex cursor-pointer'
					onClick={() => navigate(`/record/${record._id}`)}
				>
					<h1>{record.name}</h1>
					<h3>{record.position}</h3>
					<p>{record.level}</p>
				</div>
			))}
			<button onClick={() => navigate("/create")}>Create record</button>
		</div>
	);
};

export default RecordList;
