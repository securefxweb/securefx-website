"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
const ArrowIcon = "/assets/icons/arrow.svg";
const LoginIcon = "/assets/icons/login.svg";
const Logo = "/assets/logo/logo.svg";
import UpIcon from "../../icons/upIcon";
export default function Header() {
  const pathname = usePathname();
  const [logindropdown, setLogindropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [tradingPlatformOpen, setTradingPlatformOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [tradeDropdownOpen, setTradeDropdownOpen] = useState(false);
  const [accountsDropdownOpen, setAccountsDropdownOpen] = useState(false);
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false);

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setLogindropdown(false);
    setAboutDropdownOpen(false);
    setTradeDropdownOpen(false);
    setAccountsDropdownOpen(false);
    setPartnerDropdownOpen(false);
    setProductsOpen(false);
    setTradingPlatformOpen(false);
  };

  // Normalize pathname by removing trailing slash for comparison
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  return (
    <div
      className={classNames(styles.headerSticky, {
        // [styles.ibRoute]: pathname.startsWith("/ib"),
      })}
    >
      <header className={classNames(styles.header)}>
        <div className={styles.buttonAlignment}>
          <div className={styles.buttonUi}>
            <div className={styles.layer}></div>
            <div className={styles.layer2}></div>
            <span>Try Demo</span>
            <img src={ArrowIcon} alt="ArrowIcon" />
          </div>
        </div>
        <div className={styles.loginButton}>
          <div
            className={styles.loginbuttonUi}
            onClick={() => setLogindropdown(!logindropdown)}
          >
            <div className={styles.layer}></div>
            <div className={styles.layer2}></div>
            <span>Log In</span>
            <img
              className={classNames(logindropdown ? styles.rotate : "")}
              src={LoginIcon}
              alt="LoginIcon"
            />
          </div>
          <div
            className={classNames(
              styles.logindropdown,
              logindropdown ? styles.show : styles.hide,
            )}
          >
            <div className={styles.design}>
              <a>User Login</a>
              <a>IB Login</a>
              <a>Affiliate Login</a>
              <a>Mt4/Mt5</a>
            </div>
          </div>
        </div>
        <div className={styles.headerAlignment}>
          <div
            className={styles.spacing}
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <Link href="/about">About</Link>
            <div
              className={classNames(
                styles.dropdown,
                aboutDropdownOpen && styles.dropdownOpen,
              )}
            >
              <div className={styles.dropdownDesign}>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/about" && styles.active,
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Why Securefx
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/regulations" && styles.active,
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/regulations"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Regulation
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/legal-doc" && styles.active,
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/legal-doc"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Legal Documents
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/sec-fund" && styles.active,
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/sec-fund"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Security of funds
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.spacing}
            onMouseEnter={() => setTradeDropdownOpen(true)}
            onMouseLeave={() => setTradeDropdownOpen(false)}
          >
            <Link className={styles.spacing} href="/forex">
              Trade
            </Link>
            <div
              className={classNames(
                styles.dropdown,
                styles.dropdownStyling,
                tradeDropdownOpen && styles.dropdownOpen,
              )}
            >
              <div className={styles.dropdownDesign}>
                <div
                  className={styles.subheaderAlignment}
                  onClick={() => setProductsOpen(!productsOpen)}
                >
                  <div className={styles.style}>
                    <div className={styles.dot}></div>
                    <span>Products</span>
                  </div>
                  <div className={styles.icon}>
                    {productsOpen ? (
                      <ChevronDown size={16} color="#fff" />
                    ) : (
                      <ChevronUp size={16} color="#fff" />
                    )}
                  </div>
                </div>
                <div
                  className={classNames(
                    styles.sublistStyle,
                    productsOpen ? styles.show : styles.hide,
                  )}
                >
                  <Link
                    className={
                      normalizedPathname === "/forex"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/forex"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Forex
                  </Link>
                  <Link
                    className={
                      normalizedPathname === "/metals"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/metals"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Metal
                  </Link>
                  <Link
                    className={
                      normalizedPathname === "/indices"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/indices"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Indices
                  </Link>
                  <Link
                    className={
                      normalizedPathname === "/energy"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/energy"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Energy
                  </Link>
                  <Link
                    className={
                      normalizedPathname === "/commodities"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/commodities"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Commodities
                  </Link>
                </div>
                <div
                  className={styles.subheaderAlignment}
                  onClick={() => setTradingPlatformOpen(!tradingPlatformOpen)}
                >
                  <div className={styles.style}>
                    <div className={styles.dot}></div>
                    <span>Trading Platform</span>
                  </div>
                  <div className={styles.icon}>
                    {tradingPlatformOpen ? (
                      <ChevronDown size={16} color="#fff" />
                    ) : (
                      <ChevronUp size={16} color="#fff" />
                    )}
                  </div>
                </div>
                <div
                  className={classNames(
                    styles.sublistStyle,
                    tradingPlatformOpen ? styles.show : styles.hide,
                  )}
                >
                  <Link
                    className={
                      normalizedPathname === "/trading-platform"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/trading-platform"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Mt4/Mt5 Mobile
                  </Link>
                  <Link
                    className={
                      normalizedPathname === "/trading-platform"
                        ? styles.activeSublink
                        : ""
                    }
                    href="/trading-platform"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Mt4/Mt5 Web
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/calendar" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/calendar"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Economic Calendar
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/precise-calculations"
                      ? styles.active
                      : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/precise-calculations"
                    onClick={() => setTradeDropdownOpen(false)}
                  >
                    Calculators
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.spacing}
            onMouseEnter={() => setAccountsDropdownOpen(true)}
            onMouseLeave={() => setAccountsDropdownOpen(false)}
          >
            <Link className={styles.spacing} href="/standard-account">
              Accounts
            </Link>
            <div
              className={classNames(
                styles.dropdown,
                accountsDropdownOpen && styles.dropdownOpen,
              )}
            >
              <div className={styles.dropdownDesign}>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/standard-account"
                      ? styles.active
                      : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/standard-account"
                    onClick={() => setAccountsDropdownOpen(false)}
                  >
                    Standard
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/pro-account" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/pro-account"
                    onClick={() => setAccountsDropdownOpen(false)}
                  >
                    Pro
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/raw-account" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/raw-account"
                    onClick={() => setAccountsDropdownOpen(false)}
                  >
                    RAW
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/zero-spread-account"
                      ? styles.active
                      : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/zero-spread-account"
                    onClick={() => setAccountsDropdownOpen(false)}
                  >
                    ZERO Spread
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/deposit" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/deposit"
                    onClick={() => setAccountsDropdownOpen(false)}
                  >
                    Deposite/Withdraw
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div
            className={styles.spacing}
            onMouseEnter={() => setPartnerDropdownOpen(true)}
            onMouseLeave={() => setPartnerDropdownOpen(false)}
          >
            <Link className={styles.spacing} href="/ib">
              Partner
            </Link>
            <div
              className={classNames(
                styles.dropdown,
                partnerDropdownOpen && styles.dropdownOpen,
              )}
            >
              <div className={styles.dropdownDesign}>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/ib" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/ib"
                    onClick={() => setPartnerDropdownOpen(false)}
                  >
                    IB
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.style,
                    normalizedPathname === "/affiliate" ? styles.active : "",
                  )}
                >
                  <div className={styles.dot}></div>
                  <Link
                    href="/affiliate"
                    onClick={() => setPartnerDropdownOpen(false)}
                  >
                    Affiliate
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="#">Tools</Link>
          <Link href="/contact-us">Support</Link>
          {/* <Link href={"#"}>EN</Link> */}
        </div>
      </header>
    </div>
  );
}
