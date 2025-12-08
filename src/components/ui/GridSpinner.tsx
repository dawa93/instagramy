import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then(lib => lib.GridLoader),
  {
    ssr: false,
  },
);

interface Props {
  color?: string;
}

function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} />;
}

export default GridSpinner;
