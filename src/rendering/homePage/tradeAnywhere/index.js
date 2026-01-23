"use client";
import React, { useState } from "react";
import styles from "./tradeAnywhere.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const MobileIcon = "/assets/icons/mobile.svg";
const PlatformImage = "/assets/images/platform.png";
const ArrowIcon = "/assets/icons/left-arrow.svg";
import { tradeAnywhereData } from "@/constants/data";
import "swiper/css/navigation";

export default function TradeAnywhere() {
	const [prevEl, setPrevEl] = useState(null);
	const [nextEl, setNextEl] = useState(null);
	return (
		<div className={styles.tradeAnywhereSection} id="trade">
			<div className={styles.leftAlignment}>
				<div className={styles.title}>
					<div>
						<h2>
							The Power to <span>Trade Anywhere</span>
						</h2>
						<p>
							MetaTrader 5 gives you everything you need to trade smarter-
							advanced analytics, automated trading, and cross-device
							compatibility. Enjoy the same seamless performance and speed
							whether you’re trading on desktop, mobile, or directly through the
							web terminal.
						</p>
					</div>
					<div className={styles.arrowAlignment}>
						<button ref={setPrevEl}>
							<img src={ArrowIcon} alt="ArrowIcon" />
						</button>
						<button ref={setNextEl}>
							<img src={ArrowIcon} alt="ArrowIcon" />
						</button>
					</div>
				</div>
				<Swiper
					spaceBetween={50}
					slidesPerView={"1.8"}
					loop={true}
					speed={800}
					navigation={{ prevEl, nextEl }}
					onBeforeInit={(swiper) => {
						// assign refs before init
						swiper.params.navigation = swiper.params.navigation || {};
					}}
					onInit={(swiper) => {
						// initialize navigation after refs are set
						if (swiper.navigation) {
							swiper.navigation.init();
							swiper.navigation.update();
						}
					}}
					modules={[Navigation]}
				>
					{[...tradeAnywhereData, ...tradeAnywhereData].map((item, index) => (
						<SwiperSlide key={`${item.id}-${index}`}>
							<div className={styles.sliderBox}>
								<div className={styles.allDetails}>
									<div className={styles.iconAlignment}>
										<img src={item.icon} alt={item.title} />
									</div>
									<div className={styles.details}>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
									<div className={styles.buttonUi}>
										<div className={styles.layer}></div>
										<div className={styles.layer2}></div>
										<span>{item.cta}</span>
									</div>
								</div>
								<div className={styles.image}>
									<img src={PlatformImage} alt="PlatformImage" />
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
