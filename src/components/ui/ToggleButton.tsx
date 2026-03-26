import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  title: string;
}

function ToggleButton({ toggled, onToggle, onIcon, offIcon, title }: Props) {
  return (
    <button onClick={() => onToggle(!toggled)} aria-label={title}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}

export default ToggleButton;
