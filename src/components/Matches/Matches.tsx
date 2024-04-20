import SearchBar from '../SearchBar/SearchBar';
import Button from 'common/Button/Button';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyMatchList from '../EmptyMatchList/EmptyMatchList';
import MatchCard from '../MatchCard/MatchCard';
import { AppContext } from 'App';

const Matches: React.FC = () => {
	const navigate = useNavigate();
	const { allMatches } = useContext(AppContext);
	const [searchTerm, setSearchTerm] = useState('');

	const handleAddNewMatchButton = () => {
		navigate('/match/add');
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const renderedMatches = allMatches.filter((match) =>
		match.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const areMatchesAvailable = renderedMatches.length > 0;

	return areMatchesAvailable ? (
		<div>
			<div
				className='d-flex justify-content-between'
				style={{ width: '60rem', margin: '0 auto' }}
			>
				<SearchBar onSearch={handleSearch} />
				<div
					className='d-flex justify-content-center'
					style={{ marginTop: '20px', marginBottom: '20px' }}
				>
					<Button
						buttonName='ADD NEW COURSE'
						className='default-button'
						onClick={handleAddNewMatchButton}
					/>
				</div>
			</div>
			{renderedMatches.length === 0 ? (
				<div
					className='d-flex justify-content-center'
					style={{ marginTop: '50px' }}
				>
					<p style={{ fontSize: '50px' }}>No result</p>
				</div>
			) : (
				renderedMatches.map((match) => (
					<MatchCard
						key={match.id}
						id={match.id}
						title={match.title}
						creationDate={match.creationDate}
						description={match.description}
					/>
				))
			)}
		</div>
	) : (
		<EmptyMatchList />
	);
};

export default Matches;
