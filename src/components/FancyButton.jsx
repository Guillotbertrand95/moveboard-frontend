// components/FancyButton.jsx
import React from "react";
import "../styles/FancyButton.scss";

const FancyButton = ({ children, variant = "default", ...props }) => {
	return (
		<button className={`fancy-btn fancy-btn--${variant}`} {...props}>
			<span className="gradient"></span>
			<span className="label">{children}</span>
			<span className="transition"></span>
		</button>
	);
};

export default FancyButton;
