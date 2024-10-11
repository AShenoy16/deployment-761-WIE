import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Specialization, Testimonial } from "../../types/Specialization";
import useSnackBar from "../../hooks/useSnackBar";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../util/common";
import DeleteIcon from "@mui/icons-material/Delete";
import uoaEngBuilding from "/engineering-building.jpg"; // Fallback image if needed

interface EditModalSpecInfoProps {
  open: boolean;
  onClose: () => void;
  specInfoResult: {
    name: string;
    careerPathways: string[];
    header: string;
    leftDetail: string;
    rightDetail: string;
    leftImage: string;
    rightImage: string;
    testimonials: Testimonial[];
    jobAvailability: string;
    medianSalary: number;
    experiencedSalary: number;
    source: string;
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
  const [title, setTitle] = useState<string>(""); // New state for the title
  const [careerPathways, setCareerPathways] = useState<string[]>([]);
  const [header, setHeader] = useState<string>("");
  const [leftDetail, setLeftDetail] = useState<string>("");
  const [rightDetail, setRightDetail] = useState<string>("");
  const [leftImage, setLeftImage] = useState<File | null>(null);
  const [rightImage, setRightImage] = useState<File | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [source, setSource] = useState<string>("");

  // State for storing the uploaded file names
  const [leftImageName, setLeftImageName] = useState<string | null>(null);
  const [rightImageName, setRightImageName] = useState<string | null>(null);

  const [jobAvailability, setjobAvailability] = useState<string>("");
  const [medianSalary, setMedianSalary] = useState<number>(0);
  const [experiencedSalary, setExperiencedSalary] = useState<number>(0);
  const leftImageInputRef = useRef<HTMLInputElement | null>(null);
  const rightImageInputRef = useRef<HTMLInputElement | null>(null);
  const isMedianSalaryInvalid = isNaN(medianSalary) || medianSalary < 40000;
  const isExperiencedSalaryInvalid =
    isNaN(experiencedSalary) || experiencedSalary < 40000;
  const isSourceInvalid = source.trim().length === 0;
  const showSnackbar = useSnackBar();

  useEffect(() => {
    if (specInfoResult) {
      setTitle(specInfoResult.name); // Set the initial title
      setCareerPathways(specInfoResult.careerPathways);
      setHeader(specInfoResult.header);
      setLeftDetail(specInfoResult.leftDetail);
      setRightDetail(specInfoResult.rightDetail);
      setTestimonials(specInfoResult.testimonials);
      setLeftImage(null);
      setRightImage(null);
      setLeftImageName(null); // Reset image names on form reset
      setRightImageName(null); // Reset image names on form reset
      setjobAvailability(specInfoResult.jobAvailability);
      setMedianSalary(specInfoResult.medianSalary);
      setExperiencedSalary(specInfoResult.experiencedSalary);
      setSource(specInfoResult.source);
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
      setLeftImage(null);
      setRightImage(null);
      setLeftImageName(null); // Reset image names on form reset
      setRightImageName(null); // Reset image names on form reset
      setTestimonials(specInfoResult.testimonials);
      setjobAvailability(specInfoResult.jobAvailability);
      setMedianSalary(specInfoResult.medianSalary);
      setExperiencedSalary(specInfoResult.experiencedSalary);
      setSource(specInfoResult.source);
    }
  };

  // Define modal styles
  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    maxWidth: "800px",
    maxHeight: "90vh",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px", // Softer border radius
    overflow: "hidden", // Handle overflow
  };

  const lightGrey = "#f5f5f5";

  const helperSalaryText = (salary: number) => {
    if (isNaN(salary)) {
      return "Please enter a number";
    }
    if (salary < 40000) {
      return "Please enter a reasonable salary";
    }
    return "";
  };

  const helperSourceText = (newSource: string) => {
    if (newSource.trim().length === 0) {
      return "Please enter a valid source";
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

  const handleSourceChange = (newSource: string) => {
    setSource(newSource);
  };

  const handleTestimonialNameChange = (index: number, value: string) => {
    const newTestimonial = [...testimonials];
    newTestimonial[index].name = value;
    setTestimonials(newTestimonial);
  };

  const handleTestimonialDescChange = (index: number, value: string) => {
    const newTestimonial = [...testimonials];
    newTestimonial[index].description = value;
    setTestimonials(newTestimonial);
  };

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { name: "", description: "" }]);
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void,
    setImageName: (fileName: string | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setImageName(file.name); // Update the button with the file name
    } else {
      setImageName(null); // Reset if no file selected
    }
  };

