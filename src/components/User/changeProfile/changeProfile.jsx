/* eslint-disable @next/next/no-img-element */
import { ref, update } from "firebase/database";
import Router from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { db } from "../../../../firebase";
import { Button, Container, Input } from "../../../../pages/newEvent";

export const ChangePage = () => {
  const { userData, user } = useContext(UserContext);
  const [firstName, setFirstName] = useState(userData?.firstName ?? "");
  const [lastName, setLastName] = useState(userData?.lastName ?? "");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(userData?.photoURL ?? "");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhotoURL = (e) => {
    setPhotoURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (firstName === "" || lastName === "") {
      await update(ref(db, "users/" + user?.uid), {
        photoURL,
      });
      Router.push("/perfil");
    } else if (photoURL === "") {
      await update(ref(db, "users/" + user?.uid), {
        firstName,
        lastName,
      });
      Router.push("/perfil");
    } else {
      await update(ref(db, "users/" + user?.uid), {
        firstName,
        lastName,
        photoURL,
      });
      Router.push("/perfil");
    }
    setIsLoading(false);
  };

  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
      <h1>Editar Perfil</h1>
      <Input type="text" placeholder="Nome" onChange={handleFirstName} />
      <Input type="text" placeholder="Sobrenome" onChange={handleLastName} />
      <Input type="text" placeholder="Foto URL" onChange={handlePhotoURL} />

      {photoURL && (
        <img
          src={photoURL}
          alt="preview"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      )}
      <Button disabled={isLoading} type="submit" style={{backgroundColor: 'var(--azul)', color:"black"}}>
        Atualizar
      </Button>
    </Container>
  );
};
