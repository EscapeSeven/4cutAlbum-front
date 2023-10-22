type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const PlusIcon = ({ color = '#666666', height = '32', width = '32' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6499 4.5V28.1333M4.83325 16.3167H28.4666"
        stroke={color}
        strokeWidth="1.77231"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
