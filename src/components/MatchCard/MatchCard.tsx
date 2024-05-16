import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';

interface MatchCardProp {
	id: string;
	title: string;
	matchDate: string;
	creationDate: string;
	description: string;
	betRatio: string;
	createdBy: string;
}
const MatchCard: React.FC<MatchCardProp> = (props) => {
	const navigate = useNavigate();
	const handleClickShow = useCallback(() => {
		navigate(`/matches/${props.id}`);
	}, [props.id, navigate]);

	return (
		<div
			style={{
				border: '1px solid gray',
				borderRadius: '4px',
				padding: '10px',
				marginBottom: '10px',
				marginLeft: 'calc(1vw * 20)',
				marginRight: 'calc(1vw * 20)',
			}}
		>
			<h2
				style={{
					marginLeft: '10px',
					marginTop: '1px',
				}}
			>
				{props.title}
			</h2>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginLeft: '10px',
					marginRight: '10px',
					// margin: '5px 0',
				}}
			>
				<div style={{ flex: 1 }}>
					<p>{props.description}</p>
				</div>
				<div style={{ marginTop: '15px' }}>
					<div>
						<span style={{ fontWeight: 'bold' }}>Match Date: </span>
						<span>{props.matchDate}</span>
					</div>
					<div>
						<span style={{ fontWeight: 'bold' }}>Created By: </span>
						<span>{props.createdBy}</span>
					</div>
					<Button
						onClick={handleClickShow}
						buttonName='MORE INFO'
						className='default-button'
					/>
				</div>
			</div>
		</div>
	);
};

export default MatchCard;
