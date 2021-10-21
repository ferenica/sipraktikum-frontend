import React from 'react';
import {useHistory} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {StyledButton, WarningButton} from './../../../../components/MKPPL/Button/Button';

export default function CancelConfirmationModal(props) {
  const history = useHistory();
  return (
    <div>
      <Dialog
        {...props}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Batalkan Perubahan</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin membatalkan perubahan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton secondary onClick={props.onClose}>
            Tetap di halaman ini
          </StyledButton>
          <WarningButton onClick={() => history.goBack()} autoFocus>
            Ya, Batalkan
          </WarningButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
