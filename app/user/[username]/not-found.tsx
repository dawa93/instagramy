import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

function NotFound({}: Props) {
  return <p>사용자를 찾을 수 없어요</p>;
}

export default NotFound;
