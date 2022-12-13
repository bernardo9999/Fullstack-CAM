/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export function ModalTicket({ show, setShow, ticket }) {
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
          <h1 style={{ textAlign: "center", fontSize: "20px" }}>
            {ticket?.name}
          </h1>
          <p>Valor: R${ticket?.price}</p>
          <div style={{ position: "relative" }}>
            <img
              src={ticket?.image}
              alt={ticket?.name}
              style={{ borderRadius: "10px", width: "100%", maxWidth: "600px", objectFit: "contain", objectPosition: "center" }}
              onLoad={() => setLoadingImage(false)}
            />
            {loadingImage && (
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "0",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "600px",
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
  padding: 2rem;

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
