import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  TextareaAutosize,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import GradientBox from "../GradientBox";
import axios from "axios";
import { Specialization } from "../../types/Specialization";
import useSnackBar from "../../hooks/useSnackBar";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "800px",
  maxHeight: "90vh",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 5,
};

const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
};

interface EditModalSpecInfoProps {
  open: boolean;
  onClose: () => void;
  specInfoResult: {
    name: string;
    careerPathways: string[];
    jobAvailability: string;
    header: string;
    leftDetail: string;
    rightDetail: string;
    leftImage: string;
    rightImage: string;
    medianSalary: number;
    experiencedSalary: number;
  } | null;
  name: string;
  onSave: (updatedSpecialization: Partial<Specialization>) => void;
}

const EditModalSpecInfo: React.FC<EditModalSpecInfoProps> = ({
  open,
  onClose,
  specInfoResult,
  name,
  onSave,
}) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [title, setTitle] = useState<string>(""); // New state for the title
  const [careerPathways, setCareerPathways] = useState<string[]>([]);
  const [header, setHeader] = useState<string>("");
  const [leftDetail, setLeftDetail] = useState<string>("");
  const [rightDetail, setRightDetail] = useState<string>("");
  const [leftImage, setLeftImage] = useState<File | null>(null);
  const [rightImage, setRightImage] = useState<File | null>(null);
  const [jobAvailability, setjobAvailability] = useState<string>("");
  const [medianSalary, setMedianSalary] = useState<number>(0);
  const [experiencedSalary, setExperiencedSalary] = useState<number>(0);

  const leftImageInputRef = useRef<HTMLInputElement | null>(null);
  const rightImageInputRef = useRef<HTMLInputElement | null>(null);

  const isMedianSalaryInvalid = isNaN(medianSalary) || medianSalary < 40000;
  const isExperiencedSalaryInvalid =
    isNaN(experiencedSalary) || experiencedSalary < 40000;

  const showSnackbar = useSnackBar();

  useEffect(() => {
    if (specInfoResult) {
      setTitle(specInfoResult.name); // Set the initial title
      setCareerPathways(specInfoResult.careerPathways);
      setHeader(specInfoResult.header);
      setLeftDetail(specInfoResult.leftDetail);
      setRightDetail(specInfoResult.rightDetail);
      setjobAvailability(specInfoResult.jobAvailability);
      setMedianSalary(specInfoResult.medianSalary);
      setExperiencedSalary(specInfoResult.experiencedSalary);
    }
  }, [specInfoResult]);

  // Reset the form state
  const resetForm = () => {
    if (specInfoResult) {
      setTitle(specInfoResult.name);
      setCareerPathways(specInfoResult.careerPathways);
      setHeader(specInfoResult.header);
      setLeftDetail(specInfoResult.leftDetail);
      setRightDetail(specInfoResult.rightDetail);
      setjobAvailability(specInfoResult.jobAvailability);
      setMedianSalary(specInfoResult.medianSalary);
      setExperiencedSalary(specInfoResult.experiencedSalary);
      setLeftImage(null);
      setRightImage(null);
    }
  };

  const helperSalaryText = (salary: number) => {
    if (isNaN(salary)) {
      return "Please enter a number";
    }
    if (salary < 40000) {
      return "Please enter a reasonable salary";
    }
    return "";
  };

  const handleMedianSalaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (!isNaN(Number(newValue))) {
      setMedianSalary(Number(newValue));
    }
  };

  const handleExperiencedSalaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (!isNaN(Number(newValue))) {
      setExperiencedSalary(Number(newValue));
    }
  };

  const handleCareerPathwayChange = (index: number, value: string) => {
    const newCareerPathways = [...careerPathways];
    newCareerPathways[index] = value;
    setCareerPathways(newCareerPathways);
  };

  const handleAddCareerPathway = () => {
    setCareerPathways([...careerPathways, ""]);
  };

  const handleRemoveCareerPathway = (index: number) => {
    const newCareerPathways = careerPathways.filter((_, i) => i !== index);
    setCareerPathways(newCareerPathways);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  // Inside the EditModalSpecInfo component
  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    if (
      !title.trim() ||
      !header.trim() ||
      !leftDetail.trim() ||
      !rightDetail.trim() ||
      isMedianSalaryInvalid
    ) {
      showSnackbar("Please fill out all required fields.");
      return;
    }

    const sanitizedTitle = title.trim().replace(/\s+/g, " ");
    const sanitizedHeader = header.trim().replace(/\s+/g, " ");
    const sanitizedLeftDetail = leftDetail.trim().replace(/\s+/g, " ");
    const sanitizedRightDetail = rightDetail.trim().replace(/\s+/g, " ");
    const sanitizedCareerPathways = careerPathways.map((pathway) =>
      pathway.trim().replace(/\s+/g, " ")
    );

    const formData = new FormData();

    formData.append("name", sanitizedTitle); // Add the title to formData
    formData.append("header", sanitizedHeader);
    formData.append("careerPathways", JSON.stringify(sanitizedCareerPathways));
    formData.append("leftDetail", sanitizedLeftDetail);
    formData.append("rightDetail", sanitizedRightDetail);
    formData.append("jobAvailability", jobAvailability);
    formData.append("medianSalary", medianSalary.toString());
    formData.append("experiencedSalary", experiencedSalary.toString());

    if (leftImage) {
      formData.append("leftImage", leftImage);
    }

    if (rightImage) {
      formData.append("rightImage", rightImage);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/specializations/${encodeURIComponent(name)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showSnackbar("Successfully saved changes.");

      // Navigate to the new URL if the name has changed
      if (response.data.name !== name) {
        navigate(
          `/specialisation/${encodeURIComponent(response.data.name.replace(/\s+/g, "-").toLowerCase())}`
        );
      }

      onSave(response.data);
      resetForm(); // Reset the form on successful save
      onClose();
    } catch (error) {
      showSnackbar("Error updating specialization, please try again.");
      console.error("Error updating specialization:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm(); // Reset form on close
        onClose();
      }}
    >
      <GradientBox sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              resetForm(); // Reset form on close icon click
              onClose();
            }}
          >
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "white", flex: 1 }}
          >
            Edit Spec Info
          </Typography>
        </Box>

        <Stack
          sx={{
            overflowY: "auto",
            paddingRight: "16px",
            marginBottom: "16px",
            flexGrow: 1,
            gap: 3,
          }}
        >
          <Box sx={{ background: "white", borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Landing Space
            </Typography>
            {/* Edit Title */}
            <Typography variant="h6" gutterBottom>
              Title <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: "white",
                borderRadius: "8px",
              }}
              required
            />

            {/* Edit Header */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Header <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextareaAutosize
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              minRows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                resize: "none",
              }}
              required
            />
          </Box>

          <Box sx={{ background: "white", borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Impact Details
            </Typography>
            {/* Edit Left Detail */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Left Detail <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextareaAutosize
              minRows={4}
              value={leftDetail}
              onChange={(e) => setLeftDetail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                resize: "none",
              }}
              required
            />

            {/* Upload Right Image */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Upload Right Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              ref={rightImageInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, setRightImage)}
            />
            <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={() => rightImageInputRef.current?.click()}
            >
              Choose Right Image
            </Button>

            {/* Edit Right Detail */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Right Detail <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextareaAutosize
              minRows={4}
              value={rightDetail}
              onChange={(e) => setRightDetail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                resize: "none",
              }}
              required
            />

            {/* Upload Left Image */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Upload Left Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              ref={leftImageInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, setLeftImage)}
            />
            <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={() => leftImageInputRef.current?.click()}
            >
              Choose Left Image
            </Button>
          </Box>

          <Box sx={{ background: "white", borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Career Details
            </Typography>
            {/* Edit Job Availability */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Job Availability <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jobAvailability}
                label="Availability"
                onChange={(e) => setjobAvailability(e.target.value)}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>

            {/* Edit Median Salary */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Median Salary <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={medianSalary}
              onChange={handleMedianSalaryChange}
              error={isMedianSalaryInvalid}
              helperText={helperSalaryText(medianSalary)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                resize: "none",
              }}
              required
            />

            {/* Edit Experienced Salary */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Experienced Salary <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={experiencedSalary}
              onChange={handleExperiencedSalaryChange}
              error={isExperiencedSalaryInvalid}
              helperText={helperSalaryText(experiencedSalary)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                resize: "none",
              }}
              required
            />

            {/* Edit Career Pathways */}
            <Typography
              variant="h6"
              gutterBottom
              paddingBottom={"10px"}
              sx={{ mt: 4 }}
            >
              Career Pathways
            </Typography>
            {careerPathways.map((pathway, index) => (
              <Box key={index} sx={{ display: "flex", mb: 2 }}>
                <TextField
                  fullWidth
                  value={pathway}
                  onChange={(e) =>
                    handleCareerPathwayChange(index, e.target.value)
                  }
                  label={`Pathway ${index + 1}`}
                  sx={{
                    mr: 2,
                    mt: 1,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                  InputLabelProps={{
                    sx: {
                      transform: "translate(5px, -15px) scale(0.85)",
                      marginTop: "-5px",
                      color: "black",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveCareerPathway(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Button onClick={handleAddCareerPathway} variant="contained">
              Add Career Pathway
            </Button>
          </Box>
        </Stack>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={buttonStyle}
          >
            Save Changes
          </Button>
        </Box>
      </GradientBox>
    </Modal>
  );
};

export default EditModalSpecInfo;
