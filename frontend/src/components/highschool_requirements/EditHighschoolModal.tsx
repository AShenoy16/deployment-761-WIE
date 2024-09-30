import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HighschoolRequirement } from "../../types/HighschoolRequirements";

type EditHighschoolModalProps = {
  open: boolean;
  onClose: () => void;
  highschoolRequirementsData: HighschoolRequirement[];
};

const EditHighschoolModal: React.FC<EditHighschoolModalProps> = ({
  open,
  onClose,
  highschoolRequirementsData,
}) => {
  const handleSave = () => {
    console.log(
      "Updated Highschool Requirements: ",
      highschoolRequirementsData
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 850,
          maxHeight: 800,
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Typography variant="h4">Edit Highschool Requirements</Typography>

        <Stack spacing={4} mt={2}>
          {highschoolRequirementsData.map((requirements) => (
            <Stack key={requirements.title} spacing={2}>
              <Typography variant="h6">{requirements.title}</Typography>
              <TextField
                label="Required Score"
                value={requirements.requiredScore}
              />
              {requirements.requirements.map((req, reqIndex) => (
                <TextField
                  key={reqIndex}
                  label={`Requirement ${reqIndex + 1}`}
                  fullWidth
                  value={req}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditHighschoolModal;
