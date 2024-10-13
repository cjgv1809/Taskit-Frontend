import { useContext } from "react";
import { TaskDialogContext } from "@/context";

export const useTaskDialog = () => {
  const context = useContext(TaskDialogContext);
  if (!context) {
    throw new Error("useTaskDialog must be used within a TaskDialogProvider");
  }
  return context;
};
