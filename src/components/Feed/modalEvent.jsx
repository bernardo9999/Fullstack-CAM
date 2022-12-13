/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";

export function ModalEvent({ show, setShow, event }) {
  const handleClose = () => setShow(false);

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-event") {
      handleClose();
    }
  };
  if (show) {
    document.addEventListener("mousedown", handleClickOutside);
  }
  const date = new Date(event?.date);
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateBr = `${day}/${month}/${year}`;
  const dayBr = day < 10 ? `0${day}` : day;
  const monthBr = month < 10 ? `0${month}` : month;
  const dateBrFull = `${dayBr}/${monthBr}/${year}`;

  return (
    <Modal show={show} id="modal-event">
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
            padding: 0,
            margin: 0,
            cursor: "pointer",
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h1>{event?.name}</h1>
        <p>Valor: R${event?.price}</p>
        <p>Ingressos: {event?.quantity}</p>
        <p>Data: {dateBrFull}</p>
        <p>Local: {event?.local}</p>
        <p>Descrição: {event?.description}</p>
        <img
          src={event?.image}
          alt={event?.name}
          style={{
            borderRadius: "10px",
            maxWidth: "250px",
            height: "200px",
            objectFit: "contain",
            objectPosition: "center",
            border: "1px solid #a6a6a6",
          }}
        />
      </ModalBody>
    </Modal>
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
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: 1ms void-animation-in;
  &:focus {
    outline: none;
  }
  &:focus-within {
    animation: 1ms void-animation-out;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: 1ms void-animation-in;
  &:focus {
    outline: none;
  }
  &:focus-within {
    animation: 1ms void-animation-out;
  }
`;
