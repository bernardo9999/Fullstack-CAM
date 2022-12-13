import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../hooks/fetcher";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const { data: jogos } = useSWR(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/events.json`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: userData } = useSWR(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${user?.uid}.json`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: nfts } = useSWR(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/nfts.json`,
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal) {
      setUser(userLocal);
      Cookies.set("user", "Logado");
      setIsLogged(true);
    } else {
      setIsLogged(false);
      Cookies.remove("user");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, userData, jogos, nfts }}
    >
      {children}
    </UserContext.Provider>
  );
};
