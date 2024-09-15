import { Stack, Button, CircularProgress } from "@mui/material";

type QuestionEditorLayoutProps = {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
  children?: React.ReactNode;
};

const QuestionEditorLayout: React.FC<QuestionEditorLayoutProps> = ({
  onCancel,
  onSave,
  isLoading,
  children,
}) => {
  return (
    <>
      {children}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={18} sx={{ mr: 0.25 }} /> : null
          }
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>
    </>
  );
};

export default QuestionEditorLayout;
