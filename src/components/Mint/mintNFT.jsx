import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { getDatabase, ref, update } from "firebase/database";
import { auth, db } from "../../../firebase";
import { UserContext } from "../../../context/UserContext";
import { handleRedeem } from "../../../hooks/cryptum";
const nfts = require("../../assets/nfts.json");

export default function MintNFT() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ipfs, setIpfs] = useState("");
  const [hash, setHash] = useState("");
  const [erro, setError] = useState("");

  const { nfts: nftData, userData } = useContext(UserContext);
  const nftnumberRemaining = nftData?.itemsRemaining;
  const tokensNumber = userData?.mintTickets;

  useEffect(() => {
    console.log({ nftData, ipfs, hash, erro, tokensNumber, nft:nfts[0] });
  }, [nftData, ipfs, hash, erro, tokensNumber]);

  useEffect(() => {
    if (done && tokensNumber > 0) {
      setTimeout(() => setDone(false), 1000);
    }
  }, [done, tokensNumber]);

  const removeTickets = async () => {
    const db = getDatabase();
    const user = auth.currentUser;
    let tickets = tokensNumber - 1;
    await update(ref(db, "users/" + user.uid), {
      mintTickets: tickets,
    });
    let entradasResta = nftnumberRemaining - 1;
    await update(ref(db, "nfts/"), {
      itemsRemaining: entradasResta,
    });

    if (tokensNumber === 0) {
      setDone(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleRedeem({
      uri: ipfs,
      mintTickets: tokensNumber,
      setFunction: setHash,
    })
      .then(async (res) => {
        await removeTickets();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addNft = async (hash) => {
    const user = auth.currentUser;
    const randomId = Math.floor(Math.random() * 1000000);
    const nft = nfts[nftnumberRemaining];


    await update(ref(db, "users/" + user.uid + "/nfts/" + randomId), {
      name: nft?.name,
      image: nft?.image_link,
      id: randomId,
      link: nft?.metadata_link,
      attributes: nft?.attributes,
      hash: `https://mumbai.polygonscan.com/tx/${hash}`,
    });
  };

  useEffect(() => {
    if (hash) {
      addNft(hash);
    }
  }, [hash]);

  const handleSubmitNFT = async () => {
    setLoading(true);
    if (nftnumberRemaining >= 0) {
      setIpfs(nfts[nftnumberRemaining]?.metadata_link);
    } else if (nftnumberRemaining == 0) {
      setTimeout(() => {
        setError("You have reached the maximum number of NFTs");
      }, 5000);
    }
    setLoading(false);
  };
  useEffect(() => {

    handleSubmitNFT();
  }, [nftnumberRemaining]);

  useEffect(() => {
    if (tokensNumber === 0) {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [tokensNumber]);

  useEffect(() => {
    if (erro)
      setTimeout(() => {
        setError("");
      }, 3000);
  }, [erro]);

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

      <Button onClick={(e) => handleSubmit(e)} disabled={loading || done}>
        {loading
          ? "Mintando seu NFT, por favor aguarde..."
          : done
          ? "Sem mint tickets disponíveis"
          : "Mint"}
      </Button>
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
  //media query for mobile
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    bottom: -150%;
  }
  &:hover {
    background: var(--rosaEscuro);
    color: var(--branco);
  }
`;
