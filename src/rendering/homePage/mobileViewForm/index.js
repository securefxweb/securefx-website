import React from 'react'
import styles from './mobileViewForm.module.scss';
const BlueLine = '/assets/images/blue-line.svg';
export default function MobileViewForm() {
    return (
        <div className={styles.mobileViewForm}>
            <div className={styles.contentAlignment}>
                {
                    [...Array(5)].map(() => {
                        return (
                            <div className={styles.items}>
                                <h2>
                                    Globally licensed and compliant
                                </h2>
                                <img src={BlueLine} alt='BlueLine' />
                                <p>
                                    Operating with integrity across regulated jurisdictions
                                    to ensure every trade meets the highest level of investor protection.
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