  // Inside the EditModalSpecInfo component
  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    if (
      !title.trim() ||
      !header.trim() ||
      !leftDetail.trim() ||
      !rightDetail.trim() ||
      isMedianSalaryInvalid ||
      isExperiencedSalaryInvalid ||
      isSourceInvalid
    ) {
      showSnackbar("Please fill out all required fields.", false);
      return;
    }

    if (medianSalary >= experiencedSalary) {
      showSnackbar("Median Salary must be less than experienced.", false);
      return;
    }

    const sanitizedTitle = title.trim().replace(/\s+/g, " ");
    const sanitizedHeader = header.trim().replace(/\s+/g, " ");
    const sanitizedLeftDetail = leftDetail.trim().replace(/\s+/g, " ");
    const sanitizedRightDetail = rightDetail.trim().replace(/\s+/g, " ");
    const sanitizedCareerPathways = careerPathways.map((pathway) =>
      pathway.trim().replace(/\s+/g, " ")
    );

    // Map testimonials and sanitize them
    const sanitizedTestimonials = testimonials.map((testimonial) => ({
      name: testimonial.name.trim().replace(/\s+/g, " "),
      description: testimonial.description.trim().replace(/\s+/g, " "),
    }));

    const formData = new FormData();

    formData.append("name", sanitizedTitle); // Add the title to formData
    formData.append("header", sanitizedHeader);
    formData.append("careerPathways", JSON.stringify(sanitizedCareerPathways));
    formData.append("leftDetail", sanitizedLeftDetail);
    formData.append("rightDetail", sanitizedRightDetail);
    formData.append("testimonials", JSON.stringify(sanitizedTestimonials));
    formData.append("jobAvailability", jobAvailability);
    formData.append("medianSalary", medianSalary.toString());
    formData.append("experiencedSalary", experiencedSalary.toString());
    formData.append("source", source);

    if (leftImage) {
      formData.append("leftImage", leftImage);
    }

