import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/apiService";

interface AuthContextState {
    token: TokenState;
    signIn({ email, senha }: UsuarioData): Promise<void>
    userLogged(): boolean;
    logout(): void;
}

interface Props {
    children: React.ReactNode;
}

interface UsuarioData {
    email: string;
    senha: string;

}

interface TokenState {
    token: string;

}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem("@PermissionYT:token")

        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token }
        }
        return {} as TokenState;
    })



    const signIn = useCallback(async ({ email, senha }: UsuarioData) => {
        const response = await api.post("/auth/login", { email, senha })

        const { token } = response.data;

        setToken(token);

        localStorage.setItem("@PermissionYT:token", token);
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("@PermissionYT:token");
        setToken({} as TokenState);
        delete api.defaults.headers.authorization;
    }, []);

    const userLogged = useCallback(() => {
        const token = localStorage.getItem("@PermissionYT:token")
        if (token) {
            return true;
        }
        return false;
    }, [])

    return (
        <AuthContext.Provider value={{ token, signIn, userLogged, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context
}

export { useAuth, AuthProvider }