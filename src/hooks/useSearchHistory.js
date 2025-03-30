import { useState } from "react";

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  const addToHistory = (city) => {
    const timestamp = new Date().toLocaleTimeString();

    setHistory((prev) => {
      const updatedHistory = [...prev, { city, timestamp }];
      return updatedHistory.length > 10 ? updatedHistory.slice(1) : updatedHistory;
    });
  };

  return { history, addToHistory };
};
