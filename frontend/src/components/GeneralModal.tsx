import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

type GeneralModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children?: React.ReactNode;
};

const GeneralModal: React.FC<GeneralModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" marginBottom={2}>
          {title}
        </Typography>
        <Stack spacing={2}>
          {children}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default GeneralModal;
