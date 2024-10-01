import { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import RoleModelCard from "./RoleModelCard";
import { IRoleModel } from "../../types/RoleModel";

const HorizontalRoleModelList = ({
  specRoleModels,
  handleRoleModelCardClick,
}: {
  specRoleModels: IRoleModel[];
  handleRoleModelCardClick: (model: IRoleModel) => void;
}) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if the content overflows the container
  useEffect(() => {
    const checkOverflow = () => {
      if (stackRef.current) {
        setIsOverflowing(
          stackRef.current.scrollWidth > stackRef.current.clientWidth
        );
      }
    };

    // Check on mount and when the window resizes
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [specRoleModels]);

  return (
    <Stack
      ref={stackRef}
      p="1.25rem"
      direction="row"
      gap={2}
      overflow="auto"
      justifyContent={isOverflowing ? "flex-start" : "center"} // Center if no overflow
    >
      {specRoleModels.map((roleModel) => (
        <Box key={roleModel._id} maxWidth="600px" flexShrink={0}>
          <RoleModelCard model={roleModel} onClick={handleRoleModelCardClick} />
        </Box>
      ))}
    </Stack>
  );
};

export default HorizontalRoleModelList;
