import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

function Button({ canClick, loading, actionText }: IButtonProps) {
  return (
    <button
      disabled={!canClick}
      className="loginBtn disabled:bg-gray-400 disabled:cursor-default"
    >
      <span>{loading ? "Loging in..." : actionText}</span>
    </button>
  );
}

export default Button;
