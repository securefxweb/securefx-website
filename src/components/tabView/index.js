"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./tabView.module.scss";
import { accountsDataLinks } from "@/constants/data";

export default function TabView() {
  const pathname = usePathname();

  // Normalize pathname by removing trailing slash for comparison
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  return (
    <div className={styles.tabViewAlignment}>
      <div className={styles.tabAlignment}>
        {accountsDataLinks.map((item, index) => {
          // Normalize item link as well
          const normalizedLink =
            item.link.endsWith("/") && item.link !== "/"
              ? item.link.slice(0, -1)
              : item.link;

          const isActive = normalizedPathname === normalizedLink;

          return (
            <React.Fragment key={item.id}>
              <Link href={item.link}>
                <div
                  className={`${styles.buttonUi} ${isActive ? styles.active : ""}`}
                >
                  {item.name}
                </div>
              </Link>
              {index < accountsDataLinks.length - 1 && (
                <div className={styles.line}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
