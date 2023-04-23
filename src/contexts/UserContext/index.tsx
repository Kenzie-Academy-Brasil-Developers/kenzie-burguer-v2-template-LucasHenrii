import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues, TRegisterFormValues } from "../../components/Zod";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface IUserProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  loading: boolean;
  HandleLogin: (formData: TLoginFormValues) => Promise<void>;
  HandleRegister: (formData: TRegisterFormValues) => Promise<void>;
  userLogout: () => void;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      } finally {
        setLoading(false);
      }
    };
    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const navigate = useNavigate();

  const HandleLogin = async (formData: TLoginFormValues) => {
    try {
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      localStorage.setItem("@TOKEN", data.accessToken);
      localStorage.setItem("@USERID", JSON.stringify(data.user.id));
      setUser(data.user);
      navigate("/shop");
    } catch (error) {
      toast.error("Ops! E-mail ou senha inválido!");
    }
  };

  const HandleRegister = async (formData: TRegisterFormValues) => {
    try {
      await api.post<IUserRegisterResponse>("/users", formData);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user, HandleLogin, HandleRegister, userLogout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
