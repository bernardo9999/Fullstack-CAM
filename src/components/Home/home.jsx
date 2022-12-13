import styles from "./styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Login } from "../../../pages/login";
import { Register } from "../../../pages/register";

export function HomePage({ user, setIsLoggedIn }) {
  const [registered, setRegistered] = useState(false);

  return (
    <div className={styles.home}>
      <Head>
        <title>CAM NFTs</title>
      </Head>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src={"/logo.png"}
          width="150px"
          height="150px"
          objectFit={"contain"}
          objectPosition={"center"}
          alt="logo"
        />
      </div>
      {registered ? (
        <Register
          setRegistered={setRegistered}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
        />
      ) : (
        <Login setRegistered={setRegistered} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
