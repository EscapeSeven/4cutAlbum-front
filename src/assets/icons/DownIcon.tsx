type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const DownIcon = ({ color = '#666666', height = '32', width = '32' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M56.807 42.7747V58.7764H8.80176V42.7747M32.8044 6.77075V46.7751M32.8044 46.7751L16.8026 30.7734M32.8044 46.7751L48.8061 30.7734"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownIcon;
