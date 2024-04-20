import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useCallback } from 'react';
import { AppContext } from '../../App';

interface MatchCardProp {
	id: string;
	title: string;
	description: string;
	creationDate: string;
}
const MatchCard: React.FC<MatchCardProp> = (props) => {
	const navigate = useNavigate();
	const { userDetail } = useContext(AppContext);

	const handleClickShow = useCallback(() => {
		navigate(`/matches/${props.id}`);
	}, [props.id, navigate]);

	// const handleClickDelete = () => {
	// 	dispatch(deleteMatchThunk({ id: props.id, token: user.token }));

	// 	navigate('/');
	// };
	// const handleClickUpdate = () => {
	// 	navigate(`/matches/update/${props.id}`);
	// };

	return (
		<div
			className='d-flex justify-content-center'
			style={{ marginTop: '20px' }}
		>
			<div className='card border border-dark p-3' style={{ width: '60rem' }}>
				<h2>{props.title}</h2>
				<div className='row'>
					<div className='col-7'>
						<p>{props.description}</p>
					</div>
					<div className='col-5'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>
								{/* <div>
									<span style={{ fontWeight: 'bold' }}>Authors: </span>
									<span>
										{props.authors
											.map(
												(id) =>
													authorDetail.filter((author) => author.id === id)[0]
														.name
											)
											.join(', ')}
									</span>
								</div> */}

								{/* <div>
									<span style={{ fontWeight: 'bold' }}>Duration: </span>
									<span>{convertedDuration}</span>
								</div> */}

								<div>
									<span style={{ fontWeight: 'bold' }}>Created: </span>
									<span>{props.creationDate}</span>
								</div>
							</div>
						</div>
						<div
							className='d-flex justify-content-between'
							style={{ height: '30px', marginTop: '10px' }}
						>
							<Button
								onClick={handleClickShow}
								buttonName='SHOW COURSE'
								className='default-button'
							/>
							{/* <Button
								onClick={handleClickDelete}
								buttonName='DELETE'
								className='default-button'
							/>
							<Button
								onClick={handleClickUpdate}
								buttonName='UPDATE'
								className='default-button'
							/> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MatchCard;
