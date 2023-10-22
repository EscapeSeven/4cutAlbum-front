import React, { useState } from 'react';
import sampleImg from '../image.png';
import axios from 'axios';

const useImageUpload = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [imgURL, setImgURL] = useState<string>(sampleImg);
  const [isImgUpload, setIsImgUpload] = useState<boolean>(false);
  const [isHasSubmit, setIsHasSubmit] = useState(false);

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
    setIsHasSubmit(true);
    const formData = new FormData();
    formData.append('imageFile', file[0]);

    axios
      .post('https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app/user/album/1/write', formData)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  };

  const stickerPhoto = () => {
    if (!file || !isImgUpload) {
      return alert('사진을 업로드하세요!');
    }
  }

  return { file, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto };
};

export default useImageUpload;