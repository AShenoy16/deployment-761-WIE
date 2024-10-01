import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IHighschoolRequirement } from "../../types/HighschoolRequirements";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useHighschoolRequirements } from "../../hooks/useHighschoolRequirements";

type EditHighschoolModalProps = {
  open: boolean;
  onClose: () => void;
  highschoolRequirementsData: IHighschoolRequirement[];
};

const EditHighschoolModal: React.FC<EditHighschoolModalProps> = ({
  open,
  onClose,
  highschoolRequirementsData,
}) => {
  const [localRequirements, setLocalRequirements] = useState<
    IHighschoolRequirement[]
  >(highschoolRequirementsData);

  // Get the mutation hook to update the backend
  const { updateMutation } = useHighschoolRequirements();

  const handleScoreChange = (index: number, value: number) => {
    setLocalRequirements((prevRequirements) =>
      prevRequirements.map((req, i) =>
        i === index ? { ...req, requiredScore: value } : req
      )
    );
  };

  useEffect(() => {
    setLocalRequirements(highschoolRequirementsData);
  }, [open]);

  const handleRequirementChange = (
    idx: number,
    reqIndex: number,
    value: string
  ) => {
    setLocalRequirements((prevRequirements) =>
      prevRequirements.map((req, i) =>
        i === idx
          ? {
              ...req,
              requirements: req.requirements.map((r, j) =>
                j === reqIndex ? value : r
              ),
            }
          : req
      )
    );
  };

  const handleSave = () => {
    updateMutation.mutate(localRequirements);
    onClose();
  };

  const handleCancel = () => {
    setLocalRequirements(highschoolRequirementsData);
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
          {localRequirements.map((requirements, idx) => (
            <Stack key={requirements.title} spacing={2}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography variant="h6">{requirements.title}</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Requirement
                </Button>
              </Stack>
              <TextField
                label="Required Score"
                value={
                  isNaN(requirements.requiredScore)
                    ? ""
                    : requirements.requiredScore
                }
                onChange={(e) =>
                  handleScoreChange(idx, parseInt(e.target.value))
                }
              />
              {requirements.requirements.map((req, reqIndex) => (
                <TextField
                  key={reqIndex}
                  label={`Requirement ${reqIndex + 1}`}
                  fullWidth
                  value={req}
                  sx={{ mb: 1 }}
                  onChange={(e) =>
                    handleRequirementChange(idx, reqIndex, e.target.value)
                  }
                />
              ))}
            </Stack>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="outlined" onClick={handleCancel}>
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
