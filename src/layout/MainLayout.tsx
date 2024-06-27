import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import { useAppSelector } from "../store";
import { withRouter } from "react-router-dom";

function MainLayout({ chidren, history }: any) {
  const isUserLogin = useAppSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (!isUserLogin) {
      history.push("/login");
    }
  }, [isUserLogin]);
  return (
    <>
      <Header />
      <Container sx={{ my: 6 }}>{chidren}</Container>
    </>
  );
}

export default withRouter(MainLayout);
