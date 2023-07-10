import { Button, Dialog, DialogActions, Link } from '@mui/material';
import { generateQrcode } from '@nx-monorepo-template/global';
import { useCallback, useEffect, useRef, useState } from 'react';

export const QrcodeDialog = ({
  filename,
  text,
}: {
  filename: string;
  text: string;
}) => {
  const [qrcode, setQrcode] = useState<string>();
  const [qrcodeOpen, setQrcodeOpen] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const getQrcode = useCallback(async () => {
    setQrcode(await generateQrcode(text));
  }, [text]);

  useEffect(() => {
    getQrcode();
  }, [getQrcode]);

  return (
    <>
      <img
        src={qrcode}
        alt="qrcode"
        width={100}
        height={100}
        onClick={() => setQrcodeOpen(true)}
      />
      <Dialog
        open={qrcodeOpen}
        onClose={() => setQrcodeOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img
          src={qrcode}
          alt="qrcode"
          width={400}
          height={400}
          onClick={() => setQrcodeOpen(true)}
        />
        <DialogActions>
          <Link
            ref={linkRef}
            download={`${filename}.png`}
            href={qrcode}
            sx={{ display: 'none' }}
          >
            Download
          </Link>
          <Button color="info" onClick={() => linkRef.current?.click()}>
            Download
          </Button>
          <Button onClick={() => setQrcodeOpen(false)} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
