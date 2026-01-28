"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import classNames from "classnames";
import Link from "next/link";
const ArrowIcon = "/assets/icons/arrow.svg";
const LoginIcon = "/assets/icons/login.svg";
const Logo = "/assets/logo/logo.svg";
export default function Header() {
	const pathname = usePathname();
	const [logindropdown, setLogindropdown] = useState(false);
	return (
		<div
			className={classNames(styles.headerSticky, {
				// [styles.ibRoute]: pathname.startsWith("/ib"),
			})}
		>
			<header className={classNames(styles.header)}>
				<div className={styles.buttonAlignment}>
					<div className={styles.buttonUi}>
						<div className={styles.layer}></div>
						<div className={styles.layer2}></div>
						<span>Try Demo</span>
						<img src={ArrowIcon} alt="ArrowIcon" />
					</div>
				</div>
				<div className={styles.loginButton}>
					<div className={styles.loginbuttonUi} onClick={() => setLogindropdown(!logindropdown)}>
						<div className={styles.layer}></div>
						<div className={styles.layer2}></div>
						<span>Log In</span>
						<img className={classNames(logindropdown ? styles.rotate : "")} src={LoginIcon} alt="LoginIcon" />
					</div>
					<div className={classNames(styles.logindropdown, logindropdown ? styles.show : styles.hide)}>
						<div className={styles.design}>
							<a>User Login
							</a>
							<a>IB Login
							</a>
							<a>Affiliate Login
							</a>
							<a>Mt4/Mt5
							</a>
						</div>
					</div>
				</div>
				<div className={styles.headerAlignment}>
					<Link className={styles.spacing} href="/about">
						About
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<a>About us</a>
								<a>Regulation</a>
								<a>Legal Document
								</a>
								<a>Security of funds</a>
							</div>
						</div>
					</Link>
					<Link className={styles.spacing} href="/about">
						Trade
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<a>Forex</a>
								<a>Metal</a>
								<a>Indices
								</a>
								<a>Energy</a>
								<a>Commodities</a>
								<a>Mt4/Mt5 Mobile</a>
								<a>Economic Calendar</a>
								<a>Calculators</a>
							</div>
						</div>
					</Link>
					<Link className={styles.spacing} href="/about">
						Accounts
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<a>Standard</a>
								<a>Pro</a>
								<a>RAW
								</a>
								<a>ZERO Spread</a>
								<a>Deposite/Withdraw</a>
							</div>
						</div>
					</Link>
					<Link href="/">
						<img src={Logo} alt="Logo" />
					</Link>
					<Link className={styles.spacing} href="/about">
						Partner
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<a>IB</a>
								<a>Affiliate</a>
							</div>
						</div>
					</Link>
					<Link href="#">Tools</Link>
					<Link href="mailto:support@securefx.net">Support</Link>
					<Link href={"#"}>EN</Link>
				</div>
			</header >
		</div >
	);
}
