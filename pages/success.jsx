import styled from "@emotion/styled";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import Router from "next/router";
import MintNFT from "../src/components/Mint/mintNFT";

export default function Success() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [confettiNumber, setConfettiNumber] = useState(300);

  useEffect(() => {
    setTimeout(() => {
      setConfettiNumber(0);
    }, 3000);
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  }, []);

  const handleClick = () => {
    Router.push("/perfil");
  };

  return (
    <>
      <Container>
        <Confetti
          width={width}
          height={height}
          numberOfPieces={confettiNumber}
        />
        <Title>Parabéns!</Title>
        <Message>Seu pagamento foi concluído com sucesso!</Message>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Button onClick={handleClick}>Voltar</Button>

          <MintNFT />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;

  text-align: center;
  color: var(--branco);
  background: linear-gradient(180deg, var(--rosa) 0%, var(--rosaEscuro) 100%);
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  gap: 2rem;
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
`;

const Button = styled.button`
  background: var(--azul);
  color: var(--rosa);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
  transition: background 0.2s;

`;
