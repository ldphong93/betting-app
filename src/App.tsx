import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'components/Login/Login';
import Matches from 'components/Matches/Matches';
import { fetchMatchesFromServer } from './service';
import MatchInfo from 'components/Matches/MatchInfo';
import Header from 'components/Header/Header';
import { EmptyUser } from 'common/DataType';
import MatchForm from 'components/Matches/MatchForm';

export const AppContext = createContext(null);

function App() {
	const [userDetail, setUserDetail] = useState(EmptyUser);
	const [allMatches, setAllMatches] = useState([]);

	useEffect(() => {
		const fetchmatches = fetchMatchesFromServer(setAllMatches);
		fetchmatches();
	}, []);

	useEffect(() => {
		setUserDetail(EmptyUser);
	}, []);

	return (
		<AppContext.Provider
			value={{ userDetail, setUserDetail, allMatches, setAllMatches }}
		>
			<Router>
				<Header />
				<div
					style={{
						backgroundColor: 'whitesmoke',
					}}
				>
					<Routes>
						<Route path='/main' element={<Matches />} />
						<Route path='/' element={<Login />} />
						<Route path='/login' element={<Login />} />
						<Route path='/match/add' element={<MatchForm />} />
						<Route path='/matches/:id' element={<MatchInfo />} />
					</Routes>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
