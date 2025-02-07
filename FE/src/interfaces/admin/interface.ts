import { ReactNode } from "react";
import { stateAttribute } from "./Api";

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
export interface ModalIntefaceProps{
  handleClose : ()=> void,
  data:stateAttribute 
}
