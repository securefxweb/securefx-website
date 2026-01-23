"use client";
import React from "react";
import styles from "./missionVissonSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
export default function MissionVissonSection({ data }) {
	return (
		<div className={styles.missionVissonSection} id="mission">
			<Swiper
				spaceBetween={50}
				slidesPerView={"1.4"}
				loop={true}
				speed={800}
				pagination={{ clickable: true }}
			>
				{data.map((item) => (
					<SwiperSlide key={item.id}>
						<div className={styles.iconCenter}>
							<img src={item.image} alt={item.title} />
						</div>
						<h2>{item.title}</h2>
						<p>{item.description}</p>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
