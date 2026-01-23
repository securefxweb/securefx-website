"use client";
import React from "react";
import Select from "react-select";
import styles from "./dropdown.module.scss";
import DownIcon from "@/icons/downIcon";
import classNames from "classnames";

export default function Dropdown({
	label,
	placeholder,
	roundefull,
	items = [],
	value,
	onChange,
}) {
	// Transform items array to react-select format
	const options = items.map((item) => ({
		value: item,
		label: item,
	}));

	// Find selected option
	const selectedOption = options.find((opt) => opt.value === value) || null;

	// Handle change
	const handleChange = (selectedOption) => {
		onChange && onChange(selectedOption?.value);
	};

	// Custom styles for react-select
	const customStyles = {
		control: (base, state) => ({
			...base,
			borderRadius: roundefull ? "99px" : "4px",
			border: "1px solid rgba(255, 255, 255, 0.12)",
			background: "rgba(255, 255, 255, 0.10)",
			height: "48px",
			minHeight: "48px",
			padding: "0 16px",
			boxShadow: "none",
			cursor: "pointer",
			transition: "all 0.3s ease-in-out",
			"&:hover": {
				border: "1px solid rgba(255, 255, 255, 0.12)",
			},
		}),
		valueContainer: (base) => ({
			...base,
			padding: 0,
		}),
		input: (base) => ({
			...base,
			margin: 0,
			padding: 0,
			color: "#fff",
		}),
		placeholder: (base) => ({
			...base,
			color: "#9B9B9B",
			fontFamily: "GeneralSans-Regular",
			fontSize: "16px",
			fontWeight: 400,
			lineHeight: "24px",
			margin: 0,
		}),
		singleValue: (base) => ({
			...base,
			color: "#9B9B9B",
			fontFamily: "GeneralSans-Regular",
			fontSize: "16px",
			fontWeight: 400,
			lineHeight: "24px",
			margin: 0,
		}),
		indicatorSeparator: () => ({
			display: "none",
		}),
		dropdownIndicator: (base, state) => ({
			...base,
			padding: 0,
			transition: "transform 0.3s ease-in-out",
			transform: state.selectProps.menuIsOpen
				? "rotate(180deg)"
				: "rotate(0deg)",
			color: "#fff",
			"&:hover": {
				color: "#fff",
			},
		}),
		menu: (base) => ({
			...base,
			background: "#232323",
			borderRadius: "4px",
			marginTop: "4px",
			zIndex: 99,
			overflow: "hidden",
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		}),
		menuList: (base) => ({
			...base,
			padding: 0,
			maxHeight: "200px",
			overflowY: "auto",
			overflowX: "hidden",
			// Custom scrollbar styles
			"&::-webkit-scrollbar": {
				width: "4px",
				height: "4px",
			},
			"&::-webkit-scrollbar-track": {
				background: "#1f1f1f",
				borderRadius: "8px",
			},
			"&::-webkit-scrollbar-thumb": {
				background: "#4e4e4e",
				borderRadius: "8px",
			},
			"&::-webkit-scrollbar-thumb:hover": {
				background: "#868686",
			},
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isFocused
				? "rgba(255, 255, 255, 0.05)"
				: "transparent",
			color: state.isFocused ? "#fff" : "#9B9B9B",
			borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
			padding: "12px",
			cursor: "pointer",
			fontFamily: "GeneralSans-Regular",
			fontSize: "14px",
			fontWeight: 400,
			transition: "color 0.3s ease-in-out",
			"&:hover": {
				color: "#fff",
				backgroundColor: "rgba(255, 255, 255, 0.05)",
			},
			"&:active": {
				backgroundColor: "rgba(255, 255, 255, 0.05)",
			},
			"&:last-child": {
				borderBottom: "none",
			},
		}),
	};

	// Custom dropdown indicator component
	const DropdownIndicator = (props) => {
		return (
			<div
				{...props.innerProps}
				style={{ display: "flex", alignItems: "center" }}
			>
				<DownIcon />
			</div>
		);
	};

	return (
		<div
			className={classNames(
				styles.commonDropdown,
				roundefull ? styles.roundefull : "",
			)}
		>
			{label && <label>{label}</label>}
			<Select
				value={selectedOption}
				onChange={handleChange}
				options={options}
				placeholder={placeholder}
				styles={customStyles}
				components={{ DropdownIndicator }}
				isSearchable={false}
				classNamePrefix="custom-select"
			/>
		</div>
	);
}
