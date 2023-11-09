"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteBlog from "@/app/blogs/my-blogs/DeleteBlog";

const options = [
  { title: "Edit", icon: <EditIcon fontSize="small" /> },
  { title: "Delete", icon: <DeleteIcon fontSize="small" /> },
];

export default function EditMenuButton({ blog }: { blog: Blog }) {
  const [action, setAction] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        className="text-white"
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
            className="text-gray-800"
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
      {action === "Edit" && <p>Edit is clicked</p>}
      {action === "Delete" && <DeleteBlog blog={blog} setAction={setAction} />}
    </div>
  );
}
