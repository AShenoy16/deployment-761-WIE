import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import highMeterIcon from "../assets/img-high-meter.png";
import lowMeterIcon from "../assets/img-low-meter.png";
import mediumMeterIcon from "../assets/img-medium-meter.png";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import EditModalSpecInfo from "../components/specinfo/EditModalSpecInfo";
import { useAuthStore } from "../stores/AuthenticationStore";
import { useSnackbarStore } from "../stores/SnackBarStore";
import { Specialization } from "../types/Specialization";
import uoaEngBuilding from "/engineering-building.jpg"; // Fallback image if needed
import { IRoleModel } from "../types/RoleModel";
import RoleModelModal from "../components/rolemodel/RoleModelModal";
import HorizontalRoleModelList from "../components/rolemodel/HorizontalRoleModelList";
import { API_BASE_URL } from "../util/common";
import AnimatedContainer from "../components/AnimatedContainer";

// Button styles
const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
  fontSize: "1rem",
  padding: "12px 24px",
  height: "40px",
};

const SpecDetailPage: React.FC = () => {
  const theme = useTheme();
  const { name } = useParams<{ name: string }>(); // Get specialization name from route params
  const formattedName = name?.replace(/-/g, " ") || ""; // Format name by replacing hyphens with spaces
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn); // Check if admin is logged in
  const [openEditModal, setEditModal] = useState<boolean>(false); // State for edit modal
  const handleEditModalOpen = (): void => setEditModal(true); // Open edit modal
  const handleEditModalClose = (): void => setEditModal(false); // Close edit modal
  const message = useSnackbarStore((state) => state.message);
  const isOpen = useSnackbarStore((state) => state.isOpen);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);
  const severity = useSnackbarStore((state) => state.severity);
  const handleSnackBarClose = (): void => setIsOpen(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [specialization, setSpecialization] = useState<Specialization | null>(
    null
  );
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [meterImage, setMeterImage] = useState<string>(""); // Career info Job availability meter image state

  const handleSaveChanges = (updatedData: Partial<Specialization>) => {
    if (specialization) {
      const updatedSpecialization = {
        ...specialization, // Keep existing fields
        ...updatedData, // Override with updated fields from modal
      };
      setSpecialization(updatedSpecialization); // Update state with the new specialization data
    }
  };

  const [specRoleModels, setSpecRoleModels] = useState<IRoleModel[]>([]);
  const [selectedRoleModel, setSelectedRoleModel] = useState<IRoleModel | null>(
    null
  );
  const [isRoleModelModalOpen, setIsRoleModelModalOpen] = useState(false);

  const handleRoleModelCardClick = (model: IRoleModel) => {
    setSelectedRoleModel(model);
    setIsRoleModelModalOpen(true);
  };

  const handleCloseRoleModelModal = () => {
    setIsRoleModelModalOpen(false);
  };

  useEffect(() => {
    const getSpecRoleModels = async () => {
      try {
        if (specialization?.name) {
          const response = await axios.get(
            `${API_BASE_URL}/role-models/${encodeURIComponent(specialization?.name)}`,
            { validateStatus: (status) => status < 500 } // So empty role models 404 resp doesn't get treated as error
          );
          setSpecRoleModels(response.data);
        }
      } catch (err) {
        console.error("Error fetching role models for specialization: ", err);
        setError("Failed to fetch specialization role models.");
      } finally {
        setLoading(false);
      }
    };
    getSpecRoleModels();
  }, [specialization]);

  // Fetch specialization details from the backend
  useEffect(() => {
    const setMeter = async () => {
      switch (specialization?.jobAvailability) {
        case "Low":
          setMeterImage(lowMeterIcon);
          break;
        case "Medium":
          setMeterImage(mediumMeterIcon);
          break;
        case "High":
          setMeterImage(highMeterIcon);
          break;
        default:
          setMeterImage(mediumMeterIcon);
      }
    };

    setMeter();
  }, [specialization]);

  // Fetch specialization details from the backend
  useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/specializations/${encodeURIComponent(formattedName)}`
        );
        setSpecialization(response.data); // Set the fetched specialization data
      } catch (err) {
        console.error("Error fetching specialization:", err);
        setError("Failed to fetch specialization details.");
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchSpecialization();
  }, [name]);

  // Handle loading and error states
  if (loading) return <LoadingSpinnerScreen />;
  if (error) return <Typography>{error}</Typography>;
  if (!specialization) return <Typography>Specialization not found</Typography>;

  // Get the image URLs from the API or use a fallback
  const leftImageUrl = specialization.leftImage
    ? `${API_BASE_URL}${specialization.leftImage}`
    : uoaEngBuilding;
  const rightImageUrl = specialization.rightImage
    ? `${API_BASE_URL}${specialization.rightImage}`
    : uoaEngBuilding;
  const regex = /\s*engineering\s*/gi; // 'g' for global match, 'i' for case-insensitive

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Top Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${uoaEngBuilding})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: {
            xs: "40px 20px",
            sm: "60px 20px",
          },
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "65vh",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        />
        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "left",
            marginLeft: {
              xs: "20px",
              sm: "50px",
            },
            maxWidth: {
              xs: "calc(100% - 40px)",
              sm: "600px",
              md: "50%",
            },
          }}
        >
          <AnimatedContainer>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "2.5rem",
                  sm: "3rem",
                  md: "4.5rem",
                },
                paddingBottom: "20px",
              }}
            >
              {specialization.name}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
              }}
            >
              {specialization.header}
            </Typography>
            {/* Edit Button */}
            {isAdminLoggedIn && (
              <Box my={"3rem"}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditModalOpen}
                  sx={buttonStyle}
                >
                  Edit
                </Button>
              </Box>
            )}
          </AnimatedContainer>
        </Box>
        <Box
          sx={{
            position: "relative",
            marginRight: {
              xs: "20px",
              sm: "50px",
            },
            maxWidth: {
              xs: "calc(100% - 40px)",
              sm: "600px",
              md: "50%",
            },
          }}
        >
          <AnimatedContainer animationType="zoomIn" delay={0.15}>
            {specialization.testimonials.length > 0 &&
              specialization.testimonials.map((testimonial, index) => (
                <Box key={index} pb="1.25rem">
                  <Typography
                    variant="body1"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    <Typography
                      component="span"
                      fontSize="inherit"
                      fontWeight="200"
                    >
                      {`" `}
                    </Typography>
                    {testimonial.description}
                    <Typography
                      component="span"
                      fontSize="inherit"
                      fontWeight="200"
                    >
                      {` "`}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize="1rem"
                    textAlign="center"
                    fontStyle="italic"
                  >
                    - {testimonial.name}
                  </Typography>
                </Box>
              ))}
          </AnimatedContainer>
        </Box>
      </Box>

      {/* Impact Section */}
      <AnimatedContainer delay={0.4} animationType="slideUp">
        <Box sx={{ minHeight: "100vh" }}>
          <Grid container>
            {/* Left Detail */}
            <Grid item xs={12} md={6}>
              <Card sx={{ minHeight: "50vh", alignContent: "center" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: {
                      xs: "20px",
                      sm: "50px",
                    },
                    width: {
                      xs: "calc(100% - 40px)",
                      sm: "80%",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: "#00467F",
                      fontWeight: "bold",
                    }}
                  >
                    Impact
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      color: "#00467F",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {specialization.leftDetail}
                  </Typography>

                  {/* Edit Modal */}
                  <EditModalSpecInfo
                    open={openEditModal}
                    onClose={handleEditModalClose}
                    specInfoResult={specialization}
                    name={formattedName}
                    onSave={handleSaveChanges}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Right Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${rightImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Grid>
          </Grid>

          <Grid container>
            {/* Left Image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${leftImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Grid>

            {/* Right Detail */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  minHeight: "50vh",
                  borderRadius: "0",
                  alignContent: "center",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: {
                      xs: "calc(100% - 40px)",
                      sm: "80%",
                    },
                    marginLeft: {
                      xs: "20px",
                      sm: "50px",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      color: "#00467F",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {specialization.rightDetail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </AnimatedContainer>

      {/* Career Info Section */}
      <AnimatedContainer delay={0.25} animationType="fade">
        <Box
          sx={{
            padding: "20px",
            "& li": {
              marginBottom: "10px",
            },
            fontWeight: "bold",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={1}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ color: "#00467F", fontWeight: "bold", textAlign: "center" }}
            >
              Career Information
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.4rem",
                },
              }}
            >
              Average {specialization.name.replace(regex, "")} Engineer Career
              Outlook
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignContent={"center"}
            alignItems={"center"}
            sx={{
              justifyContent: "space-evenly",
              marginTop: 2,
            }}
          >
            <Stack
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#00467F",
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.5rem",
                  },
                }}
              >
                Job Availability
              </Typography>
              <Box
                component="img"
                sx={{
                  maxWidth: "20rem",
                }}
                src={meterImage}
              />
              <Typography
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.5rem",
                  },
                }}
              >
                {specialization.jobAvailability}
              </Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#00467F",
                    fontSize: "1.5rem",
                  }}
                >
                  Median Salary
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  ${specialization.medianSalary.toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  per year
                </Typography>
              </Stack>
              <Stack
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#00467F",
                    fontSize: "1.5rem",
                  }}
                >
                  Experienced Salary
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  ${specialization.experiencedSalary.toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  per year
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            sx={{
              color: "#00467F",
              fontSize: "1rem",
              textAlign: "right",
              fontStyle: "italic",
            }}
          >
            Source: {specialization.source}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#00467F",
            color: "white",
            py: 7,
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Career Pathways
          </Typography>
          <Typography variant="h6" gutterBottom>
            {`Potential Career options as a ${specialization.name} Graduate`}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              paddingTop: "20px",
              justifyContent: "center", // Center items horizontally
              textAlign: "center", // Center text in the grid items if needed
            }}
          >
            <Grid item xs={12} md={6}>
              <ul
                style={{
                  display: "grid",
                  gridTemplateRows: "repeat(3, 1fr)", // Fixed 3 rows
                  gridAutoFlow: "column", // Fill the grid by columns first
                  rowGap: "10px",
                  columnGap: "20px",
                  padding: 0,
                  margin: 0,
                  listStylePosition: "inside",
                  maxWidth: "100%", // Ensure grid stays within the container's width
                }}
              >
                {specialization.careerPathways.map((pathway, index) => (
                  <li key={index}>{pathway}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>
      </AnimatedContainer>

      {/* Role Models Section */}
      <AnimatedContainer delay={0.25} animationType="zoomIn">
        <Box pt="1.25rem" mt={1}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ color: "#00467F", fontWeight: "bold", textAlign: "center" }}
          >
            See some inspiring role models who studied this specialization!
          </Typography>

          {isAdminLoggedIn && (
            <Box display="flex" justifyContent="center" padding="10px">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditModalOpen}
                sx={buttonStyle}
              >
                Edit
              </Button>
            </Box>
          )}

          <HorizontalRoleModelList
            specRoleModels={specRoleModels}
            handleRoleModelCardClick={handleRoleModelCardClick}
          />
        </Box>
      </AnimatedContainer>

      <RoleModelModal
        open={isRoleModelModalOpen}
        onClose={handleCloseRoleModelModal}
        roleModel={selectedRoleModel}
      />

      {/* Snack Bar */}
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={() => setIsOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SpecDetailPage;
