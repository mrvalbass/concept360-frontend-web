import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertModal({
  open,
  setOpenAlertModal,
  content,
  onClickDelete,
  _id,
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpenAlertModal((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Attention"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClickDelete(_id);
              setOpenAlertModal((prev) => !prev);
            }}
          >
            Supprimer
          </Button>
          <Button onClick={() => setOpenAlertModal((prev) => !prev)} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
