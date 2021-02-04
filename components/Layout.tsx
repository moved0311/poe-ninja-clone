import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  title?: string;
};
const Container = styled.div`
  font-family: "IBM Plex Mono", "monospace";
  background-image: url("/bg2.jpg");
  min-height: 100vh;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <footer>
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Container>
);

export default Layout;
