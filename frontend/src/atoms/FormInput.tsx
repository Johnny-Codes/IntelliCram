import React from 'react';

export default function FormInput({ type, classes, ...rest }) {
	const _className = `px-10 py-2 border rounded-md ${classes || ''}`;

	return <input className={_className} type={type} {...rest} />;
}
