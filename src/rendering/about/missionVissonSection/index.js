"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./missionVissonSection.module.scss";

export default function MissionVissonSection({ data }) {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let scrollTimeout = null;
    let wheelCount = 0;

    const handleWheel = (e) => {
      // Only handle wheel events when section is in view
      if (!isInView) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Increment wheel count
      wheelCount++;

      // Require multiple wheel events to trigger slide change (prevents instant triggering)
      const requiredWheelEvents = 2;

      if (wheelCount >= requiredWheelEvents && !isTransitioning) {
        if (scrollingDown) {
          // Scrolling down
          if (currentSlide < data.length - 1) {
            e.preventDefault();
            e.stopPropagation();
            setIsTransitioning(true);
            setCurrentSlide((prev) => prev + 1);
            wheelCount = 0;
            setTimeout(() => setIsTransitioning(false), 800);
          } else {
            // Last slide - allow natural scroll to next section
            wheelCount = 0;
          }
        } else if (scrollingUp) {
          // Scrolling up
          if (currentSlide > 0) {
            e.preventDefault();
            e.stopPropagation();
            setIsTransitioning(true);
            setCurrentSlide((prev) => prev - 1);
            wheelCount = 0;
            setTimeout(() => setIsTransitioning(false), 800);
          } else {
            // First slide - allow natural scroll to previous section
            wheelCount = 0;
          }
        }
      }

      // Reset wheel count after a delay
      scrollTimeout = setTimeout(() => {
        wheelCount = 0;
      }, 150);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            section.addEventListener("wheel", handleWheel, { passive: false });
          } else {
            setIsInView(false);
            section.removeEventListener("wheel", handleWheel);
            wheelCount = 0;
            // Don't reset slide when leaving - keep current position
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      section.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentSlide, data.length, isTransitioning, isInView]);

  return (
    <div className={styles.missionVissonSection} id="mission" ref={sectionRef}>
      <div className={styles.desktopSlider}>
        <div className={styles.sliderContainer}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.slide} ${
                  currentSlide === index ? styles.active : ""
                }`}
              >
                <div className={styles.iconCenter}>
                  <img src={item.image} alt={item.title} />
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicators */}
        <div className={styles.indicators}>
          {data.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                currentSlide === index ? styles.indicatorActive : ""
              }`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsTransitioning(false), 800);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.mobileShow}>
        {data.map((item) => (
          <div key={item.id}>
            <div className={styles.iconCenter}>
              <img src={item.image} alt={item.title} />
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
