"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./footer.module.scss";
import AnimatedLine from "./animatedLine";

import InstagramIcon from "@/icons/instagramIcon";
import FacebookIcon from "@/icons/facebookIcon";
import TwitterIcon from "@/icons/twitterIcon";
import LinkdinIcon from "@/icons/linkdinIcon";
import YoutubeIcon from "@/icons/youtubeIcon";
import TelegramIcon from "@/icons/telegramIcon";
import WhatsaapIcon from "@/icons/whatsaapIcon";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const FooterLogo = "/assets/logo/footer-logo.svg";

export default function Footer() {
	const socialIcons = [
		{ id: "instagram", icon: <InstagramIcon />, link: "#" },
		{ id: "facebook", icon: <FacebookIcon />, link: "#" },
		{ id: "twitter", icon: <TwitterIcon />, link: "#" },
		{ id: "linkedin", icon: <LinkdinIcon />, link: "#" },
		{ id: "youtube", icon: <YoutubeIcon />, link: "#" },
		{ id: "telegram", icon: <TelegramIcon />, link: "#" },
		{ id: "whatsapp", icon: <WhatsaapIcon />, link: "#" },
	];

	const menus = {
		About: [
			{
				id: "why-securefx",
				link: "/about/#about-secure-fx",
				text: "Why Securefx",
			},
			{ id: "vision", link: "/about/#mission", text: "Vision" },
			{ id: "mission", link: "/about/#mission", text: "Mission" },
			{ id: "regulation", link: "/regulations", text: "Regulation" },
			{ id: "legal-doc", link: "/legal-doc", text: "Legal Documents" },
			{ id: "licenses", link: "#", text: "Licenses & Registrations" },
			{ id: "security", link: "/sec-fund", text: "Security of funds" },
			{ id: "milestones", link: "/about/#milesstone", text: "Milestones" },
		],

		Accounts: [
			{ id: "why-securefx-acc", link: "#", text: "Why Securefx" },
			{ id: "std", link: "/standard-account", text: "STD" },
			{ id: "pro", link: "/pro-account", text: "PRO" },
			{ id: "raw", link: "/raw-account", text: "RAW" },
			{ id: "zero", link: "/zero-spread-account", text: "ZERO" },
		],

		Trade: [
			{ id: "products", link: "/forex", text: "Products" },
			{
				id: "trading-platform",
				link: "/trading-platform",
				text: "Trading Platform",
			},
			{ id: "economic-calendar", link: "/calendar", text: "Economic Calender" },
			{ id: "calculators", link: "/precise-calculations", text: "Calculators" },
		],

		Partner: [
			{ id: "ib", link: "/ib", text: "IB" },
			{ id: "affiliate", link: "/affiliate", text: "Affiliate" },
		],

		Help: [
			{ id: "blogs", link: "/blogs", text: "Blogs" },
			{ id: "contact-us", link: "/contact-us", text: "Contact Us" },
			{ id: "career", link: "#", text: "Career" },
			{ id: "policy", link: "#", text: "Policy" },
		],
	};

	// ⭐ Footer reference for scroll tracking
	const footerRef = useRef(null);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const media = window.matchMedia("(max-width: 568px)");
		setIsMobile(media.matches);

		const listener = () => setIsMobile(media.matches);
		media.addEventListener("change", listener);

		return () => media.removeEventListener("change", listener);
	}, []);

	const { scrollYProgress } = useScroll({
		target: footerRef,
		offset: isMobile ? ["start end", "start end"] : ["start end", "end end"],
	});

	const rotate = useTransform(scrollYProgress, (v) => {
		if (isMobile) {
			// mobile: simple & brutal truth
			return `${-3.5 * v}deg`;
		}

		if (!footerRef.current) return "0deg";

		const height = footerRef.current.offsetHeight;
		const offset = 120;
		const triggerPoint = (height - offset) / height;

		if (v < triggerPoint) return "0deg";

		const localProgress = (v - triggerPoint) / (1 - triggerPoint);
		return `${-3.5 * localProgress}deg`;
	});

	return (
		<footer ref={footerRef} className={styles.footer}>
			<div className={styles.maintitleabsolute}>
				<motion.div className={styles.maintitle} style={{ rotate }}>
					<h2>Secured zone</h2>
				</motion.div>
			</div>

			<div className={styles.footerbottom}>
				<div className={styles.footerbottomsc}>
					<div className={styles.footerbottomthrd}>
						<div className={styles.footerbg}>
							<div className="container-lg">
								<div className={styles.footergrid}>
									<div className={styles.leftcontent}>
										<div className={styles.footerlogo}>
											<img src={FooterLogo} alt="Footer Logo" />
										</div>

										<div className={styles.email}>
											<a href="mailto:support@securefx.net">
												support@securefx.net
											</a>
										</div>

										<AnimatedLine />

										<div className={styles.socialAlignment}>
											{socialIcons.map((item) => (
												<a key={item.id} href={item.link}>
													{item.icon}
												</a>
											))}
										</div>
									</div>

									<div className={styles.rightMenu}>
										{Object.entries(menus).map(([title, items]) => (
											<div key={title}>
												<h4>{title}</h4>
												{items.map(({ id, link, text }) => (
													<Link key={id} href={link}>
														{text}
													</Link>
												))}
											</div>
										))}
									</div>
								</div>

								<div className={styles.copyRightAlignment}>
									<p>© 2025 SecureFX, Inc. All rights reserved.</p>

									<div className={styles.menuAlignment}>
										<a href="#">Privacy Policy</a>
										<span>|</span>
										<a href="#">Terms & Conditions</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
