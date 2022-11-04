import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const linkStyle = { textDecoration: "none" };

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRedirect = (link) => {
    navigate(link);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button
            onClick={() => {
              onRedirect("/login");
            }}
          >
            <Typography variant="body1">Login</Typography>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            onClick={() => {
              onRedirect("/anecdotes");
            }}
          >
            <Typography variant="body1">Anecdotes</Typography>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            onClick={() => {
              onRedirect("/create");
            }}
          >
            <Typography variant="body1">Create</Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              onRedirect("/");
            }}
          >
            <Typography variant="body1">Home</Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              onRedirect("/users");
            }}
          >
            <Typography variant="body1">Users</Typography>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
