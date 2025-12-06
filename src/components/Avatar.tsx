import React from 'react';

interface Props {
  thumbnail?: string | null;
  size?: 'small' | 'normal';
  highlight?: boolean;
}

function Avatar({ thumbnail, size = 'normal', highlight = false }: Props) {
  if (!thumbnail) {
    return <div>no thumbnail</div>;
  }

  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(size)}`}
        src={thumbnail}
        alt="user thumbnail"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

const getContainerStyle = (size: 'small' | 'normal', highlight: boolean) => {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getImageSizeStyle = (size: 'small' | 'normal') => {
  const sizeStyle =
    size === 'small' ? 'w-[34px] h-[34px] p-[0.1rem]' : 'w-16 h-16 p-[0.2rem]';

  return sizeStyle;
};

export default Avatar;
