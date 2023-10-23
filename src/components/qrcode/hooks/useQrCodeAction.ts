import { useQrCodeInfo } from '@Contexts/QrCodeProvider';
import { ROUTES_PATH } from '@Constants/routes';
import { useNavigate } from 'react-router-dom';

const UseQrCodeAction = () => {
  const { name, url, downUrl } = useQrCodeInfo();

  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downUrl;
    link.download = `${name}.png`; // You can set the filename here
    link.click();
  };

  const onMove = () => {
    navigate(ROUTES_PATH.login);
  };

  return { url, handleDownload, onMove };
};

export default UseQrCodeAction;
