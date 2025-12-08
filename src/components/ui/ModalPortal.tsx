import { PropsWithChildren } from 'react';
import reactDom from 'react-dom';

interface Props extends PropsWithChildren {
  // : ;
}

function ModalPortal({ children }: Props) {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('portal') as Element;

  return reactDom.createPortal(children, node);
}

export default ModalPortal;
