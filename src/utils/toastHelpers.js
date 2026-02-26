import toast from "react-hot-toast";

const baseStyle = {
  padding: "16px",
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: { ...baseStyle, border: "1px solid #4C763B" },
    iconTheme: { primary: "#4C763B", secondary: "#FFFAEE" },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: { ...baseStyle, border: "1px solid #C75D2C" },
    iconTheme: { primary: "#C75D2C", secondary: "#FFFAEE" },
  });
};
