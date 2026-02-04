"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import classNames from "classnames";
import Link from "next/link";
const ArrowIcon = "/assets/icons/arrow.svg";
const LoginIcon = "/assets/icons/login.svg";
const Logo = "/assets/logo/logo.svg";
import UpIcon from '../../icons/upIcon'
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
					<div className={styles.spacing}>
						<Link href="/about">About</Link>
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/about">Why Securefx</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/regulations">Regulation</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/legal-doc">Legal Documents</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/sec-fund">Security of funds</Link>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.spacing}>
						<Link className={styles.spacing} href="/forex">Trade</Link>
						<div className={classNames(styles.dropdown, styles.dropdownStyling)}>
							<div className={styles.dropdownDesign}>
								<div className={styles.subheaderAlignment}>
									<div className={styles.style}>
										<div className={styles.dot}></div>
										<span>Products
										</span>
									</div>
									<div className={classNames(styles.icon, styles.rotateRemove)}>
										<UpIcon />
									</div>
								</div>
								<div className={classNames(styles.sublistStyle, styles.hide)}>
									<Link href="/forex">Forex</Link>
									<Link href="/metals">Metal</Link>
									<Link href="/indices">Indices</Link>
									<Link href="/energy">Energy</Link>
									<Link href="/commodities">Commodities</Link>
								</div>
								<div className={styles.subheaderAlignment}>
									<div className={styles.style}>
										<div className={styles.dot}></div>
										<span>Treading Platform
										</span>
									</div>
									<div className={styles.icon}>
										<UpIcon />
									</div>
								</div>
								<div className={classNames(styles.sublistStyle, styles.hide)}>
									<Link href="/trading-platform">Mt4/Mt5 Mobile</Link>
									<Link href="/trading-platform">Mt4/Mt5 Web</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/calendar">Economic Calendar</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/precise-calculations">Calculators</Link>
								</div>


							</div>
						</div>
					</div>
					<div className={styles.spacing}>
						<Link className={styles.spacing} href="/standard-account">Accounts</Link>
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/standard-account">Standard</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/pro-account">Pro</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/raw-account">RAW</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/zero-spread-account">ZERO Spread</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/deposit">Deposite/Withdraw</Link>
								</div>
							</div>
						</div>
					</div>
					<Link href="/">
						<img src={Logo} alt="Logo" />
					</Link>
					<div className={styles.spacing}>
						<Link className={styles.spacing} href="/ib">Partner</Link>
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/ib" onClick={closeDropdowns}>IB</Link>
								</div>
								<div className={styles.style}>
									<div className={styles.dot}></div>
									<Link href="/affiliate" onClick={closeDropdowns}>Affiliate</Link>
								</div>
							</div>
						</div>
					</div>
					<Link href="#">Tools</Link>
					<Link href="mailto:support@securefx.net">Support</Link>
					{/* <Link href={"#"}>EN</Link> */}
				</div>
			</header >
		</div >
	);
}
