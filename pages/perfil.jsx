import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ResponsiveAppBar from "../src/components/Navbar/Navbar";
import { UserPage } from "../src/components/User/user";

export default function PerfilPage() {
  const { userData } = useContext(UserContext);

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
      <UserPage data={userData} />
    </div>
  );
}
