import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import GradientBox from "../GradientBox";
import axios from "axios";
import { Specialization, Testimonial } from "../../types/Specialization";
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
    header: string;
    leftDetail: string;
    rightDetail: string;
    leftImage: string;
    rightImage: string;
    testimonials: Testimonial[];
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const leftImageInputRef = useRef<HTMLInputElement | null>(null);
  const rightImageInputRef = useRef<HTMLInputElement | null>(null);
  const showSnackbar = useSnackBar();

  useEffect(() => {
    if (specInfoResult) {
      setTitle(specInfoResult.name); // Set the initial title
      setCareerPathways(specInfoResult.careerPathways);
      setHeader(specInfoResult.header);
      setLeftDetail(specInfoResult.leftDetail);
      setRightDetail(specInfoResult.rightDetail);
      setTestimonials(specInfoResult.testimonials);
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
      setTestimonials(specInfoResult.testimonials);
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
      !rightDetail.trim()
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
      showSnackbar("Successfully saved changes.");

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

        <Box
          sx={{
            overflowY: "auto",
            paddingRight: "16px",
            marginBottom: "16px",
            flexGrow: 1,
          }}
        >
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

          {/* Edit Career Pathways */}
          <Typography variant="h6" gutterBottom paddingBottom={"30px"}>
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

          {/* Testimonials */}
          <Typography variant="h6" marginTop={4} marginBottom={3} gutterBottom>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveTestimonial(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddTestimonial} variant="contained">
            Add Testimonial
          </Button>
        </Box>

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
