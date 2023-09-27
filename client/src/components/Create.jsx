import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
	});

	const navigate = useNavigate();

	function formChangeHandler(value) {
		return setForm((prevState) => {
			return { ...prevState, ...value };
		});
	}

	async function submitHandler(e) {
		e.preventDefault();

		const newPerson = { ...form };

		await fetch("http://localhost:3000/records", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPerson),
		}).catch((err) => {
			console.log(err);
			return;
		});

		setForm({ name: "", position: "", level: "" });
		navigate("/");
	}
	return (
		<div className=' w-3/12 border h-96 bg-white m-auto mt-20 p-10'>
			<h1 className=' text-2xl'>Create a New Person</h1>
			<form
				action=''
				method='POST'
			>
				<div>
					<label
						htmlFor='name'
						className='text-md text-yellow-400'
					>
						Name of the person:
					</label>
					<input
						type='text'
						id='name'
						className='border-b-2 p-1 border-radius'
						value={form.name}
						onChange={(e) => formChangeHandler({ name: e.target.value })}
					/>
				</div>
				<div>
					<label
						htmlFor='position'
						className='text-md text-yellow-400 mt-2'
					>
						Position of the person:
					</label>
					<input
						type='text'
						id='position'
						className='border-b-2 border-radius'
						value={form.position}
						onChange={(e) => formChangeHandler({ position: e.target.value })}
					/>
				</div>
				<div className='p-1'>
					<label htmlFor=''>
						<input
							type='radio'
							value='Intern'
							name='PositionOption1'
							id='positon-intern'
							checked={form.level === "Intern"}
							onChange={(e) => formChangeHandler({ level: e.target.value })}
						/>
						Intern
					</label>
					<label htmlFor=''>
						<input
							type='radio'
							value='Junior'
							name='PositionOption2'
							id='positon-junior'
							checked={form.level === "Junior"}
							onChange={(e) => formChangeHandler({ level: e.target.value })}
						/>
						Junior
					</label>
					<label htmlFor=''>
						<input
							type='radio'
							value='Senior'
							name='PositionOption3'
							id='positon-senior'
							checked={form.level === "Senior"}
							onChange={(e) => formChangeHandler({ level: e.target.value })}
						/>
						Senior
					</label>
				</div>
				<button
					onClick={submitHandler}
					className='border p-2 border-blue-600 bg-slate-500 text-white rounded-md mt-2'
				>
					Create Person
				</button>
			</form>
		</div>
	);
};

export default Create;
