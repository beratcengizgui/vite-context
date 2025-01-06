import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttpClient } from "./HttpClientContext";
interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserContext {
  movies: any;
  setMovies: (user: IUser | null) => void;
  setPageNumber: (page : number) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<any | null>(null);
  const [pageNumber, setPageNumber] = useState<any>(1);
  const httpClient = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response : any = await httpClient.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`);
        // const photos = await httpClient.get("/photos");
        // const mergedArray : any = mergeArrays(response.data, photos.data);
        console.log("merged", response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchUsers();
  }, [pageNumber]);
  // bu iki dizi arasında aynı olan elemanları bulup birleştirir eğer aynı yoksa onu ekler sonrasında dönen objeyi diziye çevirip sunar
  const mergeArrays = (arr1: IUser[], arr2: any[]) => {
    const combined = [
      ...arr1,
      ...arr2.map((item) => ({ ...item, id: item.id })),
    ];
    const uniqueById = combined.reduce((acc, item) => {
      acc[item.id] = { ...acc[item.id], ...item };
      return acc;
    }, {});
    return Object.values(uniqueById);
  };
  return (
    <UserContext.Provider value={{ movies, setMovies, setPageNumber }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
