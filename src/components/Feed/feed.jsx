import { useEffect, useState } from "react";
import { FeedEvent } from "./event";
import Head from "next/head";
import styles from "./styles/Feed.module.css";

export const FeedComponent = ({ jogo }) => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    if (jogo) {
      setJogos(Object.values(jogo));
    }
  }, [jogo]);

  return (
    <div className={styles.feedPage}>
      <Head>
        <title>Jogos</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          height: "100%",
        }}
      >
        <h1
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            letterSpacing: "1px",
          }}
        >
          ⚽ Jogos ⚽
        </h1>
      </div>
      {jogos?.map((jogo) => {
        return (
          <FeedEvent
            key={jogo?.id}
            id={jogo?.id}
            name={jogo?.name}
            description={jogo?.description}
            date={jogo?.date}
            local={jogo?.local}
            image={jogo?.imageUrl}
            price={jogo?.price}
            quantity={jogo?.quantity}
          />
        );
      })}
    </div>
  );
};
