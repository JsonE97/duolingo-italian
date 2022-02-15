import React from 'react';
import "./Dropdown.scss";

export const Dropdown = ({ category, defaultText, options, onChange, ...props }) => {
	return (
		<div className="div-dropdown">
			<label for={category}>{defaultText}</label>
			<select className="select-dropdown" name={category} id={category} onChange={(e) => onChange(e.target.value)} {...props}>
				{options.map((op, i) => <option value={op.value}>{op.label}</option>)}
			</select>
		</div>
	)
}