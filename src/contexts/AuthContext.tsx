import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react';
import type { ReactNode } from 'react';
import type { ILoginRequest, IPaciente } from '../types/PacienteType';
import { login as apiLogin, getPacienteById } from '../services/api.ts';

interface IAuthContext {
  user: IPaciente | null;      // O objeto do usuário logado ou null
  isLoading: boolean;           // true enquanto checa o localStorage
  login: (credentials: ILoginRequest) => Promise<void>; // Função para logar
  logout: () => void;           // Função para deslogar
  reloadUser: (id: number) => Promise<void>; // Função para recarregar dados do usuário (ex: após atualizar perfil)
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IPaciente | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true

  useEffect(() => {
    const storedUser = localStorage.getItem('hc_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Falha ao ler usuário do localStorage", error);
        localStorage.removeItem('hc_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: ILoginRequest) => {
    try {
      const userData = await apiLogin(credentials);
      
      setUser(userData);
    
      localStorage.setItem('hc_user', JSON.stringify(userData));

    } catch (error) {
      console.error("Erro no login:", error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hc_user');
  };

  const reloadUser = async (id: number) => {
    try {
      const updatedUser = await getPacienteById(id);
      setUser(updatedUser);
      localStorage.setItem('hc_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Falha ao recarregar dados do usuário", error);
      // Se falhar (ex: 404), desloga o usuário por segurança
      logout();
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, reloadUser }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};