/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";

export function ModalNFT({ show, setShow, ticket }) {
  const handleClose = () => setShow(false);
  const [atributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAtributes = async () => {
      if (ticket?.link) {
        await fetch(ticket?.link)
          .then((res) => res.json())
          .then((data) => {
            setAttributes(data.attributes);
          });
      }
    };
    getAtributes();
    setLoading(false);
  }, [ticket]);


  const handleClickOutside = (e) => {
    if (e.target.id === "modal-ticket") {
      handleClose();
    }
  };
  if (show) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  const changeProfileAvatar = async (e) => {
    e.preventDefault();
    await update(ref(db, "users/" + auth?.currentUser?.uid), {
      photoURL: ticket?.image,
    });
  };

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
          <span style={{ textAlign: "center", paddingBottom: "1rem" }}>
            {ticket?.description}
          </span>
          <img
            src={ticket?.image}
            alt={ticket?.name}
            width={300}
            height={300}
            style={{
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(ticket?.hash, "_blank");
            }}
          />
          {loading ? (
            <span
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
              Carregando...
            </span>
          ) : (
            atributes?.map((atribute) => {
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
                  {atribute.trait_type === "Power"
                    ? "Poder"
                    : atribute.trait_type}
                  : {atribute.value}
                </span>
              );
            })
          )}

          {ticket?.hash && (
            <Button
              onClick={() => {
                window.open(ticket?.hash, "_blank");
              }}
            >
              Comprovante
            </Button>
          )}
          <ButtonSecondary type="button" onClick={changeProfileAvatar}>
            Usar como avatar
          </ButtonSecondary>
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

const ButtonSecondary = styled.button`
  background-color: var(--azul);
  color: black !important;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--rosaEscuro);
    color: white !important;
  }
`;
