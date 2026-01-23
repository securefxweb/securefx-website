"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import styles from "./worldsTrustedForm.module.scss";
import classNames from "classnames";
import DemoAccountForm from "./demoAccountForm";
import AffiliateForm from "./affiliateForm";

function AnimatedWords({ text }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{
            opacity: 1,
            display: "inline-block",
            marginRight: "4px",
            whiteSpace: "pre-wrap",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function WorldsTrustedForm({
  leftSteps = [
    {
      title: "Globally Licensed and Compliant",
      desc: "Operating with integrity across regulated jurisdictions to ensure every trade meets the highest level of investor protection.",
    },
    {
      title: "Transparency, Trust, and Security",
      desc: "Your funds and data are safeguarded by global compliance protocols and secure financial frameworks",
    },
  ],
  rightSteps = [
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
  ],
  form,
}) {
  const sectionRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const totalSteps = Math.max(leftSteps.length, rightSteps.length) * 2;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate the exact scroll position for each step's "hold" phase
  const getStepHoldPosition = useCallback(
    (stepIndex) => {
      // Each step has 3 phases: entry (0-0.4), hold (0.4-0.7), exit (0.7-1)
      // We want to stop at the MIDDLE of the hold phase (0.55)
      const holdProgress = 0.55; // Middle of hold phase

      // Calculate the overall progress for this step
      const stepStart = stepIndex / totalSteps;
      const stepEnd = (stepIndex + 1) / totalSteps;
      const stepWidth = stepEnd - stepStart;

      // Position at 55% of this step (middle of hold phase)
      const targetProgress = stepStart + stepWidth * holdProgress;

      return targetProgress;
    },
    [totalSteps],
  );

  // Scroll to a specific step's hold position
  const scrollToStep = useCallback(
    (stepIndex) => {
      if (!sectionRef.current || isUserScrolling) return;

      const targetProgress = getStepHoldPosition(stepIndex);

      // Calculate exact scroll position
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const targetScrollY = sectionTop + sectionHeight * targetProgress;

      // Get current position
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      // Only scroll if we're close to the section
      if (Math.abs(currentScrollY - sectionTop) < window.innerHeight * 2) {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }
    },
    [getStepHoldPosition, isUserScrolling],
  );

  // Auto-scroll to next step
  const autoScrollToNextStep = useCallback(() => {
    if (!isInView || isUserScrolling) return;

    const currentProgress = scrollYProgress.get();

    // Find current step based on progress
    const currentStep = Math.floor(currentProgress * totalSteps);

    // Find the target hold position for current step
    const currentHoldPosition = getStepHoldPosition(currentStep);

    // If we're close to the current step's hold position, go to next step
    if (Math.abs(currentProgress - currentHoldPosition) < 0.05) {
      const nextStep = (currentStep + 1) % totalSteps;
      scrollToStep(nextStep);
    } else {
      // Otherwise, scroll to current step's hold position
      scrollToStep(currentStep);
    }
  }, [
    isInView,
    isUserScrolling,
    scrollYProgress,
    totalSteps,
    getStepHoldPosition,
    scrollToStep,
  ]);

  // Handle scroll events
  useEffect(() => {
    let scrollTimer = null;

    const handleScroll = () => {
      setIsUserScrolling(true);

      // Clear existing timeouts
      if (scrollTimer) clearTimeout(scrollTimer);
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);

      // Set timer to detect when scrolling stops
      scrollTimer = setTimeout(() => {
        setIsUserScrolling(false);

        // Start auto-scroll after user stops
        if (isInView) {
          autoScrollRef.current = setTimeout(() => {
            autoScrollToNextStep();
          }, 1000); // Wait 1 second after scrolling stops
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial auto-scroll
    if (isInView) {
      autoScrollRef.current = setTimeout(() => {
        autoScrollToNextStep();
      }, 2000);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    };
  }, [isInView, autoScrollToNextStep]);

  // Continuous auto-scroll loop
  useEffect(() => {
    if (!isInView || isUserScrolling) return;

    const startAutoScrollLoop = () => {
      autoScrollRef.current = setTimeout(() => {
        autoScrollToNextStep();
        startAutoScrollLoop(); // Continue the loop
      }, 3000); // 3 seconds between auto-scrolls
    };

    if (!isUserScrolling) {
      startAutoScrollLoop();
    }

    return () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
    };
  }, [isInView, isUserScrolling, autoScrollToNextStep]);

  const makeZigzagTransform = (globalIndex, side, isLastRight) => {
    const start = globalIndex / totalSteps;
    const end = (globalIndex + 1) / totalSteps;

    const breakY = side === "left" ? 0 : -210;
    const maxY = side === "left" ? 460 : 360;
    const slideY = side === "left" ? -360 : isLastRight ? -210 : -460;

    const rawY = useMotionValue(maxY);
    const rawOpacity = useMotionValue(0);

    const y = useSpring(rawY, {
      stiffness: 100,
      damping: 30,
      mass: 1,
    });

    const opacity = useSpring(rawOpacity, {
      stiffness: 120,
      damping: 25,
      mass: 0.5,
    });

    useEffect(() => {
      const unsub = scrollYProgress.on("change", (v) => {
        let targetY = maxY;
        let targetOpacity = 0;

        if (v < start) {
          targetY = maxY;
          targetOpacity = 0;
        } else if (v >= end) {
          targetY = slideY;
          targetOpacity = 1;
        } else {
          const sectionProgress = (v - start) / (end - start);

          if (sectionProgress < 0.4) {
            const entryProgress = sectionProgress / 0.4;
            const eased = 1 - Math.pow(1 - entryProgress, 3);
            targetY = maxY + (breakY - maxY) * eased;
            targetOpacity = eased;
          } else if (sectionProgress >= 0.4 && sectionProgress < 0.7) {
            targetY = breakY;
            targetOpacity = 1;
          } else {
            const exitProgress = (sectionProgress - 0.7) / 0.3;
            const eased = Math.pow(exitProgress, 2);
            targetY = breakY + (slideY - breakY) * eased;
            targetOpacity = 1;
          }
        }

        rawY.set(targetY);
        rawOpacity.set(targetOpacity);
      });

      return () => unsub();
    }, [scrollYProgress, start, end, maxY, breakY, slideY]);

    return { y, opacity };
  };

  return (
    <motion.div
      ref={sectionRef}
      className={styles.formAnimationWrapper}
      style={{ height: `${totalSteps * 100}vh` }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.sticky}>
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* LEFT COLUMN */}
          <div className={styles.text}>
            {leftSteps.map((step, i) => {
              const globalIndex = i * 2;
              const { y, opacity } = makeZigzagTransform(globalIndex, "left");

              return (
                <motion.div
                  key={i}
                  className={styles.stepItem}
                  style={{ y, opacity }}
                >
                  <h2>
                    <AnimatedWords text={step.title} />
                  </h2>
                  <div className={styles.lineAnimation}>
                    <motion.svg
                      width="269"
                      height="1"
                      viewBox="0 0 269 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M0 0.5H269"
                        stroke="url(#paint0_linear_40_761)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                        }}
                      />

                      <defs>
                        <linearGradient
                          id="paint0_linear_40_761"
                          x1="0"
                          y1="1"
                          x2="269"
                          y2="1"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F95C2F" />
                          <stop
                            offset="1"
                            stopColor="#F95C2F"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                  <p>
                    <AnimatedWords text={step.desc} />
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER FORM */}
          <motion.div
            className={styles.box}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            {form === "demoAccountform" && (
              <div className={styles.tab}>
                <div
                  className={classNames(styles.buttonUi, styles.activeButton)}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <div className={styles.layer}></div>
                  <div className={styles.layer2}></div>
                  <span>Try demo A/C</span>
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {form === "demoAccountform" && <DemoAccountForm />}
              {form === "affliateForm" && <AffiliateForm />}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className={classNames(styles.text, styles.textbottomAlignment)}>
            {rightSteps.map((step, i) => {
              const globalIndex = i * 2 + 1;
              const isLast = i === rightSteps.length - 1;

              const { y, opacity } = makeZigzagTransform(
                globalIndex,
                "right",
                isLast,
              );

              return (
                <motion.div
                  key={i}
                  className={styles.stepItemRight}
                  style={{ y, opacity }}
                >
                  <h2>
                    <AnimatedWords text={step.title} />
                  </h2>
                  <div className={styles.lineAnimation}>
                    <motion.svg
                      width="269"
                      height="1"
                      viewBox="0 0 269 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M0 0.5H269"
                        stroke="url(#paint0_linear_40_761)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                        }}
                      />

                      <defs>
                        <linearGradient
                          id="paint0_linear_40_761"
                          x1="0"
                          y1="1"
                          x2="269"
                          y2="1"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F95C2F" />
                          <stop
                            offset="1"
                            stopColor="#F95C2F"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                  <p>
                    <AnimatedWords text={step.desc} />
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