    if (rightImage) {
      formData.append("rightImage", rightImage);
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
      showSnackbar("Successfully saved changes.", true);

      // Navigate to the new URL if the name has changed
      if (response.data.name !== name) {
        navigate(
          `/specialisation/${encodeURIComponent(
            response.data.name.replace(/\s+/g, "-").toLowerCase()
          )}`
        );
      }

      onSave(response.data);
      resetForm(); // Reset the form on successful save
      onClose();
    } catch (error) {
      showSnackbar("Error updating specialization, please try again.", false);
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
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Edit Specialisation Info
          </Typography>
          <IconButton
            role="back-btn"
            edge="start"
            color="inherit"
            onClick={() => {
              resetForm(); // Reset form on close icon click
              onClose();
            }}
          >
            <CloseIcon />
          </IconButton>
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
          <Box sx={{ background: lightGrey, borderRadius: 2, padding: 2 }}>
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
          <Box sx={{ background: lightGrey, borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Impact Details
            </Typography>
            {/* Edit Left Detail */}
            <Typography variant="h6" gutterBottom>
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
              onChange={(e) =>
                handleImageChange(e, setRightImage, setRightImageName)
              }
            />
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                mb: 5,
              }}
            >
              <Button
                variant="contained"
                sx={{ marginBottom: "10px" }}
                onClick={() => rightImageInputRef.current?.click()}
              >
                {rightImageName
                  ? `Uploaded: ${rightImageName}`
                  : "Choose Right Image"}
              </Button>
              {
                <Box
                  sx={{
                    position: "relative", // Position relative to enable text overlay
                    maxHeight: { xs: 130, md: 190 },
                    marginTop: 1,
                    overflow: "hidden",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                    "&:hover img": {
                      filter: "brightness(50%)",
                    },
                  }}
                  onClick={() => rightImageInputRef.current?.click()}
                >
                  {/* Image Element */}
                  <Box
                    component="img"
                    sx={{
                      maxHeight: { xs: 130, md: 190 },
                    }}
                    src={
                      rightImage
                        ? URL.createObjectURL(rightImage)
                        : specInfoResult?.rightImage
                          ? `${API_BASE_URL}${specInfoResult?.rightImage}`
                          : uoaEngBuilding
                    }
                    alt="Right Image"
                  />

                  {/* Text Overlay */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      textAlign: "center",
                      opacity: 0, // Hidden by default
                      pointerEvents: "none",
                    }}
                  >
                    Replace Image
                  </Box>
                </Box>
              }
            </Stack>
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
              onChange={(e) =>
                handleImageChange(e, setLeftImage, setLeftImageName)
              }
            />
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                mb: 5,
              }}
            >
              <Button
                variant="contained"
                sx={{ marginBottom: "10px" }}
                onClick={() => leftImageInputRef.current?.click()}
              >
                {leftImageName
                  ? `Uploaded: ${leftImageName}`
                  : "Choose Left Image"}
              </Button>
              {
                <Box
                  sx={{
                    position: "relative", // Position relative to enable text overlay
                    maxHeight: { xs: 130, md: 190 },
                    marginTop: 1,
                    overflow: "hidden",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                    "&:hover img": {
                      filter: "brightness(50%)",
                    },
                  }}
                  onClick={() => leftImageInputRef.current?.click()}
                >
                  {/* Image Element */}
                  <Box
                    component="img"
                    sx={{
                      maxHeight: { xs: 130, md: 190 },
                    }}
                    src={
                      leftImage
                        ? URL.createObjectURL(leftImage)
                        : specInfoResult?.leftImage
                          ? `${API_BASE_URL}${specInfoResult?.leftImage}`
                          : uoaEngBuilding
                    }
                    alt="Left image"
                  />

                  {/* Text Overlay */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      textAlign: "center",
                      opacity: 0, // Hidden by default
                      pointerEvents: "none",
                    }}
                  >
                    Replace Image
                  </Box>
                </Box>
              }
            </Stack>
          </Box>

          <Box sx={{ background: lightGrey, borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Career Details
            </Typography>
            {/* Edit Job Availability */}
            <Typography variant="h6" gutterBottom>
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

            {/* Edit Source */}

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Source <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              value={source}
              helperText={helperSourceText(source)}
              onChange={(e) => handleSourceChange(e.target.value)}
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
              paddingBottom={"30px"}
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
                <IconButton
                  sx={{ color: "#b92d19" }}
                  onClick={() => handleRemoveCareerPathway(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddCareerPathway} variant="contained">
              Add Career Pathway
            </Button>
          </Box>
          <Box sx={{ background: lightGrey, borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              Testimonials <span style={{ color: "red" }}>*</span>
            </Typography>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ display: "flex", mb: 2 }}>
                <TextField
                  fullWidth
                  value={testimonial.name}
                  onChange={(e) =>
                    handleTestimonialNameChange(index, e.target.value)
                  }
                  label={`Testimonial ${index + 1} name`}
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
                      marginTop: "-10px",
                      color: "black",
                      fontSize: "1.25rem",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  value={testimonial.description}
                  onChange={(e) =>
                    handleTestimonialDescChange(index, e.target.value)
                  }
                  label={`Testimonial ${index + 1} description`}
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
                      marginTop: "-10px",
                      color: "black",
                      fontSize: "1.25rem",
                    },
                  }}
                />
                <IconButton
                  sx={{ color: "#b92d19" }}
                  onClick={() => handleRemoveTestimonial(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddTestimonial} variant="contained">
              Add Testimonial
            </Button>
          </Box>
        </Stack>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModalSpecInfo;
