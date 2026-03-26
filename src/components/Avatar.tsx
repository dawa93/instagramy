type AvatarSize = 'small' | 'large' | 'medium' | 'xl';

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
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(size).image}`}
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
  const { container } = getImageSizeStyle(size);

  return `${baseStyle} ${highlightStyle} ${container}`;
};

interface ImageSizeStyle {
  container: string;
  image: string;
}

const getImageSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return {
        container: 'w-9 h-9', //
        image: 'w-[34px] h-[34px] p-[0.1rem]',
      };
    case 'medium':
      return {
        container: 'w-11 h-11', //
        image: 'w-[42px] h-[42px] p-[0.1rem]',
      };
    case 'large':
      return {
        container: 'w-[68px] h-[68px]', //
        image: 'w-16 h-16 p-[0.2rem]',
      };
    case 'xl':
      return {
        container: 'w-[142px] h-[142px]', //
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
};

export default Avatar;
