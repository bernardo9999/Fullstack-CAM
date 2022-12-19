import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { ref, update } from "firebase/database";
import { auth, db } from "../../../firebase";
import { UserContext } from "../../../context/UserContext";
import { handleRedeem } from "../../../hooks/cryptum";

export default function MintNFT() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [hash, setHash] = useState("");
  const [erro, setError] = useState("");
  const randomNft = Math.floor(Math.random() * 4);
  const nft = `https://bafybeiglfhh726npy5hoyc6czzlwdgnsuljdie5lh7acqp2o7luwdaqz5u.ipfs.nftstorage.link/0${randomNft}.json`;
  const { userData } = useContext(UserContext);
  const tokensNumber = userData?.mintTickets;
  const mintText = tokensNumber === 0 ? "Você não possui Tickets para Mintar" : `Mint (${tokensNumber}x Tickets)`;




  const removeTickets = async () => {
    try {

      let tickets = tokensNumber - 1;
      await update(ref(db, "users/" + auth?.currentUser?.uid), {
        mintTickets: tickets,
      });

      if (tickets === 0) {
        setDone(true);
      }
    } catch (err) {
      setError("Você não possui Tickets para Mintar")
    }
  };

  useEffect(() => {
    const addNft = async (hash) => {
      try {
        const randomId = Math.floor(Math.random() * 1000000);
        const power = await axios(nft).then(
          (res) => res?.data?.attributes[0].value
        );
        const name = await axios(nft).then((res) => res?.data?.name);
        const description = await axios(nft).then((res) => res?.data?.description);
        const image = await axios(nft).then((res) => res?.data?.image_link);
        await update(ref(db, "users/" + auth?.currentUser?.uid + "/nfts/" + randomId), {
          name,
          description,
          image,
          id: randomId,
          link: nft,
          power,
          hash: `https://mumbai.polygonscan.com/tx/${hash}`,
        });
      } catch (err) {
        console.log(err)
      }

    };
    if (hash) {
      addNft(hash);
    }
  }, [hash]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await handleRedeem({ uri: nft, mintTickets: tokensNumber, setFunction: setHash });
      await removeTickets();
      setDone(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (erro || done)
    setTimeout(() => {
      setError("");
      setDone(false);
    }, 3000);


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "300%",
          width: "90vw",
        }}
      >
        {erro && erro}
      </div>
      <br />

      <Button onClick={(e) => handleSubmit(e)} disabled={loading}>
        {loading ? "Mintando seu NFT, Aguarde..." : mintText}
      </Button>
      {done &&
        <div style={{ position: "absolute", top: "300%", width: "90vw" }}>
          <p style={{ color: "var(--azul)" }}>NFT Mintado com sucesso!</p>
          <p style={{ color: "var(--azul)" }}>Acesse sua carteira para visualizar</p>
        </div>
      }
    </>
  );
}


const Button = styled.button`
  background: var(--azul);
  color: var(--rosa);
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  height: 42px;
  width: 200px;
  position: absolute;
  left: 0;
  bottom: -150%;
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    bottom: -150%;
  }
  &:hover {
    opacity: 80%;
  }
`;
