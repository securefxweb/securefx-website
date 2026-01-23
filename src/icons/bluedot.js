import React from "react";

const BlueDot = ({ size = 24, className, style, color = "#3C75FE" }) => {
	return (
		<svg
			width={size}
			height={size}
			style={style}
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle opacity="0.2" cx="12" cy="12" r="12" fill={color} />
			<circle cx="12" cy="12" r="5" fill={color} />
		</svg>
	);
};

export default BlueDot;
