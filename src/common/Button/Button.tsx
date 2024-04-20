import React from 'react';
import './Button.css';

const Button = (props) => {
	return (
		<button onClick={props.onClick} className={props.className} type='button'>
			{props.buttonName}
		</button>
	);
};
export default React.memo(Button);
