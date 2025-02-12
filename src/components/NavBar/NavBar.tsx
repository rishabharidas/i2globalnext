"use client";

import { useState } from "react";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["About ", "Notes", "Account"].map((text, index) => (
          <ListItem key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <div className="w-full flex justify-between h-full items-center max-w-[1320px]">
        <Link href="/" className="text-3xl">
          Keep Notes
        </Link>
        <span className="hidden md:flex gap-6">
          <Link href={"#"}> About</Link>
          <Link href={"#"}> Notes</Link>
          <Link href={"#"}> Account</Link>
        </span>
        <Button
          variant="text"
          className="block md:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuIcon fontSize="large" />
        </Button>
      </div>
    </>
  );
}
