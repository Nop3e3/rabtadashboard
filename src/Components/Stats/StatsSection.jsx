// src/components/StatsSection/StatsSection.jsx
import React from "react";
import StatsCard from "../Stats/Statscard";
import styles from "./StatsCard.module.css";

import userIcon from "../../Assets/yellow community.svg";
import supplierIcon from "../../Assets/ysuppliers.svg";
import courseIcon from "../../Assets/ylearning.svg";
import revenueIcon from "../../Assets/y graph.svg";

const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: "5,300",
    trendPercentage: 12.5,
    trendDirection: "positive",
    icon: userIcon,
  },
  {
    id: 2,
    title: "Active Suppliers",
    value: "510",
    trendPercentage: 8.2,
    trendDirection: "positive",
    icon: supplierIcon,
  },
  {
    id: 3,
    title: "Courses Completed",
    value: "1,700",
    trendPercentage: 15.3,
    trendDirection: "positive",
    icon: courseIcon,
  },
  {
    id: 4,
    title: "Monthly Revenue",
    value: "$45.2K",
    trendPercentage: 23.1,
    trendDirection: "positive",
    icon: revenueIcon,
  },
];

const StatsSection = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.sectionInnerContainer}>
        {statsData.map((stat) => (
          <div key={stat.id} className={styles.cardWrapper}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;