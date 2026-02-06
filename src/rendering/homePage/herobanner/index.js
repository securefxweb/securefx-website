"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./herobanner.module.scss";

export default function Herobanner() {
  const wrapperRef = useRef(null);

  const texts = [
    "You’ve done",
    "The Research,",
    "Trusted Your Instincts,",
    "And Arrived Here,",
    "where smart traders turn",
    "insight into opportunity with SecureFX",
  ];
  const [layout, setLayout] = useState({
    SECTION_HEIGHT: 70,
    MAX_TRANSLATE: 54,
    MIN_TRANSLATE: -350,
  });

  /* -----------------------------
   Responsive layout values
  ----------------------------- */
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setLayout({
          SECTION_HEIGHT: 55,
          MAX_TRANSLATE: 75,
          MIN_TRANSLATE: -160,
        });
      } else if (width < 1024) {
        setLayout({
          SECTION_HEIGHT: 60,
          MAX_TRANSLATE: 55,
          MIN_TRANSLATE: -360,
        });
      } else {
        setLayout({
          SECTION_HEIGHT: 70,
          MAX_TRANSLATE: 54,
          MIN_TRANSLATE: -420,
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const { SECTION_HEIGHT, MAX_TRANSLATE, MIN_TRANSLATE } = layout;

  /* -----------------------------
   Scroll logic
  ----------------------------- */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const targetIndex = useRef(0);
  const [smoothIndex, setSmoothIndex] = useState(0);

  useEffect(() => {
    let current = 0;
    const animate = () => {
      current += (targetIndex.current - current) * 0.14;
      setSmoothIndex(current);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    targetIndex.current = v * (texts.length - 1);
  });

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.height = `${texts.length * SECTION_HEIGHT}vh`;
    }
  }, [SECTION_HEIGHT, texts.length]);

  /* -----------------------------
   Text translate
  ----------------------------- */
  const totalTranslate =
    MAX_TRANSLATE -
    (MAX_TRANSLATE - MIN_TRANSLATE) * (smoothIndex / (texts.length - 1));

  /* -----------------------------
   Image scale (KEY PART)
   No layout change, only transform
  ----------------------------- */
  const imageScale = 1 + (smoothIndex / (texts.length - 1)) * 0.15; // 1 → 1.15

  return (
    <div className={styles.mainWrapper} ref={wrapperRef}>
      <div className={styles.heroInner}>
        {/* TEXT BLOCK */}
        <div className={styles.textBlockmain}>
          <div
            className={styles.textBlock}
            style={{
              transform: `translateY(${totalTranslate}px)`,
            }}
          >
            {texts.map((txt, i) => {
              const distance = i - smoothIndex;

              let opacity = 0.18;
              if (Math.abs(distance) < 0.35) opacity = 1;
              else if (Math.abs(distance) < 1) opacity = 0.55;

              let blur = 0;
              if (Math.abs(distance) > 0.35) {
                blur = Math.min(Math.abs(distance) * 5, 12);
              }

              return (
                <h2
                  key={i}
                  className={styles.line}
                  style={{
                    opacity,
                    filter: `blur(${blur}px)`,
                    transition: "opacity 0.35s ease, filter 0.35s ease",
                  }}
                >
                  {txt}
                </h2>
              );
            })}
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <div className={styles.imageWrapper}>
          <img
            src="/hero-img.png"
            alt="Hero"
            style={{
              transform: `scale(${imageScale})`,
              transition: "transform 0.25s ease-out",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
