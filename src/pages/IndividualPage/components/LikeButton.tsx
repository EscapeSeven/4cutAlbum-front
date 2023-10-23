import HeartIcon from '../heart.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import color from '@Styles/color';

type Props = {
  photoId: number,
  likes: number;
};
const BASE_URL = 'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app';

const LikeButton = ({ photoId, likes }: Props) => {
  const [pushlike, setPushLike] = useState<number>(likes);

  useEffect(() => {
    setPushLike(pushlike);
  }, [pushlike]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/album/${photoId}/like`);
      if (response.data && response.data.pushlike) {
        setPushLike(response.data.pushlike);
      }
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  };

  return (
    <Layout onClick={handleLike}>
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
