import React from "react";

export interface PrivateRouterProps {
  children: React.ReactNode;
  permistion: boolean;
}

export interface PropsVoid {
  [key: string]: () => void;
}
