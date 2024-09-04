import { Stack, Button } from "@mui/material";

type QuestionEditorLayoutProps = {
  onCancel: () => void;
  onSave: () => void;
  children?: React.ReactNode;
};

const QuestionEditorLayout: React.FC<QuestionEditorLayoutProps> = ({
  onCancel,
  onSave,
  children,
}) => {
  return (
    <>
      {children}
      <Stack direction="row" spacing={2} justifyContent="center" marginTop={4}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Stack>
    </>
  );
};

export default QuestionEditorLayout;
