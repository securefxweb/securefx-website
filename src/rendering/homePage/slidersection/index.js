"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./slidersection.module.scss";
const SliderImage = "/assets/images/slider-img.png";
const RoundIcon = "/assets/icons/round.svg";
import classNames from "classnames";
//import products from "@/constants/data/products.json";
import { products } from "@/constants/data";
export default function Slidersection({ slides = products.length * 2 }) {
	const sliderRef = useRef(null); // the row of slides
	const containerRef = useRef(null); // the tall wrapper
	const [distance, setDistance] = useState(0);
	const [ready, setReady] = useState(false);
	const [data, setData] = useState([
		{
			pair: "AUDUSD",
			price: "$0.80494",
			desc: "Australian Dollar...",
			change: "-5.97%",
		},
		{
			pair: "AUDUSD",
			price: "$0.80494",
			desc: "Australian Dollar...",
			change: "-5.97%",
			blue: true,
		},
		{
			pair: "AUDUSD",
			price: "$0.80494",
			desc: "Australian Dollar...",
			change: "-5.97%",
		},
		{
			pair: "AUDUSD",
			price: "$0.80494",
			desc: "Australian Dollar...",
			change: "-5.97%",
			blue: true,
		},
	]);

	// compute distance & set container height
	const compute = () => {
		if (!sliderRef.current || !containerRef.current) return;

		// total width of all slides (includes gaps if slider uses gap / margin)
		const totalWidth = sliderRef.current.scrollWidth;
		const viewportWidth = window.innerWidth;

		// how many pixels we need to move left so last slide is fully visible
		const needed = Math.max(0, totalWidth - viewportWidth);

		// container height should allow exactly 'needed' vertical scroll,
		// plus one viewport to keep sticky on screen initially.
		const containerHeight = needed + window.innerHeight;

		// apply
		setDistance(needed);
		containerRef.current.style.height = `${Math.ceil(containerHeight)}px`;

		// mark ready so motion uses correct value (avoids flicker)
		setReady(true);
	};

	// initial compute (layout) + on resize
	useLayoutEffect(() => {
		if (typeof window === "undefined") return;
		compute();

		const onResize = () => {
			// small timeout to allow layout stabilise
			requestAnimationFrame(compute);
		};
		window.addEventListener("resize", onResize);

		// If slides change dynamically in DOM, recalc
		let mo;
		if (sliderRef.current) {
			mo = new MutationObserver(() => {
				requestAnimationFrame(compute);
			});
			mo.observe(sliderRef.current, { childList: true, subtree: false });
		}

		return () => {
			window.removeEventListener("resize", onResize);
			if (mo) mo.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// map vertical progress → horizontal pixels
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Wait until computed distance available to avoid using 0
	const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

	return (
		<section ref={containerRef} className={styles.wrapper}>
			<div className={styles.stickyContainer}>
				{/* motion.x accepts number in px by default */}
				<motion.div
					ref={sliderRef}
					className={styles.slidersection}
					style={{ x }}
				>
					{Array.from({ length: slides }).map((_, i) => (
						<React.Fragment key={i}>
							{i % 2 === 0 ? (
								<div key={i} className={styles.items}>
									{(() => {
										const productIndex = Math.floor(i / 2) % products.length;
										const product = products[productIndex];
										return (
											<>
												<div className={styles.topAlignment}>
													<div className={styles.icontextAlignment}>
														<img src={RoundIcon} alt="RoundIcon" />
														<p>{product.productName}</p>
													</div>
													<div className={styles.subtitle}>
														<h3>{product.headline}</h3>
													</div>
												</div>
												<div className={styles.bottomAlignment}>
													<div className={styles.subgrid}>
														{product.features.map((feature, data) => (
															<div key={data} className={styles.detailsBox}>
																<h4>{feature.label}</h4>
																<p>{feature.text}</p>
															</div>
														))}
													</div>
													<div className={styles.detailsText}>
														<p>{product.description}</p>
													</div>
													<div className={styles.buttonUi}>
														<div className={styles.layer}></div>
														<div className={styles.layer2}></div>
														<span>Start Trading</span>
													</div>
												</div>
											</>
										);
									})()}
								</div>
							) : (
								<div
									className={styles.sliderTypeImage}
									style={{
										backgroundImage: `url(${SliderImage})`,
									}}
								>
									<div className={styles.image}>
										{(() => {
											const productIndex =
												Math.floor((i - 1) / 2) % products.length;
											const product = products[productIndex];
											return product.image ? (
												<img src={product.image} alt={product.productName} />
											) : (
												<img src={SliderImage} alt="SliderImage" />
											);
										})()}
									</div>
									<div className={styles.marqueeAlignment}>
										<motion.div
											className={styles.marqueeContent}
											animate={{ x: ["0%", "-50%"] }}
											transition={{
												repeat: Infinity,
												repeatType: "loop",
												duration: 12,
												ease: "linear",
											}}
										>
											{[...data, ...data].map((item, index) => (
												<div
													key={index}
													className={classNames(
														styles.listBox,
														item.blue ? styles.blueColor : "",
													)}
												>
													<div className={styles.headerAlignment}>
														<h3>{item.pair}</h3>
														<p>{item.price}</p>
													</div>
													<div className={styles.bodyAlignment}>
														<p>{item.desc}</p>
														<span>{item.change}</span>
													</div>
												</div>
											))}
										</motion.div>
									</div>
								</div>
							)}
						</React.Fragment>
					))}
				</motion.div>
			</div>
		</section>
	);
}
