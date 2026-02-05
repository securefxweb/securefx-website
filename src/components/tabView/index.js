import React from 'react'
import styles from './tabView.module.scss';
export default function TabView() {
    return (
        <div className={styles.tabViewAlignment}>
            <div className={styles.tabAlignment}>
                <div className={styles.buttonUi}>
                    Standard
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttonUi}>
                    Standard
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttonUi}>
                    Standard
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttonUi}>
                    Standard
                </div>
            </div>
        </div>
    )
}
