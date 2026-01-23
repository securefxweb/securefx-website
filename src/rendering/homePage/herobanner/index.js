"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./herobanner.module.scss";

export default function Herobanner() {
	const wrapperRef = useRef(null);

	const texts = [
		"You’ve done",
		"The Research,",
		"Rusted Your Instincts,",
		"And Arrived Here,",
		"where smart",
	];
	const [layout, setLayout] = useState({
		SECTION_HEIGHT: 70,
		MAX_TRANSLATE: 54,
		MIN_TRANSLATE: -277,
	});

	useEffect(() => {
		const updateLayout = () => {
			const width = window.innerWidth;

			if (width < 768) {
				// Mobile
				setLayout({
					SECTION_HEIGHT: 55,
					MAX_TRANSLATE: 75,
					MIN_TRANSLATE: -78,
				});
			} else if (width < 1024) {
				// Tablet
				setLayout({
					SECTION_HEIGHT: 60,
					MAX_TRANSLATE: 55,
					MIN_TRANSLATE: -238,
				});
			} else {
				// Desktop
				setLayout({
					SECTION_HEIGHT: 70,
					MAX_TRANSLATE: 54,
					MIN_TRANSLATE: -277,
				});
			}
		};

		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => window.removeEventListener("resize", updateLayout);
	}, []);

	const { SECTION_HEIGHT, MAX_TRANSLATE, MIN_TRANSLATE } = layout;

	/* -----------------------------
     Scroll logic
  ----------------------------- */
	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ["start start", "end end"],
	});

	const targetIndex = useRef(0);
	const [smoothIndex, setSmoothIndex] = useState(0);

	useEffect(() => {
		let current = 0;
		const animate = () => {
			current += (targetIndex.current - current) * 0.14;
			setSmoothIndex(current);
			requestAnimationFrame(animate);
		};
		animate();
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		targetIndex.current = v * (texts.length - 1);
	});

	useEffect(() => {
		if (wrapperRef.current) {
			wrapperRef.current.style.height = `${texts.length * SECTION_HEIGHT}vh`;
		}
	}, [SECTION_HEIGHT, texts.length]);

	const totalTranslate =
		MAX_TRANSLATE -
		(MAX_TRANSLATE - MIN_TRANSLATE) * (smoothIndex / (texts.length - 1));

	return (
		<div className={styles.mainWrapper} ref={wrapperRef}>
			<div className={styles.heroInner}>
				<div className={styles.textBlockmain}>
					<div
						className={styles.textBlock}
						style={{
							transform: `translateY(${totalTranslate}px)`,
						}}
					>
						{texts.map((txt, i) => {
							const distance = i - smoothIndex;

							let opacity = 0.18;
							if (Math.abs(distance) < 0.35) opacity = 1;
							else if (Math.abs(distance) < 1) opacity = 0.55;

							let blur = 0;
							if (Math.abs(distance) > 0.35) {
								blur = Math.min(Math.abs(distance) * 5, 12);
							}

							return (
								<h2
									key={i}
									className={styles.line}
									style={{
										opacity,
										filter: `blur(${blur}px)`,
										transition: "opacity 0.35s ease, filter 0.35s ease",
									}}
								>
									{txt}
								</h2>
							);
						})}
					</div>
				</div>

				<div className={styles.imageWrapper}>
					<img src="/hero-img.png" alt="Hero" />
				</div>
			</div>
		</div>
	);
}
