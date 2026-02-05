"use client";
import React, { useState } from "react";
import styles from "./preciseCalculationsData.module.scss";
import classNames from "classnames";
import Pipvaluecalculator from "../pipvaluecalculator";
import Forexmargincalculator from "../forexmargincalculator";
import Fibonaccicalculator from "../fibonaccicalculator";
import PivotPointCalculator from "../pivotPointCalculator";
import ProfitCalculator from "../profitCalculator";
import PositionSizeCalculator from "../positionSizeCalculator";

export default function PreciseCalculationsData() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["PIP", "Margin", "Fibonacci", "Pivot", "Profit","Position Size"	];
  const components = [
    <Pipvaluecalculator />,
    <Forexmargincalculator />,
    <Fibonaccicalculator />,
    <PivotPointCalculator />,
    <ProfitCalculator />,
	<PositionSizeCalculator/> 
  ];

  return (
    <div className={styles.preciseCalculationsData}>
      <div className="container-lg">
        <div className={styles.tabAlignment}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={classNames(styles.buttonUi, {
                [styles.active]: activeTab === index,
              })}
              onClick={() => setActiveTab(index)}
            >
              <span>{tab}</span>
            </div>
          ))}
        </div>
        <div className={styles.boxCenter}>
          <div className={styles.box}>{components[activeTab]}</div>
        </div>
      </div>
    </div>
  );
}
