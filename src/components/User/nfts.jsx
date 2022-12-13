/* eslint-disable @next/next/no-img-element */
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";

import { ModalNFT } from "./modaNFT";

export const NFTs = () => {
  const [show, setShow] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});
  const [mintToken, setMintToken] = useState(0);
  const [loadingImage, setLoadingImage] = useState(true);
  const { userData: data } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      if (data.nfts) {
        setTickets(Object?.values(data?.nfts));
      }
      if (data.mintTickets) {
        setMintToken(data?.mintTickets || 0);
      }
    }
  }, [data]);

  const mintButton = () => {
    if (mintToken > 0) {
      return (
        <button
          style={{
            backgroundColor: "var(--rosa)",
            color: "var(--branco)",
            borderRadius: "25px",
            border: "none",
            alignSelf: "center",
            width: "80%",
            margin: "20px 0",
          }}
          onClick={() => Router.push("/success")}
        >
          <span>Mint {mintToken}x NFT{mintToken > 1 ? "s" : ""} Restantes</span>
        </button>
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          width: "80%",
          minHeight: "200px",
          backgroundColor: "white",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <span style={{ margin: "0.3rem", textAlign: "center" }}>
          NFTs: {tickets?.length}
        </span>
        <div
          style={{
            right: "0",
            top: "0",
            display: "flex",
            gridGap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: "0.5rem",
            padding: "1rem",
          }}
        >
          {tickets?.map((ticket, index) => {
            return (
              <div
                key={index}
                style={{
                  borderRadius: "50%",

                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Image
                  onClick={() => {
                    setShow(true);
                    setTicket(ticket);
                  }}
                  src={ticket?.image}
                  alt="Ingresso"
                  width={65}
                  height={65}
                  quality={40}
                  objectFit="contain"
                  objectPosition="center"
                  priority
                  style={{
                    borderRadius: "50%",

                    cursor: "pointer",
                  }}
                  onLoad={() => setLoadingImage(false)}
                  onError={() => console.log("erro")}
                />
                {loadingImage && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      backgroundColor: "var(--branco)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="success" />
                  </div>
                )}
              </div>
            );
          })}

          {show && (
            <div
              style={{
                position: "absolute",
              }}
            >
              <ModalNFT show={show} setShow={setShow} ticket={ticket} />
            </div>
          )}
        </div>
        {mintButton()}
      </div>
    </>
  );
};
