// src/components/StatsCard/StatsCard.jsx
import React from 'react';
import styles from './StatsCard.module.css';

/**
 * Reusable Stats Card Component
 * @param {string} title - The main descriptive title (e.g., "Total Users")
 * @param {string|number} value - The primary numerical or textual value (e.g., "5,300")
 * @param {number} [trendPercentage] - Optional percentage change value (e.g., 12.5)
 * @param {('positive'|'negative')} [trendDirection] - Optional direction of the trend
 * @param {string|React.ReactNode} [icon] - A URL string or React element for the icon
 * @param {string} [additionalText] - Optional extra text for detail
 */
const StatsCard = ({
  title,
  value,
  trendPercentage,
  trendDirection = 'positive',
  icon,              // ✅ FIX 1: was "Icon" (uppercase) — never matched the passed prop
  additionalText,
}) => {
  const isPositiveTrend = trendDirection === 'positive';

  const formattedTrendText = trendPercentage !== undefined
    ? `${isPositiveTrend ? '↑' : '↓'} ${Math.abs(trendPercentage).toFixed(1)}%`
    : '';

  return (
    <div className={styles.cardContainer}>
      <div className={styles.topRow}>
        <div className={styles.textStack}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.mainValueContainer}>
            <p className={styles.value}>{value}</p>
            {additionalText && (
              <span className={styles.additionalText}>{additionalText}</span>
            )}
          </div>
        </div>

        {icon && (
          <div className={styles.iconContainer}>
            {/* ✅ FIX 2: was React.isValidElement check only — SVG URLs are strings, not elements */}
            {React.isValidElement(icon)
              ? icon
              : <img src={icon} alt={title} width={40} height={40} />}
          </div>
        )}
      </div>

      {trendPercentage !== undefined && (
        <div
          className={`${styles.trendContainer} ${
            isPositiveTrend ? styles.positiveTrend : styles.negativeTrend
          }`}
        >
          {formattedTrendText}
        </div>
      )}
    </div>
  );
};

export default StatsCard;