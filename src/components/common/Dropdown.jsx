import React from 'react';
import "./Dropdown.scss";

export const Dropdown = ({ category, defaultText, options, ...props }) => {
	return (
		<div>
			<label for={category}>{defaultText}</label>
			<select name={category} id={category} {...props}>
				{options.map(op => <option value={op.value}>{op.label}</option>)}
			</select>
		</div>
	)
}