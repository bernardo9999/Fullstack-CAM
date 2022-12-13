import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import styles from "../src/components/Home/styles/Home.module.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import Router from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const { setIsLogged, setUser } = useContext(UserContext);

  async function writeUserData(user) {
    const db = getDatabase();
    update(ref(db, "users/" + user.uid), {
      firstName,
      lastName,
      email,
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          localStorage.setItem("user", JSON.stringify(userCredential.user));
          await writeUserData(userCredential.user);
          Cookies.set("user", "Logado");
          setUser(userCredential.user);
          setIsLoading(false);
          setIsLogged(true);
          Router.push("/jogos");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErro(errorMessage);
          setIsLoading(false);
        });
    } else {
      setErro("Senhas não conferem, verifique e tente novamente.");
    }
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
    <div className={styles.container} 
      style={{ background: "linear-gradient(180deg,var(--rosa) 0%,var(--rosaEscuro) 100%)", minHeight: "100vh", color: "white", }}
    >
      <div className={styles.register}>
        <Head>
          <title>Cadastro</title>
        </Head>
        <form onSubmit={(e) => handleRegister(e)} className={styles.register}>
          <div
            className={styles.inputContainer}
            style={{
              marginTop: "2rem",
            }}
          >
            <div className={styles.logoContainer}>
              <Image
                src="/logo.png"
                width={100}
                height={100}
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
              required
            />

            <div
              style={{
                position: "relative",
                width: "80%",
                marginBottom: "3rem",
              }}
            >
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  paddingBottom: "1rem",
                }}
              />
              {showPassword ? (
                <AiFillEye
                  color="black"
                  size={30}
                  onClick={() => setShowPassword(false)}
                  style={{ position: "absolute", right: "20px", top: "8px" }}
                />
              ) : (
                <AiFillEyeInvisible
                  color="black"
                  size={30}
                  onClick={() => setShowPassword(true)}
                  style={{ position: "absolute", right: "20px", top: "8px" }}
                />
              )}
            </div>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirmar Senha"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
                {erro}
              </p>
            )}
            <div
              className={styles.buttonsContainer}
              style={{
                marginTop: "2rem",
              }}
            >
              <button
                className={styles.buttonDontHaveAccount}
                type="button"
                onClick={() => {
                  Router.push("/login");
                }}
              >
                Já tenho conta
              </button>
              {isLoading ? (
                <button className={styles.buttonLogin} type="button">
                  <span>Aguarde...</span>
                </button>
              ) : (
                <button className={styles.buttonLogin} type="submit">
                  Cadastrar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
