import styled from "@emotion/styled";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { ref, update } from "firebase/database";
import Head from "next/head";
import { useState } from "react";
import { auth, db } from "../firebase";
import ResponsiveAppBar from "../src/components/Navbar/Navbar";
export default function NewEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      const randomId = Math.floor(Math.random() * 1000000);
      await update(ref(db, "events/" + randomId), {
        name,
        description,
        date,
        local,
        price,
        quantity,
        imageUrl,
        id: randomId,
      });
      await update(ref(db, "users/" + user.uid + "/events/" + randomId), {
        name,
        description,
        date,
        local,
        price,
        quantity,
        imageUrl,
        id: randomId,
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
    setOpen(true);
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        X
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Jogo criada com sucesso!"
        action={action}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "lightgreen" }}
        >
          Jogo criada com sucesso!
        </Alert>
      </Snackbar>
      <Head>
        <title>Novo Evento</title>
      </Head>
      <ResponsiveAppBar />
      <Container onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "0 0 20px 0",
          }}
        >
          <h1>Novo Evento</h1>
        </div>

        <Input
          type="text"
          placeholder="Nome do evento"
          autoFocus
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder="Data do evento"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Local do evento"
          required
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição do evento"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Valor do ingresso"
          required
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Quantidade de ingressos"
          required
          value={quantity || ""}
          max={100000}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Link da imagem"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button disabled={loading}>Cadastrar</Button>
      </Container>
    </>
  );
}
const bg = "linear-gradient(180deg,var(--rosa) 0%,var(--rosaEscuro) 100%)";

export const Container = styled.form`
  width: 100%;
  text-align: center;
  color: var(--branco);
  background: ${bg};
  padding-bottom: 2rem;
  min-height: calc(100vh - 57px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 0.5rem;
`;

export const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  border: 1px solid var(--branco);
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 80%;
  transition: background-color 0.2s;

  &:focus {
    outline: none;
    background-color: #f5f5f5;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  background: var(--branco);
  color: var(--rosa);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
 
`;
