import { ReactNode } from "react";

export interface AdminLayoutProps {
  children: ReactNode;
}
export interface MenuItem {
  icon: string;
  text: string;
  url: string;
}

export interface SideBarProps {
  onMenuItemClick: (menuItem: string) => void;
}
