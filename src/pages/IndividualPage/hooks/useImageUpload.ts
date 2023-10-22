import React, { useEffect, useState } from 'react';
import sampleImg from '../image.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = 'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app';

export type AlbumPhotos = {
  createdDate: string;
  modifiedDate: string;
  id: number;
  imageUrl: string;
  likes: number;
};

const useImageUpload = () => {
  const { albumId } = useParams();
  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhotos[] | null>(null);

  const [file, setFile] = useState<FileList | null>(null);
  const [imgURL, setImgURL] = useState<string>(sampleImg);
  const [isImgUpload, setIsImgUpload] = useState<boolean>(false);

  useEffect(() => {
    if (albumId) {
      fetch();
    }
  }, []);

  const fetch = async () => {
    await axios
      .get(`${BASE_URL}/user/albums/${albumId}`)
      .then((res) => {
        setAlbumPhotos(res.data.data);
        console.log('가져오기 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 파일 선택시 호출되는 함수
  const selectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgURL(reader.result);
        }
      };
      setIsImgUpload(true);
    }
  };

  // 사용자가 선택한 이미지 파일을 특정 서버 URL로 업로드하는 함수
  const onSubmit = () => {
    if (!file) {
      return alert('사진을 선택하세요!');
    }

    const resizedFile = resizeImageWithBackground(file[0]);

    const formData = new FormData();
    formData.append('imageFile', resizedFile);

    axios
      .post(`${BASE_URL}/user/album/${albumId}/write`, formData)
      .then((res) => fetch())
      .then(() => setIsImgUpload(false))
      .catch((error) => {
        console.log(error);
      });
  };

  const resizeImageWithBackground = (file: File) => {
    return file;
  };

  const stickerPhoto = () => {
    if (!file || !isImgUpload) {
      return alert('사진을 업로드하세요!');
    }
  };

  return { albumPhotos, file, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto };
};

export default useImageUpload;
