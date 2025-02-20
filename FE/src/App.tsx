import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { router } from "./routes/router";
import React, { useEffect } from "react";
import PrivateRouter from "./Features/Middleware/PrivateRouter";
import { Toaster } from "react-hot-toast";
import { useTour } from "@reactour/tour";
const App = () => {
  const { setIsOpen } = useTour();
  useEffect(() => {
    const isNew = localStorage?.getItem("isNew");

    
    if (!isNew) {
      setIsOpen(true);
      localStorage.setItem("isNew", "true");
    }
  }, [setIsOpen]);
  return (
    <BrowserRouter>
      <Routes>
        {router?.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || React.Fragment;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout permistion={false}>
                  {route?.authenticate ? (
                    <PrivateRouter permistion={route.permistion}>
                      <Page />
                    </PrivateRouter>
                  ) : (
                    <Page />
                  )}
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
