import PropTypes from "prop-types";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FormLogin from "./form-login";
import FormRegister from "./form-register";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function BasicTabs({ setOpen2 }) {
  const [tabIndex, changeTab] = useState(0); // `setTabIndex` emas, `changeTab` deb nomladik

  const switchTab = (_, index) => changeTab(index); // setTabIndex ni bevosita ishlatmadik

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={switchTab} 
          sx={{ width: "200px" }}
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIndex} index={0}>
        <FormLogin setOpen2={setOpen2} />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <FormRegister setOpen2={setOpen2} />
      </CustomTabPanel>
    </Box>
  );
}

BasicTabs.propTypes = {
  setOpen2: PropTypes.func.isRequired,
};
