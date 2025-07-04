"use client";
import { useState } from 'react';

type SwitchProps = {
  onToggle: (isNormal: boolean) => void;
  themeColor: 'normal' | 'protecao';
};

export function Switch({ onToggle, themeColor }: SwitchProps) {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState);
  };

  const focusColor = themeColor === 'normal' ? 'focus:ring-emerald-500' : 'focus:ring-orange-500';

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-rgb))]
                    ${isToggled ? 'bg-emerald-600' : 'bg-orange-500'}
                    ${focusColor}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                      ${isToggled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
      <p className="text-sm font-semibold">
        {isToggled ? 'Normal' : 'Proteção'}
      </p>
    </div>
  );
}