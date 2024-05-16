import Logo from './Logo';
import Button from '../../common/Button/Button';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { EmptyUser } from 'common/DataType';

const Header: React.FC = () => {
	const { userDetail, setUserDetail } = useContext(AppContext);

	const navigate = useNavigate();
	const onClickLogOut = () => {
		localStorage.removeItem('userToken');
		setUserDetail(EmptyUser);
		navigate('/login');
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				// backgroundColor: 'whitesmoke',
				padding: '20px',
			}}
		>
			<div>
				<Logo />
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<p style={{ marginRight: '15px' }}>{userDetail.username}</p>
				<p style={{ marginRight: '15px', fontWeight: 'bold' }}>
					<span>{userDetail.balance}</span>
				</p>
				<Button
					buttonName='LOG OUT'
					className='default-button'
					onClick={onClickLogOut}
				/>
			</div>
		</div>
	);
};

export default Header;
