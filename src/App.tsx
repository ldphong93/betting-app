import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'components/Login/Login';
import Matches from 'components/Matches/Matches';

export const AppContext = createContext(null);

function App() {
	const [userDetail, setUserDetail] = useState(null);
	const [allMatches, setAllMatches] = useState([]);

	useEffect(() => {
		//mock initial data
		setAllMatches([
			{
				id: 1,
				title: 'arsenal-mancity',
				creationDate: '01/01/2024',
				description: 'Super Sunday',
			},
			{
				id: 2,
				title: 'manu-liverpool',
				creationDate: '05/01/2024',
				description: 'Super Derby',
			},
		]);
	}, []); // Empty

	// useEffect(() => {
	// 	// Define this as an async function
	// 	const fetchMatches = async () => {
	// 		try {
	// 			const response = await fetch('http://your-api-url.com/matches');
	// 			const data = await response.json();

	// 			setAllMatches(data);
	// 		} catch (error) {
	// 			console.error('Error fetching matches: ', error);
	// 		}
	// 	};

	// 	// Call the function
	// 	fetchMatches();
	// }, []); // Empty dependency array means this effect runs once on mount

	return (
		<AppContext.Provider
			value={{ userDetail, setUserDetail, allMatches, setAllMatches }}
		>
			<Router>
				<Routes>
					<Route path='/' element={<Matches />} />
					<Route path='/login' element={<Login />} />
					{/* <Route path='/matches/:id' element={<MatchInfo />} /> */}
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
