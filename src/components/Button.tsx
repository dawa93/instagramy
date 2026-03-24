'use client';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  red?: boolean;
}

function Button({
  text,
  onClick,
  red,
  type = 'button',
  disabled = false,
  ...rest
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${red ? 'bg-red-500' : 'bg-blue-500'} ${disabled && 'opacity-80'}`}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
