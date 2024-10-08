import React, { createContext, useState, useEffect } from "react";
import { ProjectContextType } from "@/types";

export const ProjectContext = createContext<ProjectContextType>({
  projectId: [],
  setProjectId: () => {},
});

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projectId, setProjectId] = useState<number[]>(() => {
    const storedProjectIds = localStorage.getItem("projectIds");
    return storedProjectIds ? JSON.parse(storedProjectIds) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("projectId", JSON.stringify(projectId));
    } catch (error) {
      console.error("Error persisting projectId to localStorage:", error);
    }
  }, [projectId]);

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};
