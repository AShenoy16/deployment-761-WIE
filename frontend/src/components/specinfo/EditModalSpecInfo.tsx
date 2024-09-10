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
import { useState, useEffect } from "react";
import GradientBox from "../GradientBox";
import axios from "axios";
import { Specialization } from "../../types/Specialization";

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
    careerPathways: string[];
    header: string;
    leftDetail: string;
    rightDetail: string;
  } | null;
  name: string;
  onSave: (updatedSpecialization: Partial<Specialization>) => void; 
}



const EditModalSpecInfo: React.FC<EditModalSpecInfoProps> = ({
  open,
  onClose,
  specInfoResult,
  name,
  onSave
}) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [careerPathways, setCareerPathways] = useState<string[]>([]);
  const [header, setHeader] = useState<string>("");
  const [leftDetail, setLeftDetail] = useState<string>("");
  const [rightDetail, setRightDetail] = useState<string>("");

  useEffect(() => {
    if (specInfoResult) {
      setCareerPathways(specInfoResult.careerPathways);
      setHeader(specInfoResult.header);
      setLeftDetail(specInfoResult.leftDetail);
      setRightDetail(specInfoResult.rightDetail);
    }
  }, [specInfoResult]);

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

  const handleSaveChanges = async () => {
    // Sanitize the fields
    const sanitizedHeader = header.trim().replace(/\s+/g, " ");
    const sanitizedLeftDetail = leftDetail.trim().replace(/\s+/g, " ");
    const sanitizedRightDetail = rightDetail.trim().replace(/\s+/g, " ");
    const sanitizedCareerPathways = careerPathways.map((pathway) =>
      pathway.trim().replace(/\s+/g, " ")
    );
    const response = await axios.patch(
      `${API_BASE_URL}/specializations/${encodeURIComponent(name)}`,
      {
        header: sanitizedHeader,
        careerPathways: sanitizedCareerPathways,
        leftDetail: sanitizedLeftDetail,
        rightDetail: sanitizedRightDetail,
      }
    );
    onSave(response.data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <GradientBox sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton edge="start" color="inherit" onClick={onClose}>
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

        {/* Form Content */}
        <Box
          sx={{
            overflowY: "auto",
            paddingRight: "16px",
            marginBottom: "16px",
            flexGrow: 1,
          }}
        >
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
                  backgroundColor: "white",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
                InputLabelProps={{
                  sx: {
                    transform: "translate(5px, -15px) scale(0.85)", // Adjust the label position and size
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
            Header
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
          />

          {/* Edit Left Detail */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Left Detail
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
          />

          {/* Edit Right Detail */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Right Detail
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
          />
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
