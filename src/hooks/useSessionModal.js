import { useState, useEffect } from "react";

function getSavedValue() {
  const savedValue = JSON.parse(sessionStorage.getItem("modal"));
  if (savedValue) {
    return savedValue;
  } else {
    return [];
  }
}

export default function useSessionModal() {
  const [modal, setModal] = useState(() => {
    return getSavedValue();
  });

  useEffect(() => {
    sessionStorage.setItem("modal", JSON.stringify(modal));
  }, [modal]);

  return [modal, setModal];
}
