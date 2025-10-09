import { createContext, useContext } from "react";

// Create context for sharing selected category/subtopic
export const CategoryContext = createContext();

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within CategoryProvider");
  }
  return context;
};

