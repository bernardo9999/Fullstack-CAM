/* eslint-disable @next/next/no-img-element */
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { ModalTicket } from "./modalTicket";

export const Tickets = ({ tickets, loading }) => {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);

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
          Minhas Entradas: {tickets?.length}
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
              <div key={index} style={{ position: "relative" }}>
                <img
                  onClick={() => {
                    setShow(true);
                    setTicket(ticket);
                  }}
                  src={ticket?.image}
                  alt="foto da entrada"
                  style={{
                    borderRadius: "50%",
                    width: "65px",
                    height: "65px",
                    cursor: "pointer",
                    objectFit: "contain",
                    objectPosition: "center",
                    border: "1px solid #e6e6e6",
                  }}
                  onLoad={() => setLoadingImage(false)}
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
              <ModalTicket show={show} setShow={setShow} ticket={ticket} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
