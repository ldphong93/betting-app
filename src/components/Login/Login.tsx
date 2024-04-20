import React, { useContext, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const loginURL = 'http://localhost:8080/login';

interface ResultJson {
	successful: boolean;
	token: string;
	username: string;
	role: string;
}

interface LoginValues {
	username: string;
	password: string;
}

export interface ErrorInfo {
	values: LoginValues;
	errorFields: { name: string[]; errors: string[] };
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { setUserDetail } = useContext(AppContext);
	const [errorMessage, setErrorMessage] = useState('');

	const onFinish = async (values: LoginValues) => {
		console.log('Login in...');
		try {
			const response = await fetch(loginURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				console.log('There was an error!');
				setErrorMessage('There was an error!');
				return;
			}

			const resultJson: ResultJson = await response.json();

			if (resultJson.successful === false) {
				console.log('Username or password not correct!');
				setErrorMessage('Username or password not correct!');
				return;
			}

			const token = resultJson.token;
			setUserDetail(resultJson.username);
			localStorage.setItem('userToken', token);
			console.log(resultJson);

			// dispatch(
			// 	loginAction({
			// 		username: resultJson.username,
			// 		role: resultJson.role,
			// 		token: resultJson.token,
			// 	})
			// );

			console.log('User token: ', token);

			navigate('/');
		} catch (error) {
			console.log('There was an error: ', error);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Fail to login', errorInfo);
	};

	return (
		<div className='d-flex justify-content-center flex-column align-items-center'>
			<h1
				style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}
			>
				Login
			</h1>
			<Card bordered={true} style={{ border: '1px groove' }}>
				<Form
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Username'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						// fontSize='50px'
						name='username'
						// placeholder='Input text'
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 0,
							span: 24,
						}}
					>
						{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
						<Button type='primary' htmlType='submit' block>
							Login
						</Button>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 4,
							span: 16,
						}}
					>
						<p>If you don't have an account?</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: '10px',
							}}
						>
							<Link to='/registration' style={{ fontWeight: 'bold' }}>
								Register
							</Link>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Login;
