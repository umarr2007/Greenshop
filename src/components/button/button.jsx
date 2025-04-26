import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
  googleName: PropTypes.string, // yangi props - googleName
};

function MainButton({ children, googleName }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#46A358",
        textTransform: "none",
        fontWeight: 600,
        px: "16px",
        py: "8px",
        zIndex: "999",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{ fontSize: "16px", fontWeight: "400", lineHeight: "100%" }}
      >
        {googleName ? googleName : children}
      </Typography>
    </Button>
  );
}

export default MainButton;
