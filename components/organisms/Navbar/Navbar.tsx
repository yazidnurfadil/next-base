"use client";

import { Navbar, NavbarContent } from "@heroui/react";

import { NavbarUser } from "@/components/molecules/NavbarUser";
import { BurgerButton } from "@/components/molecules/BurgerButton";

interface NavbarWrapperProps {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarWrapperProps) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurgerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden"></NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:grow-0"
        >
          <NavbarContent>
            <NavbarUser />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
