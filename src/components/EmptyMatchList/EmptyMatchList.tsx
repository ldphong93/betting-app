import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AppContext } from 'App';

export interface UserInterface {
	username: string;
	role: string;
	token: string;
}
const EmptyMatchList: React.FC = () => {
	const navigator = useNavigate();
	const handleOnClick = () => {
		navigator('/matches/add');
	};
	const { userDetail } = useContext(AppContext);

	return (
		<div className='container'>
			<h1 className='heading1'>Your List Is Empty</h1>
			{userDetail.role === 'admin' ? (
				<>
					<p>Please use "Add New Match" button to add your first match</p>
					<Button
						onClick={handleOnClick}
						buttonName='ADD NEW MATCH'
						className='button'
					/>
				</>
			) : (
				<p>
					You don't have permissions to create a match. Please log in as ADMIN
				</p>
			)}
		</div>
	);
};

export default EmptyMatchList;
