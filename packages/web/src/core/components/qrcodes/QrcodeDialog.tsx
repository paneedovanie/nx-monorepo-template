import { generateQrcode } from '@/core/helpers';
import { Box, Button, Dialog, DialogActions, Link } from '@mui/material';
import { Store } from '@nx-monorepo-template/global';
import {
  HtmlHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const blobToString = (blob: Blob) => {
  return new Promise<string | undefined>((res, rej) => {
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
      const result = event.target?.result;
      if (typeof result === 'string') res(result);
      else res(result?.toString());
    };

    reader.readAsText(blob);
  });
};

export const QrcodeDialog = ({
  imageProps,
  filename,
  text,
  trigger,
  displayTrigger = true,
  open = false,
  store,
  onClose,
}: {
  imageProps?: HtmlHTMLAttributes<HTMLImageElement>;
  filename: string;
  text: string;
  trigger?: ReactNode;
  displayTrigger?: boolean;
  open?: boolean;
  store?: Store;
  onClose?: () => void;
}) => {
  const [qrcode, setQrcode] = useState<string>();
  const [qrcodeOpen, setQrcodeOpen] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const getQrcode = useCallback(async () => {
    const result = await generateQrcode(text, store?.image);
    setQrcode(result ? URL.createObjectURL(result) : undefined);
  }, [text, store]);

  useEffect(() => {
    getQrcode();
  }, [getQrcode]);

  return (
    <>
      <Box onClick={() => setQrcodeOpen(true)} sx={{ display: 'inline' }}>
        {displayTrigger &&
          (trigger ?? (
            <img
              alt="qrcode"
              width={100}
              height={100}
              {...imageProps}
              src={qrcode}
            />
          ))}
      </Box>

      <Dialog
        open={displayTrigger ? qrcodeOpen : open}
        onClose={() => setQrcodeOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <Box
          sx={{
            maxWidth: '100%',
          }}
        >
          <img
            src={qrcode}
            alt="qrcode"
            width="100%"
            onClick={() => setQrcodeOpen(true)}
          />
        </Box>
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
          <Button
            onClick={() =>
              displayTrigger ? setQrcodeOpen(false) : onClose?.()
            }
            color="inherit"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
