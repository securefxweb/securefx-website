import React from "react";
import LegalDocBanner from "./legalDocBanner";
import LegalDocuments from "./legalDocuments";
import SecureFxIntegrity from "../regulations/secureFxIntegrity";
import { legalDocumentData } from "@/constants/data";
export default function LegalDoc() {
	return (
		<div>
			<LegalDocBanner data={legalDocumentData} />
			<LegalDocuments data={legalDocumentData} />
			<SecureFxIntegrity data={legalDocumentData} />
		</div>
	);
}
