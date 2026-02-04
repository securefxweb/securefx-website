"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./productBanner.module.scss";
import Button from "@/components/button";
import classNames from "classnames";

export default function ProductBanner({ productLinks, productData }) {
  const pathname = usePathname();

  // Normalize pathname by removing trailing slash for comparison
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={styles.productBanner}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="container-lg">
        <motion.div className={styles.tabAlignment} variants={container}>
          {productLinks?.map((itemData, index) => (
            <Fragment key={index}>
              <motion.div variants={item}>
                <Link href={itemData.link}>
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={classNames(
                      styles.buttonUi,
                      normalizedPathname === itemData.link ? styles.active : "",
                    )}
                  >
                    {itemData.name}
                  </motion.div>
                </Link>
              </motion.div>

              {index < productLinks.length - 1 && (
                <motion.div
                  className={styles.line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>

      <div className={styles.leftAlignment}>
        <div className={styles.grid}>
          <motion.div className={styles.griditems} variants={container}>
            <motion.div className={styles.title} variants={item}>
              <h1>{productData?.title}</h1>
            </motion.div>

            <motion.div className={styles.subgrid} variants={container}>
              {productData?.cards?.map((card, index) => (
                <motion.div
                  key={index}
                  className={styles.detailsBox}
                  variants={item}
                >
                  <h4>{card.label}</h4>
                  <p>{card.content}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className={styles.text} variants={item}>
              <p>{productData?.description}</p>
            </motion.div>

            <motion.div variants={item} className={styles.mobileHide}>
              <Button text="Start Trading" />
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.image}
            variants={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src={productData?.image} alt="ProductImage" />
          </motion.div>
          <motion.div variants={item} className={styles.mobileshow}>
            <Button text="Start Trading" className={styles.buttonWidth} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
