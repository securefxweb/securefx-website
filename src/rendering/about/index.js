import React from "react";
import AboutBanner from "./aboutBanner";
import AboutSecureFx from "./aboutSecureFx";
import MissionVissonSection from "./missionVissonSection";
import YearDetails from "./yearDetails";
import AboutScrollSection from "./aboutScrollSection";
import { milestonesData, awardsData, visionData } from "@/constants/data";
export default function About() {
	return (
		<div>
			<AboutBanner />
			<AboutSecureFx />
			<MissionVissonSection data={visionData} />
			<AboutScrollSection data={awardsData} />
			<YearDetails data={milestonesData} />
		</div>
	);
}
