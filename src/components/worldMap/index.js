import React, { useEffect, useRef, memo } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import styles from "./worldMap.module.scss";
import { countryPinsData } from "@/constants/data";
const WorldMap = memo(function WorldMap() {
	const svgRef = useRef(null);
	useEffect(() => {
		const width = 1920;
		const height = 600;

		// Clear existing content
		d3.select(svgRef.current).selectAll("*").remove();

		const svg = d3
			.select(svgRef.current)
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("viewBox", `0 0 ${width} ${height}`);
		// .style("background", "#09090B");

		const projection = d3
			.geoNaturalEarth1()
			.scale(400)
			.translate([width / 2, height / 1.5]);

		const path = d3.geoPath().projection(projection);

		// Load world data (using GeoJSON directly)
		d3.json(
			"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
		).then((data) => {
			// Convert TopoJSON to GeoJSON
			const countries = topojson.feature(data, data.objects.countries);

			// Create gradient for countries
			const defs = svg.append("defs");

			const gradient = defs
				.append("linearGradient")
				.attr("id", "countryGradient")
				.attr("x1", "0%")
				.attr("y1", "0%")
				.attr("x2", "0%")
				.attr("y2", "100%");

			gradient
				.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", "#60a5fa")
				.attr("stop-opacity", 0.9);

			gradient
				.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", "#1e40af")
				.attr("stop-opacity", 0.8);

			// Draw countries
			svg
				.append("g")
				.selectAll("path")
				.data(countries.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("fill", "url(#countryGradient)")
				.attr("stroke", "#0f172a")
				.attr("stroke-width", 0.5)
				.style("transition", "fill 0.3s ease")
				.on("mouseover", function () {
					d3.select(this).attr("fill", "#3b82f6");
				})
				.on("mouseout", function () {
					d3.select(this).attr("fill", "url(#countryGradient)");
				});

			// Draw pins
			const pinGroup = svg.append("g").attr("class", "pins");

			countryPinsData.forEach((pin) => {
				const [x, y] = projection(pin.coords);

				// Pin shadow
				pinGroup
					.append("circle")
					.attr("cx", x)
					.attr("cy", y + 2)
					.attr("r", 12)
					.attr("fill", "rgba(0, 0, 0, 0.3)")
					.attr("filter", "blur(4px)");

				// Pulse animation circle
				const pulse = pinGroup
					.append("circle")
					.attr("cx", x)
					.attr("cy", y)
					.attr("r", 8)
					.attr("fill", "none")
					.attr("stroke", pin.color)
					.attr("stroke-width", 2)
					.attr("opacity", 0.8);

				pulse
					.transition()
					.duration(2000)
					.ease(d3.easeLinear)
					.attr("r", 20)
					.attr("opacity", 0)
					.on("end", function repeat() {
						d3.select(this)
							.attr("r", 8)
							.attr("opacity", 0.8)
							.transition()
							.duration(2000)
							.ease(d3.easeLinear)
							.attr("r", 20)
							.attr("opacity", 0)
							.on("end", repeat);
					});

				// Pin marker
				pinGroup
					.append("circle")
					.attr("cx", x)
					.attr("cy", y)
					.attr("r", 8)
					.attr("fill", pin.color)
					.attr("stroke", "#fff")
					.attr("stroke-width", 2)
					.style("cursor", "pointer")
					.on("mouseover", function (event) {
						d3.select(this).transition().duration(200).attr("r", 12);

						// Show tooltip with flag
						const rect = svgRef.current.getBoundingClientRect();
						tooltip
							.style("opacity", 1)
							.style("left", `${event.clientX - rect.left + 10}px`)
							.style("top", `${event.clientY - rect.top - 40}px`)
							.html(`
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="https://flagcdn.com/w40/${pin.countryCode.toLowerCase()}.png" 
                       style="width: 24px; height: 16px; object-fit: cover; border-radius: 2px;" 
                       alt="${pin.countryCode}" />
                  <span style="font-weight: 500;">${pin.name}</span>
                </div>
              `);
					})
					.on("mouseout", function () {
						d3.select(this).transition().duration(200).attr("r", 8);

						tooltip.style("opacity", 0);
					});
			});

			// Tooltip
			const tooltip = d3
				.select(svgRef.current.parentNode)
				.append("div")
				.attr("class", "map-tooltip")
				.style("position", "absolute")
				.style("background", "rgba(5, 0, 0, 0.9)")
				.style("color", "#fff")
				.style("padding", "12px 16px")
				.style("border-radius", "8px")
				.style("font-size", "14px")
				.style("pointer-events", "none")
				.style("opacity", 0)
				.style("transition", "opacity 0.2s")
				.style("z-index", 1000)
				.style("display", "flex")
				.style("align-items", "center")
				.style("gap", "10px");

			return () => tooltip.remove();
		});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.mapWrapper}>
				<svg ref={svgRef} className={styles.worldMap}></svg>
			</div>
		</div>
	);
});

export default WorldMap;
