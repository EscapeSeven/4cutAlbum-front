type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const People = ({ color = '#666666', height = '32', width = '32' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.8044 39.4204C38.805 39.4204 44.8057 31.4196 44.8057 21.4185C44.8057 11.4174 40.8052 5.41675 32.8044 5.41675C24.8035 5.41675 20.8031 11.4174 20.8031 21.4185C20.8031 31.4196 26.8037 39.4204 32.8044 39.4204ZM32.8044 39.4204C44.8057 39.4204 56.807 41.4207 56.807 59.4226H8.80176C8.80176 41.4207 20.8031 39.4204 32.8044 39.4204Z"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default People;
