import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import placeholder from "../../assets/placeholder.jpg";
import { useSnackbarStore } from "../../stores/SnackBarStore";
import { API_BASE_URL } from "../../util/common";

interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  section1Header: string;
  section1Text: string;
  section2Header: string;
  section2Text: string;
  additionalResources: Card[];
}

interface EditHomepageModalProps {
  open: boolean;
  handleClose: () => void;
  initialData: HomePageData | null;
  onSubmit: (data: HomePageData) => void;
}

const EditHomepageModal: React.FC<EditHomepageModalProps> = ({
  open,
  handleClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<HomePageData | null>(null); // Start with null
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [canSubmit, setCanSubmit] = useState(true);
  const { setMessage, setIsOpen } = useSnackbarStore();
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const heroImageInputRef = useRef<HTMLInputElement | null>(null);

  // Update formData when the modal opens
  useEffect(() => {
    if (open && initialData) {
      setFormData(JSON.parse(JSON.stringify(initialData)));
      // reset errors
      setErrors({});
    }
  }, [open, initialData]);

  // Check if there are any empty required fields
  useEffect(() => {
    const hasEmptyFields =
      !formData?.heroTitle ||
      !formData?.heroSubtitle ||
      !formData?.section1Header ||
      !formData?.section1Text ||
      !formData?.section2Header ||
      !formData?.section2Text ||
      formData?.additionalResources.some(
        (card) => !card.title || !card.description || !card.link
      );

    setCanSubmit(!hasEmptyFields); // Disable button if any required field is empty
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: !value }); // Set error if field is empty
    }
  };

  const handleCardChange = (index: number, key: keyof Card, value: string) => {
    if (formData) {
      const updatedResources = [...formData.additionalResources];
      updatedResources[index] = { ...updatedResources[index], [key]: value };
      setFormData({ ...formData, additionalResources: updatedResources });
      // Set error if required card field is empty
      if (key === "title" || key === "description" || key === "link") {
        setErrors({ ...errors, [`card-${index}-${key}`]: !value });
      }
    }
  };

  const handleAddCard = () => {
    if (formData) {
      const newCard: Card = {
        title: "Default title",
        description: "Default Description",
        image: "",
        link: "https://www.google.com",
      };
      setFormData({
        ...formData,
        additionalResources: [...formData.additionalResources, newCard],
      });
    }
  };

  const handleRemoveCard = (index: number) => {
    setCardToRemove(index);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveCard = () => {
    if (formData && cardToRemove !== null) {
      const updatedResources = formData.additionalResources.filter(
        (_, i) => i !== cardToRemove
      );
      setFormData({ ...formData, additionalResources: updatedResources });
      setCardToRemove(null);
      setConfirmDialogOpen(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const file = e.target.files?.[0] || null;
      setHeroImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit || !formData) return;

    const {
      heroTitle,
      heroSubtitle,
      section1Header,
      section1Text,
      section2Header,
      section2Text,
      additionalResources,
    } = formData;

    const hasEmptyFields =
      !heroTitle ||
      !heroSubtitle ||
      !section1Header ||
      !section1Text ||
      !section2Header ||
      !section2Text ||
      additionalResources.some((card) => !card.title || !card.description);

    if (hasEmptyFields) {
      setMessage("Please fill out all required fields.");
      setIsOpen(true);
      return; // Prevent submission if there are empty fields
    }

    const updatedResources = additionalResources.map((card) => ({
      ...card,
      image: card.image || placeholder,
    }));

    const formDataBack = new FormData();

    // Append fields to formData, including the file
    formDataBack.append("heroTitle", heroTitle);
    formDataBack.append("heroSubtitle", heroSubtitle);

    // If heroImage is a File, append it to FormData
    if (heroImage) {
      formDataBack.append("heroImage", heroImage); // heroImage is a file
    }

    formDataBack.append("section1Header", section1Header);
    formDataBack.append("section1Text", section1Text);
    formDataBack.append("section2Header", section2Header);
    formDataBack.append("section2Text", section2Text);

    // Convert additionalResources to JSON and append it
    formDataBack.append(
      "additionalResources",
      JSON.stringify(updatedResources)
    );

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/homepage`,
        formDataBack,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSubmit(response.data);
      setMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating homepage data:", error);
      setMessage("Error updating homepage data.");
    }
    setIsOpen(true);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 1,
          maxWidth: "70%",
          margin: "auto",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Home Page
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            paddingRight: 2,
            marginBottom: 2,
          }}
        >
          {formData && (
            <>
              <TextField
                name="heroTitle"
                label="Hero Title"
                value={formData.heroTitle}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.heroTitle}
                helperText={errors.heroTitle ? "This field is required" : ""}
              />
              <TextField
                name="heroSubtitle"
                label="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.heroSubtitle}
                helperText={errors.heroSubtitle ? "This field is required" : ""}
              />

              <input
                type="file"
                accept="image/*"
                ref={heroImageInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e)}
              />
              <Stack
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 5,
                }}
              >
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => heroImageInputRef.current?.click()}
                >
                  {heroImage ? `Uploaded Image:` : "Choose Image"}
                </Button>

                {(formData.heroImage || heroImage) && (
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
                    onClick={() => heroImageInputRef.current?.click()}
                  >
                    {/* Image Element */}
                    <Box
                      component="img"
                      sx={{
                        maxHeight: { xs: 130, md: 190 },
                      }}
                      src={
                        heroImage
                          ? URL.createObjectURL(heroImage)
                          : `${API_BASE_URL}${formData.heroImage}`
                      }
                      alt="Hero"
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
                )}
              </Stack>

              <Typography variant="h6" component="h3" gutterBottom>
                Section One
              </Typography>
              <TextField
                name="section1Header"
                label="Section 1 Header"
                value={formData.section1Header}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.section1Header}
                helperText={
                  errors.section1Header ? "This field is required" : ""
                }
              />
              <TextField
                name="section1Text"
                label="Section 1 Text"
                value={formData.section1Text}
                onChange={handleInputChange}
                multiline
                fullWidth
                rows={4}
                margin="normal"
                required
                error={!!errors.section1Text}
                helperText={errors.section1Text ? "This field is required" : ""}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Section Two
              </Typography>

              <TextField
                name="section2Header"
                label="Section 2 Header"
                value={formData.section2Header}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.section2Header}
                helperText={
                  errors.section2Header ? "This field is required" : ""
                }
              />
              <TextField
                name="section2Text"
                label="Section 2 Text"
                value={formData.section2Text}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                required
                error={!!errors.section2Text}
                helperText={errors.section2Text ? "This field is required" : ""}
              />

              <Typography variant="h6" component="h3" gutterBottom>
                Additional Resources
              </Typography>
              {formData.additionalResources.map((card, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Card {index + 1}
                  </Typography>
                  <TextField
                    label="Title"
                    value={card.title}
                    onChange={(e) =>
                      handleCardChange(index, "title", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors[`card-${index}-title`]}
                    helperText={
                      errors[`card-${index}-title`]
                        ? "This field is required"
                        : ""
                    }
                    inputProps={{ maxLength: 38 }}
                  />
                  <TextField
                    label="Description"
                    value={card.description}
                    onChange={(e) =>
                      handleCardChange(index, "description", e.target.value)
                    }
                    multiline
                    fullWidth
                    rows={4}
                    margin="normal"
                    required
                    error={!!errors[`card-${index}-description`]}
                    helperText={
                      errors[`card-${index}-description`]
                        ? "This field is required"
                        : ""
                    }
                    inputProps={{ maxLength: 125 }}
                  />
                  <TextField
                    label="Image URL"
                    value={card.image}
                    onChange={(e) =>
                      handleCardChange(index, "image", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Link"
                    value={card.link}
                    onChange={(e) =>
                      handleCardChange(index, "link", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors[`card-${index}-link`]}
                    helperText={
                      errors[`card-${index}-link`]
                        ? "This field is required"
                        : ""
                    }
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveCard(index)}
                  >
                    Remove Card
                  </Button>
                </Box>
              ))}

              <Button variant="contained" onClick={handleAddCard}>
                Add New Card
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Save Changes
          </Button>
        </Box>

        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to remove this card?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmRemoveCard} color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default EditHomepageModal;
