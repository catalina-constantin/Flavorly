import React from "react";

function SocialIconButton({ url, ariaLabel, children, className }) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default SocialIconButton;
