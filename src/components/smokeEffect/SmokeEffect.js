"use client";
import { useEffect, useRef } from "react";

const SmokeEffect = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let gl = canvas.getContext("webgl2", {
			alpha: true,
			depth: false,
			antialias: false,
			premultipliedAlpha: false,
		});

		if (!gl) {
			console.error("WebGL2 not supported");
			return;
		}

		// --- Shaders ---

		// Standard Full-screen Quad Vertex Shader
		const vertexShaderSource = `#version 300 es
      precision mediump float;
      in vec2 aPosition;
      out vec2 vUv;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

		// Simulation Shader (The "Physics" / Liquify / Trail logic)
		// Based on the specific logic from wasolutions.com
		const simFragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uPingPongTexture;
      uniform vec2 uPreviousMousePos;
      uniform float uTime;
      uniform vec2 uMousePos;
      uniform vec2 uResolution;
      
      const float PI = 3.1415926;
      const float TWOPI = 6.2831852;
      
      out vec4 fragColor;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

      mat2 rot(float a) {
        return mat2(cos(a), -sin(a), sin(a), cos(a));
      }

      vec2 angleToDir(float angle) {
        float rad = angle * 2.0 * PI;
        return vec2(cos(rad), sin(rad));
      }

      vec2 liquify(vec2 st, vec2 dir) {
        float aspectRatio = uResolution.x / uResolution.y;
        st.x *= aspectRatio;
        float amplitude = 0.0025;
        float freq = 6.;
        for (float i = 1.0; i <= 5.0; i++) {
          st = st * rot(i / 5.0 * PI * 2.0);
          st += vec2(
            amplitude * cos(i * freq * st.y + uTime * 0.02 * dir.x),
            amplitude * sin(i * freq * st.x + uTime * 0.02 * dir.y)
          );
        }
        st.x /= aspectRatio;
        return st;
      }

      vec3 calculateTrailContribution(vec2 mousePos, vec2 prevMousePos, vec2 uv, vec2 correctedUv, float aspectRatio, float radius) {
        vec2 dir = (mousePos - prevMousePos) * vec2(aspectRatio, 1.0);
        float angle = atan(dir.y, dir.x);
        if (angle < 0.0) angle += TWOPI;
        vec2 mouseVec = mousePos - prevMousePos;
        float mouseLen = length(mouseVec);
        vec2 mouseDir = mouseLen > 0.0 ? mouseVec / mouseLen : vec2(0.0);
        vec2 posToUv = correctedUv - prevMousePos * vec2(aspectRatio, 1.0);
        float projection = clamp(dot(posToUv, mouseDir * vec2(aspectRatio, 1.0)), 0.0, mouseLen * aspectRatio);
        vec2 closestPoint = prevMousePos * vec2(aspectRatio, 1.0) + mouseDir * vec2(aspectRatio, 1.0) * projection;
        float distanceToLine = distance(correctedUv, closestPoint);
        float s = (1.0 + radius)/(distanceToLine + radius) * radius;
        vec3 color = vec3(angle / TWOPI, 1.0, 1.0);
        vec3 pointColor = hsv2rgb(color);
        pointColor = pow(pointColor, vec3(2.2));
        float intensity = pow(s, 10.0 * (1. - 0.5000 + 0.1));
        return pointColor * intensity;
      }

      void main() {
        float aspectRatio = uResolution.x / uResolution.y;
        
        // Read previous frame
        vec2 uv = vUv;
        vec2 correctedUv = uv * vec2(aspectRatio, 1.0);
        vec3 lastFrameColor = texture(uPingPongTexture, uv).rgb;
        lastFrameColor = pow(lastFrameColor, vec3(2.2));
        
        // Calculate warp/liquify based on previous flow
        vec3 hsv = rgb2hsv(lastFrameColor);
        float prevAngle = hsv.x;
        vec2 prevDir = angleToDir(prevAngle);
        float prevStrength = hsv.z;
        
        // Warp coordinates
        uv = mix(uv, liquify(uv - prevDir * 0.005, prevDir), (1. - prevStrength) * 0.2500);
        
        // Read color again from warped coordinates (Feedback)
        lastFrameColor = texture(uPingPongTexture, uv).rgb;
        lastFrameColor = pow(lastFrameColor, vec3(2.2));
        
        // Draw new trail
        vec2 dir = (uMousePos - uPreviousMousePos) * vec2(aspectRatio, 1.0);
        float dist = length(dir);
        int numPoints = int(max(12.0, dist * 24.0));
        float speedFactor = clamp(dist, 0.7, 1.3);
        float radius = mix(0.1, 0.7, 0.3800 * speedFactor);
        
        vec3 trailColor = vec3(0.0);
        // Interpolate mouse movement to fill gaps
        int iter = min(numPoints, 24);
        for (int i = 0; i <= iter; i++) {
          float t = float(i) / float(numPoints);
          vec2 interpPos = mix(uPreviousMousePos, uMousePos, t);
          vec2 prevInterpPos = i > 0 ? mix(uPreviousMousePos, uMousePos, float(i-1) / float(numPoints)) : uPreviousMousePos;
          trailColor += calculateTrailContribution(interpPos, prevInterpPos, uv, correctedUv, aspectRatio, radius);
        }
        trailColor = trailColor / float(min(numPoints, 50) + 1);
        
        // Blur
        vec3 blurredLastFrame = vec3(0.0);
        float clampedDist = clamp(length(trailColor) * dist, 0.0, 1.0);
        float blurRadius = 0.005;
        
        blurredLastFrame += pow(texture(uPingPongTexture, uv + vec2(blurRadius, 0.0)).rgb, vec3(2.2)) * 0.2;
        blurredLastFrame += pow(texture(uPingPongTexture, uv + vec2(-blurRadius, 0.0)).rgb, vec3(2.2)) * 0.2;
        blurredLastFrame += pow(texture(uPingPongTexture, uv + vec2(0.0, blurRadius)).rgb, vec3(2.2)) * 0.2;
        blurredLastFrame += pow(texture(uPingPongTexture, uv + vec2(0.0, -blurRadius)).rgb, vec3(2.2)) * 0.2;
        blurredLastFrame += lastFrameColor * 0.2;
        
        vec3 draw = mix(blurredLastFrame, trailColor, clampedDist);
        
        // Decay/Dissipation (Specific to ensure it fades out)
        draw *= 0.95; // Much slower decay for longer trails
        
        draw = pow(draw, vec3(1.0/2.2));
        
        fragColor = vec4(draw, 1.0);
      }
    `;

		// Display Shader (Post-processing / Coloring)
		const displayFragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uPingPongTexture;
      out vec4 fragColor;
      
      const float PI = 3.1415926;

      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

      uint fibonacciHash(uint x) {
        const uint FIB_HASH = 2654435769u;
        uint hash = x * FIB_HASH;
        hash ^= hash >> 16;
        hash *= 0x85ebca6bu;
        hash ^= hash >> 13;
        hash *= 0xc2b2ae35u;
        hash ^= hash >> 16;
        return hash;
      }

      float randFibo(vec2 xy) {
        uvec2 xi = floatBitsToUint(xy);
        uint hashed = fibonacciHash(xi.x ^ fibonacciHash(xi.y));
        return float(hashed) / float(0xffffffffu);
      }

      void main() {
        vec2 uv = vUv;
        vec3 mouseRgb = texture(uPingPongTexture, uv).rgb;
        vec3 mouseTrail = rgb2hsv(mouseRgb);
        float strength = mouseTrail.z * (0.5000 * 5.0);
        
        // Defined Color Palette (Purple-ish blue)
        vec3 targetColor = vec3(0.4039, 0.4196, 0.9215);
        vec3 finalColor = strength * mix(mouseRgb, targetColor, 0.5000);
        
        float dither = (randFibo(gl_FragCoord.xy) - 0.5) / 255.0;
        finalColor += dither;
        
        // Output with transparency based on strength
        fragColor = vec4(finalColor, mouseTrail.z * 1.5); // Boost alpha slightly
      }
    `;

		// --- WebGL Helper Functions ---

		function createShader(gl, type, source) {
			const shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error(gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		}

		function createProgram(gl, vertexSource, fragmentSource) {
			const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource);
			const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
			const program = gl.createProgram();
			gl.attachShader(program, vs);
			gl.attachShader(program, fs);
			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				console.error(gl.getProgramInfoLog(program));
				return null;
			}
			return program;
		}

		function createTexture(gl, width, height) {
			const texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			// Use float texture for precision
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA16F,
				width,
				height,
				0,
				gl.RGBA,
				gl.HALF_FLOAT,
				null,
			);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			return texture;
		}

		function createFramebuffer(gl, texture) {
			const fbo = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.TEXTURE_2D,
				texture,
				0,
			);
			return fbo;
		}

		// --- Setup ---

		// Enable extensions
		gl.getExtension("EXT_color_buffer_float");
		gl.getExtension("OES_texture_float_linear");

		const simProgram = createProgram(
			gl,
			vertexShaderSource,
			simFragmentShaderSource,
		);
		const displayProgram = createProgram(
			gl,
			vertexShaderSource,
			displayFragmentShaderSource,
		);

		if (!simProgram || !displayProgram) return;

		// Attributes (Full screen quad)
		const quadBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW,
		);

		// Initial sizing
		let width = canvas.clientWidth;
		let height = canvas.clientHeight;
		canvas.width = width;
		canvas.height = height;

		// Ping-Pong Buffers
		let textureA = createTexture(gl, width, height);
		let textureB = createTexture(gl, width, height);
		let fboA = createFramebuffer(gl, textureA);
		let fboB = createFramebuffer(gl, textureB);

		// Uniform Locations
		const simUniforms = {
			uPingPongTexture: gl.getUniformLocation(simProgram, "uPingPongTexture"),
			uPreviousMousePos: gl.getUniformLocation(simProgram, "uPreviousMousePos"),
			uTime: gl.getUniformLocation(simProgram, "uTime"),
			uMousePos: gl.getUniformLocation(simProgram, "uMousePos"),
			uResolution: gl.getUniformLocation(simProgram, "uResolution"),
		};

		const displayUniforms = {
			uPingPongTexture: gl.getUniformLocation(
				displayProgram,
				"uPingPongTexture",
			),
		};

		// State
		const state = {
			mouseHistory: [], // Stores {x, y, time}
			lastRenderedMouse: [0.5, 0.5], // Track what we sent to shader last frame
			lastInputTime: 0,
			time: 0,
			width: width,
			height: height,
		};

		// Mouse Handler
		function updateMouse(x, y) {
			const now = performance.now();
			// If there's a pause in input, assume it's a new "stroke" and clear old history
			// so we "follow only the last one" (the new gesture)
			if (now - state.lastInputTime > 200) {
				state.mouseHistory = [];
			}
			state.lastInputTime = now;

			// Just record the input with timestamp
			state.mouseHistory.push({
				x: x / state.width,
				y: 1.0 - y / state.height, // WebGL Y is inverted
				time: now,
			});
		}

		const onMouseMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			updateMouse(x, y);
		};

		// Initial mouse pos
		updateMouse(width / 2, height / 2);

		window.addEventListener("mousemove", onMouseMove);

		// Loop
		let animationId;
		let lastTime = performance.now();
		let readTexture = textureA;
		let writeFbo = fboB;
		let writeTexture = textureB;

		function render(time) {
			const dt = (time - lastTime) / 1000;
			lastTime = time;
			state.time += dt;

			// Handle Resize
			if (
				canvas.width !== canvas.clientWidth ||
				canvas.height !== canvas.clientHeight
			) {
				state.width = canvas.clientWidth;
				state.height = canvas.clientHeight;
				canvas.width = state.width;
				canvas.height = state.height;

				// Re-create textures/fbos on resize
				gl.deleteTexture(textureA);
				gl.deleteTexture(textureB);
				gl.deleteFramebuffer(fboA);
				gl.deleteFramebuffer(fboB);

				textureA = createTexture(gl, state.width, state.height);
				textureB = createTexture(gl, state.width, state.height);
				fboA = createFramebuffer(gl, textureA);
				fboB = createFramebuffer(gl, textureB);

				readTexture = textureA;
				writeFbo = fboB;
				writeTexture = textureB;
			}

			gl.viewport(0, 0, state.width, state.height);

			// --- Calculate Delayed Mouse Position ---
			const delay = 500; // 2 seconds delay
			const targetTime = time - delay;

			// Calculate where the mouse WAS at targetTime
			let currentRenderMouse = [...state.lastRenderedMouse];

			if (state.mouseHistory.length > 0) {
				// Find segments surrounding targetTime
				let idx = -1;
				for (let i = 0; i < state.mouseHistory.length; i++) {
					if (state.mouseHistory[i].time >= targetTime) {
						idx = i;
						break;
					}
				}

				if (idx === 0) {
					// Target time is before our recorded history (or very start), use first point
					currentRenderMouse = [
						state.mouseHistory[0].x,
						state.mouseHistory[0].y,
					];
				} else if (idx > 0) {
					// Interpolate between history[idx-1] and history[idx]
					const p1 = state.mouseHistory[idx - 1];
					const p2 = state.mouseHistory[idx];

					// Check for huge time gaps in history itself (redundant if we clear, but safe)
					if (p2.time - p1.time > 200) {
						currentRenderMouse = [p1.x, p1.y];
					} else {
						const t = (targetTime - p1.time) / (p2.time - p1.time);
						currentRenderMouse[0] = p1.x + (p2.x - p1.x) * t;
						currentRenderMouse[1] = p1.y + (p2.y - p1.y) * t;
					}
				} else {
					// idx is -1, meaning all history is older than targetTime (we are lagging behind? or stopped?)
					// This happens if we stopped moving mouse 5 seconds ago. targetTime is Now-2s. History end is Now-5s.
					// So we should be at the last known position.
					const last = state.mouseHistory[state.mouseHistory.length - 1];
					currentRenderMouse = [last.x, last.y];
				}

				// Prune history that is too old (older than delay + small buffer)
				// Keep at least one point
				if (
					state.mouseHistory.length > 2 &&
					state.mouseHistory[1].time < targetTime
				) {
					state.mouseHistory.shift();
				}
			}

			// Zero out trail if we jumped distance (e.g. from history clear)
			const distSq =
				Math.pow(currentRenderMouse[0] - state.lastRenderedMouse[0], 2) +
				Math.pow(currentRenderMouse[1] - state.lastRenderedMouse[1], 2);

			let prevPosForShader = state.lastRenderedMouse;
			if (distSq > 0.05) {
				// Threshold for jump
				prevPosForShader = currentRenderMouse;
			}

			// --- Step 1: Simulation (Ping Pong) ---
			gl.useProgram(simProgram);

			// Bind Quad
			gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
			const positionLoc = gl.getAttribLocation(simProgram, "aPosition");
			gl.enableVertexAttribArray(positionLoc);
			gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

			// Bind Read Texture
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, readTexture);
			gl.uniform1i(simUniforms.uPingPongTexture, 0);

			// Update Uniforms
			gl.uniform2f(
				simUniforms.uPreviousMousePos,
				prevPosForShader[0],
				prevPosForShader[1],
			);
			gl.uniform2f(
				simUniforms.uMousePos,
				currentRenderMouse[0],
				currentRenderMouse[1],
			);

			gl.uniform1f(simUniforms.uTime, state.time);
			gl.uniform2f(simUniforms.uResolution, state.width, state.height);

			// Draw to Write FBO
			gl.bindFramebuffer(gl.FRAMEBUFFER, writeFbo);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			// --- Step 2: Display ---
			gl.bindFramebuffer(gl.FRAMEBUFFER, null); // Draw to screen
			gl.useProgram(displayProgram);

			// Bind Quad
			const dispPositionLoc = gl.getAttribLocation(displayProgram, "aPosition");
			gl.enableVertexAttribArray(dispPositionLoc);
			gl.vertexAttribPointer(dispPositionLoc, 2, gl.FLOAT, false, 0, 0);

			// Bind "Write" Texture for display
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, writeTexture);
			gl.uniform1i(displayUniforms.uPingPongTexture, 0);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			// --- Swap ---
			const tempTex = readTexture;
			readTexture = writeTexture;
			writeTexture = tempTex;

			const tempFbo = writeFbo;
			writeFbo = writeFbo === fboB ? fboA : fboB;

			// Update last rendered mouse
			state.lastRenderedMouse = currentRenderMouse;

			animationId = requestAnimationFrame(render);
		}

		render(performance.now());

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(animationId);
			// Clean up WebGL resources if needed
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				zIndex: -1,
			}}
		/>
	);
};

export default SmokeEffect;
