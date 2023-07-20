import { useTsQueryClient } from '@/core/plugins';
import { Box, Button, Dialog, DialogActions, Link } from '@mui/material';
import { Store } from '@nx-monorepo-template/global';
import { HtmlHTMLAttributes, ReactNode, useRef, useState } from 'react';

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
  const tsQueryClient = useTsQueryClient();
  const [qrcodeOpen, setQrcodeOpen] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { data: qrcodeResult } = tsQueryClient.qrcode.get.useQuery(
    ['getQrCode', text, store],
    {
      query: {
        text,
        logo: store?.image,
      },
    }
  );

  const qrcode = qrcodeResult?.body.qrcode;

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
