import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
}

function ToggleButton({ toggled, onToggle, onIcon, offIcon }: Props) {
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}

export default ToggleButton;
