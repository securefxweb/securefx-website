import React from "react";
import styles from "./mobileHeader.module.scss";
import MenuIcon from "../../icons/menuIcon";
const Logo = "/assets/logo/logo.svg";

export default function MobileHeader() {
	return (
		<div className={styles.mobileHeader}>
			<div className={styles.headerStyling}>
				<div className={styles.logo}>
					<img src={Logo} alt="Logo" width={"100%"} height={"100%"} />
				</div>
				<div className={styles.menuIcon}>
					<MenuIcon />
				</div>
			</div>
		</div>
	);
}
