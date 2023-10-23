import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlbumPhotos } from '@Pages/IndividualPage/hooks/useImageUpload';
import axios from 'axios';
import { BASE_URL } from '@Constants/base';

const useDecorationInfo = () => {
  const { photoId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const albumId = searchParams.get('albumId');

  const [photo, setPhoto] = useState<AlbumPhotos | null>(null);
  const [isImgUpload, setIsImgUpload] = useState<boolean>(false);

  useEffect(() => {
    if (photoId) {
      fetchPhoto();
    }
  }, []);

  const fetchPhoto = async () => {
    await axios
      .get(`${BASE_URL}/user/album/${photoId}`)
      .then((res) => {
        setPhoto(res.data.data);
        console.log('가져오기 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitDecoPhoto = (blob: Blob) => {
    if (!blob) {
      return alert('사진을 선택하세요!');
    }

    const formData = new FormData();
    formData.append('imageFile', blob);

    axios
      .post(`${BASE_URL}/user/album/${photoId}/edit`, formData)
      // .then((res) => fetchPhoto())
      .then(() => setIsImgUpload(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return { albumId, photo, onSubmitDecoPhoto };
};

export default useDecorationInfo;
