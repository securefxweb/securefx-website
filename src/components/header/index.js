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
	const [activeDropdown, setActiveDropdown] = useState(null);

	const closeDropdowns = () => {
		setActiveDropdown(null);
		setLogindropdown(false);
	};
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
					<div className={styles.spacing} onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
						<Link href="/about" onClick={closeDropdowns}>About</Link>
						<div className={classNames(styles.dropdown, activeDropdown === 'about' ? styles.show : '')}>
							<div className={styles.dropdownDesign}>
								<Link href="/about/#about-secure-fx" onClick={closeDropdowns}>Why Securefx</Link>
								<Link href="/regulations" onClick={closeDropdowns}>Regulation</Link>
								<Link href="/legal-doc" onClick={closeDropdowns}>Legal Documents</Link>
								<Link href="/sec-fund" onClick={closeDropdowns}>Security of funds</Link>
							</div>
						</div>
					</div>
					<div className={styles.spacing} onMouseEnter={() => setActiveDropdown('trade')} onMouseLeave={() => setActiveDropdown(null)}>
						<Link href="/forex" onClick={closeDropdowns}>Trade</Link>
						<div className={classNames(styles.dropdown, activeDropdown === 'trade' ? styles.show : '')}>
							<div className={styles.dropdownDesign}>
								<Link href="/forex" onClick={closeDropdowns}>Products</Link>
								<Link href="/trading-platform" onClick={closeDropdowns}>Trading Platform</Link>
								<Link href="/calendar" onClick={closeDropdowns}>Economic Calendar</Link>
								<Link href="/precise-calculations" onClick={closeDropdowns}>Calculators</Link>
							</div>
						</div>
					</div>
					<div className={styles.spacing} onMouseEnter={() => setActiveDropdown('accounts')} onMouseLeave={() => setActiveDropdown(null)}>
						<Link href="/standard-account" onClick={closeDropdowns}>Accounts</Link>
						<div className={classNames(styles.dropdown, activeDropdown === 'accounts' ? styles.show : '')}>
							<div className={styles.dropdownDesign}>
								<Link href="/standard-account" onClick={closeDropdowns}>STD</Link>
								<Link href="/pro-account" onClick={closeDropdowns}>PRO</Link>
								<Link href="/raw-account" onClick={closeDropdowns}>RAW</Link>
								<Link href="/zero-spread-account" onClick={closeDropdowns}>ZERO</Link>
							</div>
						</div>
					</div>
					<Link href="/" onClick={closeDropdowns}>
						<img src={Logo} alt="Logo" />
					</Link>
					<div className={styles.spacing} onMouseEnter={() => setActiveDropdown('partner')} onMouseLeave={() => setActiveDropdown(null)}>
						<Link href="/ib" onClick={closeDropdowns}>Partner</Link>
						<div className={classNames(styles.dropdown, activeDropdown === 'partner' ? styles.show : '')}>
							<div className={styles.dropdownDesign}>
								<Link href="/ib" onClick={closeDropdowns}>IB</Link>
								<Link href="/affiliate" onClick={closeDropdowns}>Affiliate</Link>
							</div>
						</div>
					</div>
					<Link href="#" onClick={closeDropdowns}>Tools</Link>
					<Link href="mailto:support@securefx.net" onClick={closeDropdowns}>Support</Link>
					<Link href={"#"} onClick={closeDropdowns}>EN</Link>
				</div>
			</header >
		</div >
	);
}
