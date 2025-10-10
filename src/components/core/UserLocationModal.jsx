import {
  Box,
  Typography,
  List,
  ListItemText,
  Modal,
  IconButton,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import moment from "moment";
const UserLocationModal = ({
  openModal,
  onCloseModal,
  locationUser,
  loading,
}) => {
  return (
    <>
      {/* Modal */}
      <Modal open={openModal} onClose={() => onCloseModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            width: "90%",
            maxWidth: 400,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Ubicaciones recientes</Typography>
            <IconButton size="small" onClick={() => onCloseModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 🔄 Estado de carga */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : locationUser?.length === 0 ? (
            <Typography color="text.secondary" align="center">
              Sin coordenadas registradas.
            </Typography>
          ) : (
            <List>
              {locationUser?.map((loc, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() =>
                    window.open(
                      `https://www.openstreetmap.org/?mlat=${loc.latitude}&mlon=${loc.longitude}#map=17/${loc.latitude}/${loc.longitude}`,
                      "_blank"
                    )
                  }
                >
                  <ListItemText
                    // primary={`${loc.latitude}, ${loc.longitude}`}
                    secondary={moment(loc.created_at).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserLocationModal;
