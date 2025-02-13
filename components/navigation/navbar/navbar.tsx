"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";

import Image from "next/image";
import ojtlogo from "@/public/images/ojtlogo.png";
const MarkLogo = () => (
  <Image src={ojtlogo} alt="Mark Logo" width={36} height={36} />
);

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Profile", "Home", "My Settings", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <MarkLogo />

          <Link aria-current="page" href="/">
            <p className="font-bold text-inherit">MARK</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/To-do">
            To-do
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/OJT-Requirements">
            OJT-Requirements
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Documentations">
            Documentations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
