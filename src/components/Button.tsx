'use client';

import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
}

function Button({ text, onClick, red, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${red ? 'bg-red-500' : 'bg-blue-500'} ${disabled && 'opacity-80'}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
