import ResponsiveAppBar from "../src/components/Navbar/Navbar";
import { ChangePage } from "../src/components/User/changeProfile/changeProfile";

export default function ChangeProfile() {
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
      <ChangePage />
    </div>
  );
}
