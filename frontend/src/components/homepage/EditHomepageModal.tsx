import React, { useState } from "react";
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
} from "@mui/material";

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

const defaultImage = "https://via.placeholder.com/150"; // Default image URL

const EditHomepageModal: React.FC<EditHomepageModalProps> = ({
  open,
  handleClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<HomePageData | null>(initialData);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCardChange = (index: number, key: keyof Card, value: string) => {
    if (formData) {
      const updatedResources = [...formData.additionalResources];
      updatedResources[index] = { ...updatedResources[index], [key]: value };
      setFormData({ ...formData, additionalResources: updatedResources });
    }
  };

  const handleAddCard = () => {
    if (formData) {
      const newCard: Card = {
        title: "",
        description: "",
        image: "",
        link: "",
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
    if (formData) {
      const updatedResources = formData.additionalResources.map((card) => ({
        ...card,
        image: card.image || defaultImage, // Set default image if empty
      }));
      onSubmit({ ...formData, additionalResources: updatedResources });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 1,
          maxWidth: "90%",
          width: "600px",
          margin: "auto",
          marginTop: "5%",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Home Page
        </Typography>

        {/* Wrapping all modal content in a Box */}
        <Box>
          {formData && (
            <>
              <TextField
                name="heroTitle"
                label="Hero Title"
                value={formData.heroTitle}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="heroSubtitle"
                label="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="heroImage"
                label="Hero Image URL"
                value={formData.heroImage}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="section1Header"
                label="Section 1 Header"
                value={formData.section1Header}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="section1Text"
                label="Section 1 Text"
                value={formData.section1Text}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                name="section2Header"
                label="Section 2 Header"
                value={formData.section2Header}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
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
                  />
                  <TextField
                    label="Description"
                    value={card.description}
                    onChange={(e) =>
                      handleCardChange(index, "description", e.target.value)
                    }
                    fullWidth
                    margin="normal"
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

              <Button
                variant="contained"
                onClick={handleAddCard}
                sx={{ marginTop: 2 }}
              >
                Add New Card
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
            </>
          )}
        </Box>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to remove this card?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmRemoveCard} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default EditHomepageModal;
