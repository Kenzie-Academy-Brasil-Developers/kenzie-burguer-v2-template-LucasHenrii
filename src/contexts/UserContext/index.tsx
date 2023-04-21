import { createContext } from "react";

export const UserContext = createContext({});

interface IUserProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: IUserProps) => {
  const HandleLogin = () => {};

  const HandleRegister = () => {
    try {
    } catch (error) {}
  };

  return <UserContext.Provider value={""}>{children}</UserContext.Provider>;
};
