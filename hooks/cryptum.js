import axios from "axios";

export const handleRedeem = async ({ uri, mintTickets, setFunction }) => {
  const token = "0xc28AEF0648840949BA6c4338A211e6f496D9Afe5";
  const destination = "0x88d3d04040d5DD1c34D092E63681a198b6A7E928";
  const protocol = "POLYGON";

  await axios
    .post("https://api-services.herokuapp.com/mintNFT", {
      token,
      destination,
      uri,
      protocol,
      mintTickets,
    })
    .then((res) => {
      setFunction(res?.data?.hash);
      return res?.data?.hash;
    });
};
