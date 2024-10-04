import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import placeholder from "../../assets/placeholder.jpg";
import { useSnackbarStore } from "../../stores/SnackBarStore";

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
  const [formData, setFormData] = useState<HomePageData | null>(initialData);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [canSubmit, setCanSubmit] = useState(true);
  const { setMessage, setIsOpen } = useSnackbarStore();

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

  const handleSubmit = () => {
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

    onSubmit({ ...formData, additionalResources: updatedResources });
    setMessage("Changes saved successfully!");
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
              <TextField
                name="heroImage"
                label="Hero Image URL"
                value={formData.heroImage}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
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
