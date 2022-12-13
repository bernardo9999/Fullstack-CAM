/* eslint-disable @next/next/no-img-element */
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const UserInfo = ({ user }) => {
  const Avatar = () => {
    if (user?.photoURL) {
      return (
        <div style={{ alignSelf: "center" }}>
          <img
            src={user?.photoURL}
            alt="Avatar"
            style={{
              alignSelf: "center",
              width: "200px",
              height: "200px",
              borderRadius: "100%",
              border: "1px solid #e6e6e6",
              objectFit: "contain",
              objectPosition: "center",
              
            }}
          />
        </div>
      );
    } else {
      return (
        <div style={{ alignSelf: "center", scale: "2", color: "pink" }}>
          <AccountCircleIcon fontSize="large" />
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "80%",
        height: "100%",
        gap: "1rem",
      }}
    >
      <Avatar />
      <div className="user-info__cols__col">
        <span>
          Nome: {user?.firstName} {user?.lastName}
        </span>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};
