type AvatarSize = 'small' | 'large' | 'medium';

interface Props {
  thumbnail?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
}

function Avatar({ thumbnail, size = 'large', highlight = false }: Props) {
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

const getContainerStyle = (size: AvatarSize, highlight: boolean) => {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = getContainerSize(size);

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getContainerSize = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-9 h-9';
    case 'medium':
      return 'w-11 h-11';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
};

const getImageSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px] p-[0.1rem]';
    case 'medium':
      return 'w-[42px] h-[42px] p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.2rem]';
  }
};

export default Avatar;
