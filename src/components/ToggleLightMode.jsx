import { Switch } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/Theme";

const ToggleLightMode = () => {
  const { checked, toggleTheme } = useContext(ThemeContext);
  return (
    <section className="ToggleLightMode">
      <span className="ToggleLightMode--inline-text">Light</span>
      <Switch
        checked={checked}
        onChange={toggleTheme}
        size="large"
        color="error"
        inputProps={{ "aria-label": "Dark Mode Toggle" }}
      />
      <span className="ToggleLightMode--inline-text">Dark</span>
    </section>
  );
};

export default ToggleLightMode;
