import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import Router, { useRouter } from "next/router";
import { UserContext } from "../../../context/UserContext";
import { useContext, useState } from "react";
import Cookies from "js-cookie";

const font = "Montserrat, sans-serif";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();

  const { userData: data, setUser, setIsLogged } = useContext(UserContext);
  const pages = [
    {
      name: "Jogos",
      link: "/jogos",
    },
  ];

  const settings = [
    {
      name: "Perfil",
      link: "/perfil",
    },
    {
      name: "Editar Perfil",
      link: "/editarPerfil",
    },


  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    router.push(link);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (link) => {
    router.push(link);
    setAnchorElUser(null);

  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      Cookies.remove("user");
      setUser({});
      setIsLogged(false);
      Router.push("/login");
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "var(--rosa)", fontFamily: "Chaney", borderBottom: "1px solid var(--rosaEscuro)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              Router.push("/jogos");
              setAnchorElNav(null);
              setAnchorElUser(null);
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: font,
              fontWeight: 700,
              letterSpacing: ".15rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            GALO WALLET
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: font,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                fontFamily: font,
              }}
            >
              {data?.isAdmin && (
                <MenuItem
                  onClick={() => {
                    Router.push("/newEvent");
                    setAnchorElNav(null);
                    setAnchorElUser(null);
                  }}
                  sx={{ fontFamily: font }}
                >
                  Adicionar Jogo
                </MenuItem>
              )}

              {pages?.map((page) => (
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.link)}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: font }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            onClick={() => {
              Router.push("/jogos");
              setAnchorElNav(null);
              setAnchorElUser(null);
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: font,
              fontWeight: 700,
              letterSpacing: ".15rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            GALO WALLET
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: font,
            }}
          >
            {pages?.map((page) => (
              <Button
                key={page.name}
                onClick={() => { handleCloseNavMenu(page.link) }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: font,
                }}
              >
                {page.name}
              </Button>
            ))}
            {data?.isAdmin && (
              <Button
                onClick={() => {
                  Router.push("/newEvent");
                  setAnchorElNav(null);
                  setAnchorElUser(null);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: font,
                }}
              >
                Adicionar Jogo
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {data?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data?.photoURL}
                    alt="photo"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "contain",
                      objectPosition: "center",
                      border: "1px solid var(--rosaEscuro)",
                    }}
                  />
                ) : (
                  <Avatar />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting?.name} onClick={() => handleCloseUserMenu(setting.link)}>
                  <Typography
                    textAlign="center"

                    sx={{ fontFamily: font }}
                  >
                    {setting?.name}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography
                  textAlign="center" sx={{ fontFamily: font }}
                >
                  Sair
                </Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
