import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { auth } from "../firebase";
import styles from "../src/components/Home/styles/Home.module.css";
import Router from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const { setIsLogged, setUser } = useContext(UserContext);
  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("user", "Logado");
        setUser(user);
        setIsLoading(false);
        setIsLogged(true);
        Router.push("/jogos");
      })
      .catch((error) => {
        const errorMessage = error.message;

        setErro(errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (erro) {
      setTimeout(() => {
        setErro("");
      }, 3000);
    }
  }, [erro]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Router.push("/jogos");
    }
  }, []);

  return (
    <div className={styles.container}  style={{
      background:
        "linear-gradient(180deg,var(--rosa) 0%,var(--rosaEscuro) 100%)",
      minHeight: "100vh",
      color: "white",
    }}>
      <div className={styles.inputContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            width={200}
            height={200}
            className={styles.logo}
            objectFit="contain"
            objectPosition={"center"}
            alt="logo"
          />
        </div>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttonsContainer}>
          <button
            className={styles.buttonDontHaveAccount}
            onClick={() => {
              Router.push("/register");
            }}
          >
            Cadastrar
          </button>
          <button
            className={styles.buttonLogin}
            onClick={() => {
              handleLogin(email, password);
            }}
          >
            Login {isLoading && <span>...</span>}
          </button>
        </div>
        {erro && (
          <p
            style={{
              display: "flex",
              color: "white",
              width: "80%",
              justifyContent: "center",
              backgroundColor: "rgb(255, 0, 0, 0.5)",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            Login ou senha inválidos
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
