import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
    borderRadius: '4px',
    borderColor: '#000', // Customize this color as needed
    color: '#000', // Customize this color as needed
    padding: '8px 16px', // Ensure consistent padding
    margin: '4px', // Add margin for spacing
    '&:hover': {
      backgroundColor: '#f0f0f0', // Customize this color as needed
    }
  });

const CustomButton = ({ children, ...props }) => {
  return <StyledButton variant="outlined" size="small" fullWidth sx={{fontWeight: "light", fontSize : "8px"}} {...props}>{children}</StyledButton>;
};

export default CustomButton;
