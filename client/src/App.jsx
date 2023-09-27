import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Record from "./components/Record";
import RecordList from "./components/RecordList";

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<RecordList />}
			/>
			<Route
				path='/create'
				element={<Create />}
			/>
			<Route
				path='/update/:id'
				element={<Edit />}
			/>
			<Route
				path='/record/:id'
				element={<Record />}
			/>
		</Routes>
	);
}

export default App;
