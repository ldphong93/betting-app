import { AppContext } from 'App';
import Button from '../../common/Button/Button';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMatchToServer } from 'service';
import {
	MatchType,
	MatchCreationRequest,
	MatchCreationResponse,
} from 'common/DataType';

const MatchForm: React.FC = () => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputMatchDate, setInputMatchDate] = useState('');
	const { userDetail, allMatches, setAllMatches } = useContext(AppContext);
	const [message, setMessage] = useState('');

	const handleInputTitleChange = (input: string) => {
		setInputTitle(input);
	};

	const handleInputDescriptionChange = (input: string) => {
		setInputDescription(input);
	};

	const handleInputMatchDateChange = (input: string) => {
		setInputMatchDate(input);
	};

	const handleSubmit = async () => {
		const request: MatchCreationRequest = {
			title: inputTitle,
			description: inputDescription,
			matchDate: inputMatchDate,
			createdBy: userDetail.username,
		};

		const response: MatchCreationResponse = await createMatchToServer(request);
		setMessage(response.message);

		if (response.successful) {
			const newlyCreatedMatch: MatchType = response.match;
			setAllMatches([...allMatches, newlyCreatedMatch]);
		}

		console.log(response.message);
	};

	const navigate = useNavigate();
	const handleBack = () => {
		navigate('/main');
	};

	return (
		<div
			style={{
				border: '1px solid gray',
				borderRadius: '4px',
				padding: '10px',
				marginBottom: '10px',
				marginTop: '1px',
				marginLeft: 'calc(1vw * 30)',
				marginRight: 'calc(1vw * 30)',
			}}
		>
			<div>
				<h3>Match Creation</h3>
				<div style={{ display: 'flex', marginBottom: '10px' }}>
					<span style={{ width: '150px' }}>Title: </span>
					<input
						type='text'
						value={inputTitle}
						onChange={(event) => handleInputTitleChange(event.target.value)}
					></input>
				</div>
				<div style={{ display: 'flex', marginBottom: '10px' }}>
					<span style={{ width: '150px' }}>Description: </span>
					<input
						type='text'
						value={inputDescription}
						onChange={(event) =>
							handleInputDescriptionChange(event.target.value)
						}
					></input>
				</div>
				<div style={{ display: 'flex', marginBottom: '10px' }}>
					<span style={{ width: '150px' }}>Match Date: </span>
					<input
						type='date'
						value={inputMatchDate}
						onChange={(event) => handleInputMatchDateChange(event.target.value)}
					></input>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '20px',
					}}
				>
					<Button
						onClick={handleSubmit}
						buttonName='Submit'
						className='default-button'
					/>
					<Button
						onClick={handleBack}
						buttonName='Close'
						className='default-button'
					/>
				</div>
				{message && (
					<div
						style={{
							color: 'red',
							marginTop: '10px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{message}
					</div>
				)}
			</div>
		</div>
	);
};

export default MatchForm;
