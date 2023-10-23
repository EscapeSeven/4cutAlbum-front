import QrCodeLayout from '@Components/qrcode/QrCodeLayout';
import QrCodeContents from '@Components/qrcode/QrCodeContents';
import QrCodeProvider from '@Contexts/QrCodeProvider';

const QrCode = () => {
  return (
    <QrCodeLayout>
      <QrCodeProvider>
        <QrCodeContents />
      </QrCodeProvider>
    </QrCodeLayout>
  );
};

export default QrCode;
