import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IHighschoolRequirement } from "../../types/HighschoolRequirements";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useHighschoolRequirements } from "../../hooks/useHighschoolRequirements";

const UpdateHighschoolRequirementsResultAlert = ({
  isSuccess,
  isError,
  errorMessage,
  onClose,
}: {
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  onClose: () => void;
}) => {
  return (
    <>
      <Snackbar open={isSuccess} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Requirement Updated Successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage || "Failed to update requirement. Please try again."}
        </Alert>
      </Snackbar>
    </>
  );
};

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

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [scoreErrors, setScoreErrors] = useState<boolean[]>([]);
  const [requirementErrors, setRequirementErrors] = useState<boolean[][]>([]);

  // Get the mutation hook to update the backend
  const { updateMutation } = useHighschoolRequirements();

  useEffect(() => {
    setLocalRequirements(highschoolRequirementsData);
    setScoreErrors(Array(highschoolRequirementsData.length).fill(false));
    setRequirementErrors(
      highschoolRequirementsData.map((req) => req.requirements.map(() => false))
    );
  }, [open, highschoolRequirementsData]);

  const validateScore = (index: number, score: number): void => {
    setScoreErrors((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[index] = isNaN(score) || score < 0;
      return updatedErrors;
    });
  };

  const validateRequirementField = (
    idx: number,
    reqIndex: number,
    value: string
  ): void => {
    setRequirementErrors((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[idx] = updatedErrors[idx] || [];
      updatedErrors[idx][reqIndex] = value.trim() === "";
      return updatedErrors;
    });
  };

  const handleScoreChange = (index: number, value: number) => {
    setLocalRequirements((prevRequirements) =>
      prevRequirements.map((req, i) =>
        i === index ? { ...req, requiredScore: value } : req
      )
    );
    validateScore(index, value);
  };

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
    validateRequirementField(idx, reqIndex, value);
  };

  const handleSave = () => {
    updateMutation.mutate(localRequirements, {
      onSuccess: () => {
        setIsSuccess(true);
        setIsError(false);
        onClose();
      },
      onError: (error) => {
        setIsError(true);
        setErrorMessage(error.message || "Failed to update the requirements.");
        setIsSuccess(false);
      },
    });
  };

  const handleCancel = () => {
    setLocalRequirements(highschoolRequirementsData);
    setScoreErrors([]);
    setRequirementErrors([]);
    onClose();
  };

  const handleCloseAlert = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  return (
    <>
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
                  error={scoreErrors[idx]}
                  helperText={
                    scoreErrors[idx]
                      ? "Invalid score. Must be a positive number."
                      : ""
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
                    error={
                      !!(
                        requirementErrors[idx] &&
                        requirementErrors[idx][reqIndex]
                      )
                    }
                    helperText={
                      requirementErrors[idx] && requirementErrors[idx][reqIndex]
                        ? "This field cannot be empty."
                        : ""
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

      <UpdateHighschoolRequirementsResultAlert
        isSuccess={isSuccess}
        isError={isError}
        errorMessage={errorMessage}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default EditHighschoolModal;
