import QRCodeStyling, { Options } from 'qr-code-styling';
import { theme } from '../constant';

export const generateQrcode = async (data: string, logoPath?: string) => {
  const qrCodeSize = 500;
  const logoSize = 0.5;
  const margin = 3;

  const options: Options = {
    width: qrCodeSize,
    height: qrCodeSize,
    data,
    image: logoPath,
    dotsOptions: {
      type: 'extra-rounded',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin,
      imageSize: logoSize,
    },
    cornersSquareOptions: {
      type: 'dot',
      color: theme.color.primary,
    },
  };

  const qrcode = new QRCodeStyling(options);

  return qrcode.getRawData('png');
};
