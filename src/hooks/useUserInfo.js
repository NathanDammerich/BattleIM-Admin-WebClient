import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return user;
}
