"use client";
import React, { useEffect, useRef } from "react";

export default function SmokeEffect() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const pointers = [
			{
				id: -1,
				down: false,
				moved: false,
				x: 0,
				y: 0,
				dx: 0,
				dy: 0,
			},
		];

		const canvas = canvasRef.current;
		if (!canvas) return;

		const config = {
			TEXTURE_DOWNSAMPLE: 1,
			DENSITY_DISSIPATION: 0.98,
			VELOCITY_DISSIPATION: 0.99,
			PRESSURE_ITERATIONS: 20,
			SPLAT_RADIUS: 0.012,
			SHADING: true,
			COLORFUL: true,
			COLOR_UPDATE_SPEED: 10,
		};

		const splatStack = [];
		let animationId;

		function resizeCanvas() {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		}

		function update() {
			animationId = requestAnimationFrame(update);

			if (splatStack.length > 0) {
				const amount = splatStack.pop();
				for (let i = 0; i < amount; i++) {
					const color = [
						Math.random() * 255,
						Math.random() * 255,
						Math.random() * 255,
					];
					const x = Math.random() * canvas.width;
					const y = Math.random() * canvas.height;

					splat(x, y, color);
				}
			}

			const pointer = pointers[0];
			if (pointer.moved) {
				splat(pointer.x, pointer.y, [255, 255, 255]);
				pointer.moved = false;
			}

			drawSmoke();
		}

		function drawSmoke() {
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = "rgba(0,0,0,0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		function splat(x, y, color) {
			const ctx = canvas.getContext("2d");
			ctx.beginPath();
			ctx.arc(x, y, 30, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.4)`;
			ctx.fill();
		}

		function multipleSplats(amount) {
			splatStack.push(amount);
		}

		canvas.addEventListener("mousedown", (e) => {
			const p = pointers[0];
			p.down = true;
			p.x = e.offsetX;
			p.y = e.offsetY;
			p.dx = 0;
			p.dy = 0;
			p.moved = true;
		});

		canvas.addEventListener("mousemove", (e) => {
			const p = pointers[0];
			if (!p.down) return;
			p.dx = e.offsetX - p.x;
			p.dy = e.offsetY - p.y;
			p.x = e.offsetX;
			p.y = e.offsetY;
			p.moved = true;
		});

		window.addEventListener("mouseup", () => {
			pointers[0].down = false;
		});

		window.addEventListener("resize", resizeCanvas);

		resizeCanvas();
		multipleSplats(20);
		update();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100%",
				height: "100%",
				display: "block",
				background: "#000",
				display: "none",
			}}
		/>
	);
}
