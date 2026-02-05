import React from 'react'
import styles from './pricingModal.module.scss';
import ChoosePerfectAccount from '../../rendering/homePage/choosePerfectAccount';
import { X } from 'lucide-react';
export default function PricingModal() {
    return (
        <div className={styles.pricingModalWrapper}>
            <div className={styles.modal}>
                <X className={styles.closeIcon} />
                <ChoosePerfectAccount titleSpace bottomSpaceRemoveCard />
            </div>
        </div>
    )
}
