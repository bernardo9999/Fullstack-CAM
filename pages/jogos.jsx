import { FeedComponent } from "../src/components/Feed/feed";
import ResponsiveAppBar from "../src/components/Navbar/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const FeedPage = () => {
  const { jogos } = useContext(UserContext);

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg,var(--rosa) 0%,var(--rosaEscuro) 100%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <ResponsiveAppBar />
      <FeedComponent jogo={jogos} />
    </div>
  );
};

export default FeedPage;
