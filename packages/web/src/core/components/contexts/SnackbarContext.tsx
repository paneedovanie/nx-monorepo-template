import { Alert, AlertColor, Snackbar } from '@mui/material';
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

type SnackbarProps = {
  open?: boolean;
  duration?: number;
  content: ReactElement<any, any>;
};

const defaultProps = {
  open: false,
  duration: 3000,
  content: <span>Please add content to your snackbar</span>,
};

export const SnackbarContext = createContext<{
  snackbar: SnackbarProps;
  setSnackbar: (props: SnackbarProps) => void;
  setAlertSnackbar: (props: SnackbarProps & { severity?: AlertColor }) => void;
}>({
  snackbar: defaultProps,
  setSnackbar: () => {
    // void
  },
  setAlertSnackbar: () => {
    // void
  },
});

export const SnackbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [snackbar, setBaseSnackbar] = useState<SnackbarProps>(defaultProps);

  const handleClose = () => setBaseSnackbar((v) => ({ ...v, open: false }));

  const setSnackbar = ({ open, ...props }: SnackbarProps) =>
    setBaseSnackbar((v) => ({
      ...v,
      ...props,
      open: open !== undefined ? open : true,
    }));

  const setAlertSnackbar = ({
    content,
    severity = 'success',
    ...props
  }: SnackbarProps & { severity?: AlertColor }) => {
    setSnackbar({
      ...props,
      content: (
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={severity}
          sx={{ width: '100%' }}
        >
          {content}
        </Alert>
      ),
    });
  };

  return (
    <SnackbarContext.Provider
      value={{ snackbar, setSnackbar, setAlertSnackbar }}
    >
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={snackbar.duration}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {snackbar.content}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
