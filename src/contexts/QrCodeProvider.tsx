import { createContext, PropsWithChildren, useContext, useState } from 'react';
import origin_test1 from '../assets/origin_test_photo/origin_test1.png';
import origin_test2 from '../assets/origin_test_photo/origin_test2.png';
import origin_test3 from '../assets/origin_test_photo/origin_test3.png';
import origin_test4 from '../assets/origin_test_photo/origin_test4.png';

import test_photo1 from '../assets/test_photo/test_photo1.png';
import test_photo2 from '../assets/test_photo/test_photo2.png';
import test_photo3 from '../assets/test_photo/test_photo3.png';
import test_photo4 from '../assets/test_photo/test_photo4.png';

import { Origin_Test } from '@Types/qrcode';

const initial: Origin_Test = { name: 'origin_test1', url: origin_test1, downUrl: test_photo1 };
const QrCodeContext = createContext<Origin_Test>(initial);

const origin_test_array = [
  { name: 'origin_test1', url: origin_test1, downUrl: test_photo1 },
  { name: 'origin_test2', url: origin_test2, downUrl: test_photo2 },
  { name: 'origin_test3', url: origin_test3, downUrl: test_photo3 },
  { name: 'origin_test4', url: origin_test4, downUrl: test_photo4 },
];

const QrCodeProvider = ({ children }: PropsWithChildren) => {
  const randomNum = Math.floor(Math.random() * 4);
  const randomPhoto = origin_test_array[randomNum];

  return <QrCodeContext.Provider value={randomPhoto}>{children}</QrCodeContext.Provider>;
};

export default QrCodeProvider;

export const useQrCodeInfo = () => useContext(QrCodeContext);
