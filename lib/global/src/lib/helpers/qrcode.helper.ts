import * as QRCode from 'qrcode';

export const generateQrcode = (text: string) => {
  return QRCode.toDataURL(text);
};
