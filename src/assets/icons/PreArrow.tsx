type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const PreArrow = ({ color = '#666666', height = '32', width = '32' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M38.5714 57L18 33L38.5714 9"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PreArrow;
