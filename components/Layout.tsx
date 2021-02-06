import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import styled from "styled-components";
import { Colors } from "../assets/Colors";

type Props = {
  children?: ReactNode;
  title?: string;
};
const Container = styled.div`
  background: linear-gradient(
      transparent 100vh,
      ${Colors.BLACK} 150vh,
      ${Colors.BLACK1}
    ),
    ${Colors.BLACK};
`;
const BackgroundImage = styled.div`
  min-height: 150vh;
  background: linear-gradient(177deg, transparent 30vh, ${Colors.BLACK} 150vh),
    url(/bg2.jpg);
  background-repeat: no-repeat;
`;
const ContentContainer = styled.div`
  max-width: 1218px;
  margin-left: auto;
  margin-right: auto;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Container>
    <BackgroundImage>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </BackgroundImage>
  </Container>
);

export default Layout;
