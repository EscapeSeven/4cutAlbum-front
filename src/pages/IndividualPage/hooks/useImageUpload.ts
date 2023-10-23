import React, { useEffect, useState } from 'react';
import sampleImg from '@Assets/origin_test_photo/emptyScreen.png';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES_PATH } from '@Constants/routes';

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
  const navigate = useNavigate();
  const initial_slide = 0;
  const { photoId } = useParams();

  const [currentSlide, setCurrentSlide] = useState<number>(initial_slide);

  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhotos[] | null>(null);
  const [photo, setPhoto] = useState<AlbumPhotos | null>(null);
  const [file, setFile] = useState<FileList | null>(null);
  const [imgURL, setImgURL] = useState<string>(sampleImg);
  const [isImgUpload, setIsImgUpload] = useState<boolean>(false);

  useEffect(() => {
    if (albumId) {
      fetch();
    } else if (photoId) {
      fetchPhoto();
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

  const handleCurrentSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };

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

  const resizeImageWithBackground = (file: File) => {
    return file;
  };

  const stickerPhoto = () => {
    if (!file || !isImgUpload) {
      return alert('사진을 업로드하세요!');
    }
  };

  const handlePhotoClick = (photoId: number | undefined) => {
    if (!photoId) return;
    navigate(`${ROUTES_PATH.decoration}/${photoId}?albumId=${albumId}`);
  };

  return {
    currentSlide,
    handleCurrentSlide,
    albumPhotos,
    onSubmitDecoPhoto,
    file,
    imgURL,
    selectImg,
    onSubmit,
    isImgUpload,
    stickerPhoto,
    photo,
    handlePhotoClick,
  };
};

export default useImageUpload;
