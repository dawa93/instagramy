import { RiBookmarkLine } from 'react-icons/ri';

interface Props {
  className?: string;
}

export function BookmarkIcon({ className }: Props) {
  return <RiBookmarkLine className={className || 'w-6 h-6'} />;
}
