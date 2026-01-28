'use client';
import React, { useState, useEffect } from "react";
import styles from "./mobileViewForm.module.scss";
import DemoAccountForm from "../worldsTrustedForm/demoAccountForm";
import classNames from "classnames";
const BlueLine = "/assets/images/blue-line.svg";

const steps = [
  {
    title: "Globally Licensed and Compliant",
    desc: "Operating with integrity across regulated jurisdictions to ensure every trade meets the highest level of investor protection.",
  },
  {
    title: "Transparency, Trust, and Security",
    desc: "Your funds and data are safeguarded by global compliance protocols and secure financial frameworks",
  },
  {
    title: "0% Commission with Ultra-tight Spreads",
    desc: "Trade more efficiently, keep your profits without hidden costs or inflated pricing.",
  },
  {
    title: "Instant Deposits and Fast Withdrawals",
    desc: "Experience real-time fund movement designed for modern traders who value speed and reliability",
  },
  {
    title: "24/5 Expert Support for Seamless Trading",
    desc: "Our multilingual team stands ready around the clock to assist, guide, and resolve, wherever you trade.",
  },
];
export default function MobileViewForm({ spaceremove , allSpaceRemove }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
      }
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
      }
    }
    setIsDragging(false);
  };

  return (
    <div className={classNames(styles.mobileViewForm, spaceremove ? styles.spaceRemove : "" , allSpaceRemove ? styles.allSpaceRemove : "")}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.contentAlignment}
          style={{ transform: `translateX(-${currentIndex * (275 + 20)}px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {steps.map((step, index) => (
            <div key={index} className={styles.items}>
              <h2>{step.title}</h2>
              <img src={BlueLine} alt="BlueLine" />
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.formContainer}>
        <DemoAccountForm />
      </div>
    </div>
  );
}
