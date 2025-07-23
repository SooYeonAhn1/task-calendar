import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CalendarView from './components/CalendarView.jsx'
import DailyTasks from './components/DailyTasks.jsx'

const DEV_MODE = true; // change to false later

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/login" element={<Login/>} />
			<Route path="/register" element={<Register/>} />
			<Route
				path="/calendar"
				element={
					DEV_MODE ? <CalendarView /> : user ? <CalendarView /> : <Navigate to="/login" />
				}
			/>
			<Route path="/day/:date" element={<DailyTasks/>} />
		</Routes>
	);
}

export default App
