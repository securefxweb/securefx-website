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
								<Link href="/about">Why Securefx</Link>
								<Link href="/regulations">Regulation</Link>
								<Link href="/legal-doc">Legal Documents</Link>
								<Link href="/sec-fund">Security of funds</Link>
							</div>
						</div>
					</Link>
					<Link className={styles.spacing} href="/forex">
						Trade
						<div className={classNames(styles.dropdown, styles.dropdownStyling)}>
							<div className={styles.dropdownDesign}>
								<p>
									Products
								</p>
								{/* <Link href="/forex">Products</Link>
								<Link href="/trading-platform">Trading Platform</Link>
								<Link href="/calendar">Economic Calendar</Link>
								<Link href="/precise-calculations">Calculators</Link> */}
								<div className={styles.leftAlignment}>
									<Link href="/forex">Forex</Link>
									<Link href="/metals">Metal</Link>
									<Link href="/indices">Indices</Link>
									<Link href="/energy">Energy</Link>
									<Link href="/commodities">Commodities</Link>
								</div>
								<p>
									Treading Platform
								</p>
								<div className={styles.leftAlignment}>
									<Link href="/trading-platform">Mt4/Mt5 Mobile</Link>
								</div>
								<Link href="/calendar">Economic Calendar</Link>
								<Link href="/precise-calculations">Calculators</Link>
							</div>
						</div>
					</Link>
					<Link className={styles.spacing} href="/standard-account">
						Accounts
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<Link href="/standard-account">Standard</Link>
								<Link href="/pro-account">Pro</Link>
								<Link href="/raw-account">RAW</Link>
								<Link href="/zero-spread-account">ZERO Spread</Link>
								<Link href="/deposit">Deposite/Withdraw</Link>
							</div>
						</div>
					</Link>
					<Link href="/">
						<img src={Logo} alt="Logo" />
					</Link>
					<Link className={styles.spacing} href="/ib">
						Partner
						<div className={styles.dropdown}>
							<div className={styles.dropdownDesign}>
								<Link href="/ib">IB</Link>
								<Link href="/affiliate">Affiliate</Link>
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
