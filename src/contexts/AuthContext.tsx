// contexts/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import { login } from "../service/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import type { UsuarioLogin } from "../models/UsuarioLogin";
import type { EmpresaLogin } from "../models/EmpresaLogin";

interface AuthContextProps {
  usuario?: UsuarioLogin;
  empresa?: EmpresaLogin;
  tipo: 'usuario' | 'empresa' | '';
  handleLoginUsuario(usuario: UsuarioLogin): Promise<void>;
  handleLoginEmpresa(empresa: EmpresaLogin): Promise<void>;
  handleLogout(): void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin | undefined>(() => {
    const local = localStorage.getItem("usuario");
    return local ? JSON.parse(local) : undefined;
  });

  const [empresa, setEmpresa] = useState<EmpresaLogin | undefined>(() => {
    const local = localStorage.getItem("empresa");
    return local ? JSON.parse(local) : undefined;
  });

  const [tipo, setTipo] = useState<'usuario' | 'empresa' | ''>(() => {
    return localStorage.getItem("tipo") as 'usuario' | 'empresa' | '' || '';
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
    if (empresa) localStorage.setItem("empresa", JSON.stringify(empresa));
    localStorage.setItem("tipo", tipo);
  }, [usuario, empresa, tipo]);

  async function handleLoginUsuario(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
      setTipo("usuario");
      ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
    } catch {
      ToastAlerta("Erro ao autenticar o usuário!", "erro");
    }
    setIsLoading(false);
  }

  async function handleLoginEmpresa(empresaLogin: EmpresaLogin) {
    setIsLoading(true);
    try {
      await login("/empresas/logar", empresaLogin, setEmpresa);
      setTipo("empresa");
      ToastAlerta("Empresa autenticada com sucesso!", "sucesso");
    } catch {
      ToastAlerta("Erro ao autenticar a empresa!", "erro");
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario(undefined);
    setEmpresa(undefined);
    setTipo('');
    localStorage.removeItem("usuario");
    localStorage.removeItem("empresa");
    localStorage.removeItem("tipo");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        empresa,
        tipo,
        handleLoginUsuario,
        handleLoginEmpresa,
        handleLogout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
