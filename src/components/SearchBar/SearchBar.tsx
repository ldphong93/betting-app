import React, { useState } from 'react';
import Button from 'common/Button/Button';

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onSearch(searchTerm);
		}
	};

	return (
		<div
			className='d-flex justify-content-center'
			style={{ marginTop: '20px' }}
		>
			<label htmlFor='search-term'>
				<input
					type='text'
					id='search-term'
					placeholder='Input text'
					value={searchTerm}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					style={{ marginLeft: '5px' }}
				/>
			</label>
			<Button
				onClick={() => onSearch(searchTerm)}
				buttonName='SEARCH'
				className='default-button'
			/>
		</div>
	);
};

export default SearchBar;
