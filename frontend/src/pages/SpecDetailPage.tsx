import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import highMeterIcon from "../assets/high-meter.png";
import lowMeterIcon from "../assets/low-meter.png";
import mediumMeterIcon from "../assets/medium-meter.png";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import EditModalSpecInfo from "../components/specinfo/EditModalSpecInfo";
import { useAuthStore } from "../stores/AuthenticationStore";
import { useSnackbarStore } from "../stores/SnackBarStore";
import { Specialization } from "../types/Specialization";
import uoaEngBuilding from "/engineering-building.jpg"; // Fallback image if needed
import { IRoleModel } from "../types/RoleModel";
import RoleModelModal from "../components/rolemodel/RoleModelModal";
import HorizontalRoleModelList from "../components/rolemodel/HorizontalRoleModelList";

// Button styles
const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
  fontSize: "1.25rem",
  padding: "12px 24px",
  height: "48px",
};

const SpecDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get specialization name from route params
  const formattedName = name?.replace(/-/g, " ") || ""; // Format name by replacing hyphens with spaces
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from environment variables
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn); // Check if admin is logged in
  const [openEditModal, setEditModal] = useState<boolean>(false); // State for edit modal
  const handleEditModalOpen = (): void => setEditModal(true); // Open edit modal
  const handleEditModalClose = (): void => setEditModal(false); // Close edit modal
  const message = useSnackbarStore((state) => state.message);
  const isOpen = useSnackbarStore((state) => state.isOpen);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);
  const handleSnackBarClose = (): void => setIsOpen(false);

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
          alignItems: "center",
          minHeight: "100vh",
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
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "2.5rem",
                sm: "3rem",
                md: "5rem",
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
            <Box mt={"3rem"}>
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
        </Box>
      </Box>

      {/* Impact Section */}
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
                  gutterBottom
                  sx={{
                    color: "#00467F",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "2.5rem",
                    },
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

          {/* Left Image */}
          <Grid item xs={12} md={6}>
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
        </Grid>

        {/* Right Detail */}
        <Grid container>
          {/* Right Image */}
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
                backgroundImage: `url(${rightImageUrl})`,
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

      {/* Career Info Section */}
      <Box
        sx={{
          padding: "20px",
          "& li": {
            marginBottom: "10px",
          },
          fontWeight: "bold",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#00467F",
            fontWeight: "bold",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Career Information
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#00467F",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
              md: "2rem",
            },
          }}
        >
          Average {specialization.name.replace(regex, "")} Engineer Career
          Outlook
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignContent={"center"}
          sx={{
            justifyContent: "space-evenly",
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
                  xs: "1.5rem",
                  sm: "2rem",
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
                color: "#00467F",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
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
            <Typography
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#00467F",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                },
              }}
            >
              Average Pay
            </Typography>
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
                  color: "#00467F",
                  fontSize: "1.5rem",
                }}
              >
                ${specialization.medianSalary.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  color: "#00467F",
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
                  color: "#00467F",
                  fontSize: "1.5rem",
                }}
              >
                ${specialization.experiencedSalary.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  color: "#00467F",
                  fontSize: "1rem",
                }}
              >
                per year
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Career Pathways Section */}
      <Box
        sx={{
          backgroundColor: "#00467F",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          "& li": {
            marginBottom: "10px",
          },
          fontWeight: "bold",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
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
            marginLeft: "10px",
            paddingTop: "20px",
          }}
        >
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
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

      {/* Role Models Section */}
      <Box pt="1.25rem">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          {specRoleModels.length > 0 &&
            "See some inspiring role models who studied this specialization!"}
        </Typography>

        {/** TODO: Move this somewhere else appropriate since testimonials will be moved later */}
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
        message={message}
      />
    </Box>
  );
};

export default SpecDetailPage;
