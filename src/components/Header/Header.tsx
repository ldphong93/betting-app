import Logo from './Logo';
import Button from '../../common/Button/Button';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
	const { userDetail, setUserDetail } = useContext(AppContext);

	const navigate = useNavigate();
	const onClickLogOut = () => {
		localStorage.removeItem('userToken');
		// setUserDetail('');
		navigate('/login');
	};

	return (
		<h1
			className='d-flex justify-content-between'
			style={{ backgroundColor: 'whitesmoke' }}
		>
			<div style={{ padding: '20px 20px' }}>
				<Logo />
			</div>
			<div style={{ padding: '20px 20px' }}>
				<div className='d-flex justify-content-center'>
					<p style={{ marginRight: '15px' }}>{userDetail.username}</p>
					<Button
						buttonName='LOG OUT'
						className='default-button'
						onClick={onClickLogOut}
					/>
				</div>
			</div>
		</h1>
	);
};

export default Header;
