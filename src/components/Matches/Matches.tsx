import SearchBar from '../SearchBar/SearchBar';
import Button from 'common/Button/Button';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyMatchList from '../EmptyMatchList/EmptyMatchList';
import MatchCard from '../MatchCard/MatchCard';
import { AppContext } from 'App';

const Matches: React.FC = () => {
	const navigate = useNavigate();
	const { allMatches, userDetail } = useContext(AppContext);
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

	return allMatches ? (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					paddingLeft: 'calc(1vw * 20)',
					paddingRight: 'calc(1vw * 20)',
				}}
			>
				<SearchBar onSearch={handleSearch} />
				<div
					className='d-flex justify-content-center'
					style={{ marginTop: '20px', marginBottom: '20px' }}
				>
					{userDetail.role === 'admin' && (
						<Button
							buttonName='ADD MATCH'
							className='default-button'
							onClick={handleAddNewMatchButton}
						/>
					)}
				</div>
			</div>
			{renderedMatches.length === 0 ? (
				<div
					className='d-flex justify-content-center'
					style={{ marginTop: '50px' }}
				>
					<p
						style={{
							fontSize: '50px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						No result
					</p>
				</div>
			) : (
				renderedMatches.map((match) => (
					<MatchCard
						key={match.id}
						id={match.id}
						title={match.title}
						matchDate={match.matchDate}
						creationDate={match.creationDate}
						description={match.description}
						betRatio={match.betRatio}
						createdBy={match.createdBy}
					/>
				))
			)}
		</div>
	) : (
		<EmptyMatchList />
	);
};

export default Matches;
