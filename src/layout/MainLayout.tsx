import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";

export default function MainLayout({ chidren }: any) {
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <Container sx={{ my: 6 }}>{chidren}</Container>
    </>
  );
}
