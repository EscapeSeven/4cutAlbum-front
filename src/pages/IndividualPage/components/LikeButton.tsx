import HeartIcon from '../heart.png';
import { styled } from 'styled-components';
import color from '@Styles/color';

type Props = {
  likes: number;
};

const LikeButton = ({ likes }: Props) => {
  return (
    <Layout>
      <img src={HeartIcon} />
      <LikeNumber>{likes}</LikeNumber>
    </Layout>
  );
};

export default LikeButton;

const Layout = styled.button`
  width: 150px;
  display: inline-flex;
  justify-content: space-between;

  padding: 0 20px;
  border-radius: 200px;
  border: 2px solid ${color.gray[400]};
`;

const LikeNumber = styled.span`
  font-size: 32px;
  color: ${color.gray[900]};
`;
