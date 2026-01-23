"use client";
import React, { useState } from "react";
import styles from "./ourAffiliate.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
const MobileIcon = "/assets/icons/mobile.svg";
const PlatformImage = "/assets/images/platform.png";
const BullImage = "/assets/images/bull-img.png";
const ArrowIcon = "/assets/icons/left-arrow.svg";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";

export default function OurAffiliate({ data }) {
	const [prevEl, setPrevEl] = useState(null);
	const [nextEl, setNextEl] = useState(null);
	return (
		<div className={styles.ourAffiliateAlignment}>
			<div className="container-lg">
				<div className={styles.title}>
					<h2>Our Affiliate</h2>
				</div>
			</div>
			<Swiper
				spaceBetween={35}
				slidesPerView={5.2}
				loop={true}
				speed={800}
				grabCursor={true}
				freeMode={{
					enabled: true,
					momentum: true,
				}}
				centeredSlides={true}
				centeredSlidesBounds={true}
				navigation={{ prevEl, nextEl }}
				onBeforeInit={(swiper) => {
					swiper.params.navigation = swiper.params.navigation || {};
				}}
				onInit={(swiper) => {
					if (swiper.navigation) {
						swiper.navigation.init();
						swiper.navigation.update();
					}
				}}
				modules={[Navigation, FreeMode]}
				breakpoints={{
					1400: {
						slidesPerView: 4.2,
						spaceBetween: 35,
					},
					1200: {
						slidesPerView: 3.2,
						spaceBetween: 30,
					},
					992: {
						slidesPerView: 3.2,
						spaceBetween: 25,
					},
					768: {
						slidesPerView: 2.2,
						spaceBetween: 20,
					},
					576: {
						slidesPerView: 1.4,
						spaceBetween: 15,
					},
					0: {
						slidesPerView: 1.1,
						spaceBetween: 10,
					},
				}}
			>
				{[...data, ...data].map((item, index) => (
					<SwiperSlide key={index}>
						<div className={styles.mainSpacing}>
							<div className={styles.card}>
								<div className={styles.image}>
									<img src={item.image} alt="BullImage" />
								</div>
								<div className={styles.mainTitle}>
									<div className={styles.spacing}>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className={styles.arrowCenterAlignment}>
				<button ref={setPrevEl}>
					<img src={ArrowIcon} alt="ArrowIcon" />
				</button>
				<button ref={setNextEl}>
					<img src={ArrowIcon} alt="ArrowIcon" />
				</button>
			</div>
		</div>
	);
}
