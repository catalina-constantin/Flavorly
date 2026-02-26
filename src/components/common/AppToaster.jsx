import React from "react";
import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          padding: "16px",
          borderRadius: "10px",
        },
      }}
    />
  );
};

export default AppToaster;
