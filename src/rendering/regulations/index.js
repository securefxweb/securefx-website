import React from "react";
import RegulationsBanner from "./regulationsBanner";
import RegulationsCountry from "./regulationsCountry";
import SecureFxIntegrity from "./secureFxIntegrity";
import { regulationsData } from "@/constants/data";
export default function Regulations() {
	return (
		<div>
			<RegulationsBanner data={regulationsData} />
			<RegulationsCountry data={regulationsData} />
			<SecureFxIntegrity data={regulationsData} />
		</div>
	);
}
