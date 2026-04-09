import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const AppContentHeader = ({
  title,
  subtitle,
  buttonText,
  icon,
  onButtonClick,
  path,
  showButton = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }

    if (path) {
      navigate(path);
    }
  };

  // ✅ Button should only render if it has content or behavior
  const shouldRenderButton =
    showButton && (buttonText || icon || path || onButtonClick);

  return (
    <div
      className="flex justify-between items-center"
      style={{ fontFamily: "'Lexend Exa', sans-serif" }}
    >
      {/* Left Content */}
      <div className="txt">
        {title && (
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-[#A1A1A1] text-lg md:text-xl font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Content (Button) */}
      {shouldRenderButton && (
        <div className="mt-6 md:mt-0">
          <button className="save" onClick={handleClick}>
            {icon && <img src={icon} alt="icon" />}

            {buttonText && (
              <span className="text-white text-xl font-semibold">
                {buttonText}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppContentHeader;