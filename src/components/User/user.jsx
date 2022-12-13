import Head from "next/head";
import { Footer } from "./footer";
import { NFTs } from "./nfts";
import styles from "./styles/user.module.css";
import { Tickets } from "./tickets";
import { UserInfo } from "./userInfo";

export const UserPage = ({ data: user, loading }) => {
  const entradas = Object?.values(user?.entradas ?? {});

  return (
    <div className={styles?.container}>
      <Head>
        <title>{user?.firstName}</title>
      </Head>
      <UserInfo user={user} />
      <Tickets tickets={entradas} loading={loading} />
      <NFTs />
      <Footer />
    </div>
  );
};
