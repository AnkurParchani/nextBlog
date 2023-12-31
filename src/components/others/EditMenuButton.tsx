"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteBlog from "@/app/blogs/my-blogs/DeleteBlog";
import EditBlog from "@/app/blogs/my-blogs/EditBlog";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

const options = [
  { title: "Edit", icon: <EditIcon fontSize="small" /> },
  { title: "Delete", icon: <DeleteIcon fontSize="small" /> },
];

export default function EditMenuButton({ blog }: { blog: Blog }) {
  const [action, setAction] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useSelector(getTheme);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLElement) {
      const action = event.target.dataset.action;
      setAction(action as string);
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={handleClose}
            style={{ color: "#1F2937" }}
          >
            <div className="flex gap-2 items-center" data-action={option.title}>
              {" "}
              {option.icon}
              {option.title}
            </div>
          </MenuItem>
        ))}
      </Menu>

      {/* Models according to different action types */}
      {action === "Edit" && <EditBlog blog={blog} setAction={setAction} />}
      {action === "Delete" && <DeleteBlog blog={blog} setAction={setAction} />}
    </div>
  );
}
