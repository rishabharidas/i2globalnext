"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const tabItems = ["Notes", "About", "Account"];

  const selectedTab =
    pathname == "/"
      ? "Notes"
      : pathname == "/about"
        ? "About"
        : pathname == "/account"
          ? "Account"
          : "";

  const handleTabChange = (e?: React.SyntheticEvent | null, value?: string) => {
    if (value) {
      router.push(`/${value == "Notes" ? "" : value.toLowerCase()}`);
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Notes", "About", "Account"].map((text, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={text}
              onClick={() => handleTabChange(null, text)}
            />
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
        <Link href="/" className="text-3xl font-semibold">
          Keep Notes
        </Link>
        <span className="hidden md:flex gap-6">
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {tabItems.map((item, index) => {
              return (
                <Tab
                  label={item}
                  key={index}
                  value={item}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                />
              );
            })}
          </Tabs>
        </span>
        <span className="block md:hidden" onClick={() => setOpen(true)}>
          <MenuIcon fontSize="large" />
        </span>
      </div>
    </>
  );
}
