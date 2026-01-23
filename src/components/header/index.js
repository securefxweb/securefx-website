"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import classNames from "classnames";
import Link from "next/link";
const ArrowIcon = "/assets/icons/arrow.svg";
const LoginIcon = "/assets/icons/login.svg";
const Logo = "/assets/logo/logo.svg";
export default function Header() {
	const pathname = usePathname();
	return (
		<div
			className={classNames(styles.headerSticky, {
				[styles.ibRoute]: pathname.startsWith("/ib"),
			})}
		>
			<header className={classNames(styles.header)}>
				<Link href="#">
					<div className={styles.buttonAlignment}>
						<div className={styles.buttonUi}>
							<div className={styles.layer}></div>
							<div className={styles.layer2}></div>
							<span>Try Demo</span>
							<img src={ArrowIcon} alt="ArrowIcon" />
						</div>
					</div>
				</Link>
				<Link href="#">
					<div className={styles.loginButton}>
						<div className={styles.loginbuttonUi}>
							<div className={styles.layer}></div>
							<div className={styles.layer2}></div>
							<span>Log In</span>
							<img src={LoginIcon} alt="LoginIcon" />
						</div>
					</div>
				</Link>
				<div className={styles.headerAlignment}>
					<Link href="/about">About</Link>
					<Link href={"/trading-platform"}>Trade</Link>
					<Link href="/#accounts">Accounts</Link>
					<Link href="/">
						<img src={Logo} alt="Logo" />
					</Link>
					<Link href="/#partner">Partner</Link>
					<Link href="#">News</Link>
					<Link href="mailto:support@securefx.net">Support</Link>
					<Link href={"#"}>EN</Link>
				</div>
			</header>
		</div>
	);
}
