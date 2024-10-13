import React, { createContext, useState } from "react";
import TaskDialog from "@/components/TaskDialog";

export const TaskDialogContext = createContext<
  | {
      openDialog: () => void;
      closeDialog: () => void;
      isOpen: boolean;
    }
  | undefined
>(undefined);

export const TaskDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <TaskDialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      {isOpen && <TaskDialog />}
    </TaskDialogContext.Provider>
  );
};
