'use client'
import React, { useState } from "react";
import styles from "./mobileHeader.module.scss";
import MenuIcon from "../../icons/menuIcon";
const Logo = "/assets/logo/logo.svg";
import Link from "next/link";
import classNames from "classnames";

export default function MobileHeader() {
	const [dropdown, setDropdown] = useState(false);
	const [headerOpen, setHeaderOpen] = useState(false);
	return (
		<><div className={styles.mobileHeader}>
			<div className={styles.headerStyling}>
				<div className={styles.logo}>
					<img src={Logo} alt="Logo" width={"100%"} height={"100%"} />
				</div>
				<div className={styles.menuIcon} onClick={() => setHeaderOpen(!headerOpen)}>
					<MenuIcon />
				</div>
			</div>
		</div>
			<div className={classNames(styles.mobileSidebar, headerOpen ? styles.show : styles.hide)}>
				<div className={styles.logoCloseIconAlignment}>
					<div className={styles.logo}>
						<img src={Logo} alt="Logo" width={"100%"} height={"100%"} />
					</div>
					<div className={styles.close} onClick={() => setHeaderOpen(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"></path></svg>
					</div>
				</div>
				<div className={styles.mobileSidebarBody}>
					<div className={styles.textIconAlignment}>
						<a className={styles.lgText}>About</a>
						<div className={classNames(styles.icon, dropdown ? styles.rotate : "")} onClick={() => setDropdown(!dropdown)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"></path></svg>
						</div>
					</div>
					<div className={classNames(styles.listMenu, dropdown ? styles.show : styles.hide)}>
						<div className={styles.spacing}>
							<Link href="/about/#about-secure-fx">Why Securefx</Link>
							<Link href="/regulations">Regulation</Link>
							<Link href="/legal-doc">Legal Documents</Link>
							<Link href="/sec-fund">Security of funds</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
