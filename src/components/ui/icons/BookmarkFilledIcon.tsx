import { RiBookmarkFill } from 'react-icons/ri';

interface Props {
  className?: string;
}

export function BookmarkFilledIcon({ className }: Props) {
  return <RiBookmarkFill className={className || 'w-6 h-6'} />;
}
