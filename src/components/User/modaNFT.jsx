/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ModalNFT({ show, setShow, ticket }) {
  const handleClose = () => setShow(false);
  const [loadingImage, setLoadingImage] = useState(true);



  const handleClickOutside = (e) => {
    if (e.target.id === "modal-ticket") {
      handleClose();
    }
  };
  if (show) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return (
    <>
      <Modal show={show} id="modal-ticket">
        <ModalBody>
          <button
            type="button"
            className="close"
            onClick={handleClose}
            style={{
              alignSelf: "flex-end",
              background: "transparent",
              border: "none",
              fontSize: "2.5rem",
              color: "black",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h1 style={{ textAlign: "center" }}>{ticket?.name}</h1>
          <div style={{ position: "relative" }}>
            <Image
              src={ticket?.image}
              alt={ticket?.name}
              width={300}
              height={300}
              quality={100}
              objectFit="contain"
              objectPosition="center"
              style={{
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.open(ticket?.hash, "_blank");
              }}
              onLoad={() => setLoadingImage(false)}
            />
            {loadingImage && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="success" />
              </div>
            )}
          </div>

          {ticket?.attributes?.map((atribute) => {
            return (
              <span
                key={atribute.trait_type}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.5rem",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {atribute.trait_type}: {atribute.value}
              </span>
            );
          })}

          {ticket?.hash && (
            <Button
              onClick={() => {
                window.open(ticket?.hash, "_blank");
              }}
            >
              Comprovante
            </Button>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: auto;
  padding: 10px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: 1ms void-animation-in;
  &:focus {
    outline: none;
  }
  &:focus-within {
    animation: 1ms void-animation-out;
  }
  backdrop-filter: blur(10px);
`;

const ModalBody = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: 1ms void-animation-in;
  &:focus {
    outline: none;
  }
  &:focus-within {
    animation: 1ms void-animation-out;
  }
`;

const Button = styled.button`
  background-color: var(--rosa);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--rosaEscuro);
  }
`;
