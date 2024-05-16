import { AppContext } from 'App';
import Button from '../../common/Button/Button';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { betToServer, finalizeMatchToServer } from 'service';
import { BetRequest, FinalizeMatchRequest, MatchType } from 'common/DataType';

type ResponseJson = {
	successful: boolean;
	message: string;
	balance: number;
};

const MatchInfo: React.FC = () => {
	const { id } = useParams();
	const numericId = +id;
	const { allMatches, userDetail, setUserDetail } = useContext(AppContext);
	const matchContent: MatchType | undefined = allMatches.find(
		(match: MatchType) => match.id === numericId
	);

	const navigate = useNavigate();
	const handleClickBack = () => {
		navigate('/main');
	};
	//BETTING
	const [showBetPopup, setShowBetPopup] = useState(false);
	const [selectedBetResult, setSelectedBetResult] = useState('');
	const [inputAmount, setInputAmount] = useState(0);
	const [message, setMessage] = useState('');

	const handleOpenBet = () => {
		setShowBetPopup(true);
	};
	const handleCloseBet = () => {
		setShowBetPopup(false);
	};
	const handleBetResultChange = (optionValue: string) => {
		setSelectedBetResult(optionValue);
	};
	const handleInputAmountChange = (amount: number) => {
		setInputAmount(amount);
	};

	const handleSubmitBet = async () => {
		const betRequest: BetRequest = {
			matchId: id,
			userId: userDetail.id,
			result: selectedBetResult,
			amount: inputAmount,
		};
		const response: ResponseJson = await betToServer(betRequest);
		setMessage(response.message);

		if (response.successful) {
			setUserDetail({
				id: userDetail.id,
				username: userDetail.username,
				role: userDetail.role,
				token: userDetail.token,
				balance: response.balance,
			});
		}

		console.log(response.message);
	};

	//FINALIZING
	const [showFinalizePopup, setShowFinalizePopup] = useState(false);
	const [matchResult, setMatchResult] = useState('');

	const handleOpenFinalize = () => {
		setShowFinalizePopup(true);
	};
	const handleCloseFinalize = () => {
		setShowFinalizePopup(false);
	};
	const handleMatchResultChange = (optionValue: string) => {
		setMatchResult(optionValue);
	};

	const finalizeMatchRequest: FinalizeMatchRequest = {
		matchId: id,
		result: matchResult,
	};
	const handleSubmitFinalize = async () => {
		const status = await finalizeMatchToServer(finalizeMatchRequest);
		setMessage(status);
		console.log(status);
	};

	return (
		<div
			style={{
				border: '1px solid gray',
				borderRadius: '4px',
				padding: '10px',
				marginBottom: '10px',
				marginTop: '1px',
				marginLeft: 'calc(1vw * 20)',
				marginRight: 'calc(1vw * 20)',
			}}
		>
			<div style={{ marginTop: '10px' }}>
				<div>
					<div>
						<h2 style={{ fontWeight: 'bold' }}>{matchContent.title}</h2>
					</div>
					<div>
						<span>{matchContent.description}</span>
					</div>
					<div>
						<span style={{ fontWeight: 'bold' }}>Match ID: </span>
						<span>{matchContent.id}</span>
					</div>
					<div>
						<span style={{ fontWeight: 'bold' }}>Match Date: </span>
						<span>{matchContent.matchDate}</span>
					</div>
					<div>
						<span style={{ fontWeight: 'bold' }}>Creation Date: </span>
						<span>{matchContent.creationDate}</span>
					</div>
					<div>
						<span style={{ fontWeight: 'bold' }}>Created By: </span>
						<span>{matchContent.createdBy}</span>
					</div>
				</div>
			</div>
			<div
				style={{ height: '30px', marginTop: '10px', justifyContent: 'center' }}
			>
				<Button
					onClick={handleClickBack}
					buttonName='BACK'
					className='default-button'
				/>
				{userDetail.role === 'bettor' && (
					<Button
						onClick={handleOpenBet}
						buttonName='BET'
						className='default-button'
					/>
				)}
				{userDetail.role === 'admin' && (
					<Button
						onClick={handleOpenFinalize}
						buttonName='FINALIZE'
						className='default-button'
					/>
				)}
			</div>
			{showBetPopup && (
				<div className='popup'>
					<div className='popup-content'>
						<h3>Place Your Bet</h3>
						<div>
							<label>
								<span>Match Prediction: </span>
								<select
									value={selectedBetResult}
									onChange={(event) =>
										handleBetResultChange(event.target.value)
									}
								>
									<option value=''>Select result</option>
									<option value='HOME_WIN'>Home Win</option>
									<option value='DRAW'>Draw</option>
									<option value='AWAY_WIN'>Away Win</option>
								</select>
							</label>
						</div>
						<div style={{ marginTop: '5px', marginBottom: '5px' }}>
							<label>
								<span>Amount:</span>
								<input
									type='number'
									value={inputAmount}
									onChange={(event) =>
										handleInputAmountChange(parseInt(event.target.value, 10))
									}
								/>
							</label>
						</div>
						<Button
							onClick={handleSubmitBet}
							buttonName='SUBMIT'
							className='default-button'
						/>
						<Button
							onClick={handleCloseBet}
							buttonName='CLOSE'
							className='default-button'
						/>
					</div>
				</div>
			)}
			{showFinalizePopup && (
				<div>
					<h3>Finalize Match Result</h3>
					<div style={{ marginBottom: '10px' }}>
						<label>
							<span>Match Result: </span>
							<select
								value={matchResult}
								onChange={(event) =>
									handleMatchResultChange(event.target.value)
								}
							>
								<option value=''>Select result</option>
								<option value='HOME_WIN'>Home Win</option>
								<option value='DRAW'>Draw</option>
								<option value='AWAY_WIN'>Away Win</option>
							</select>
						</label>
					</div>
					<Button
						onClick={handleSubmitFinalize}
						buttonName='SUBMIT'
						className='default-button'
					/>
					<Button
						onClick={handleCloseFinalize}
						buttonName='CLOSE'
						className='default-button'
					/>
				</div>
			)}
			{message && (
				<div style={{ marginTop: '10px', color: 'red' }}>{message}</div>
			)}
		</div>
	);
};

export default MatchInfo;
