import * as QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export const generateQrcode = async (text: string, logoPath?: string) => {
  const option: QRCode.QRCodeRenderersOptions = {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  };
  const qrCodeSize = 300;
  const logoSize = 100;

  if (logoPath) {
    const canvas = createCanvas(qrCodeSize, qrCodeSize);
    QRCode.toCanvas(canvas, text, option);

    const logoCanvas = createCanvas(logoSize, logoSize);
    const logoCtx = logoCanvas.getContext('2d');

    // Fill the logo canvas with a white background
    logoCtx.fillStyle = '#ffffff';
    logoCtx.fillRect(0, 0, logoSize, logoSize);

    // Load the logo image and draw it on the logo canvas
    const logoImg = await loadImage(logoPath);
    logoCtx.drawImage(logoImg, 0, 0, logoSize, logoSize);

    const ctx = canvas.getContext('2d');
    const center = (qrCodeSize - logoSize) / 2;
    ctx.drawImage(logoCanvas, center, center, logoSize, logoSize);

    return canvas.toDataURL('image/png');
  }
  return QRCode.toDataURL(text, option);
};
