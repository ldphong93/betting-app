import React, { useContext, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const loginURL = 'http://localhost:8080/login';

interface ResultJson {
	successful: boolean;
	token: string;
	id: number;
	username: string;
	role: string;
	balance: number;
}

interface LoginValues {
	username: string;
	password: string;
	balance: number;
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
			setUserDetail({
				id: resultJson.id,
				username: resultJson.username,
				role: resultJson.role,
				balance: resultJson.balance,
			});
			localStorage.setItem('userToken', token);
			console.log(resultJson);

			console.log('User token: ', token);

			navigate('/main');
		} catch (error) {
			console.log('There was an error: ', error);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Fail to login', errorInfo);
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<div>
				<h1
					style={{
						fontSize: '30px',
						fontWeight: 'bold',
						marginBottom: '20px',
						textAlign: 'center',
					}}
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
							name='username'
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
							{errorMessage && (
								<div style={{ color: 'red' }}>{errorMessage}</div>
							)}
							<Button type='primary' htmlType='submit' block>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default Login;
