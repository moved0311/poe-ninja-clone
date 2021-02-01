import Link from "next/link";
import styled from "styled-components";
import { Colors } from "../assets/Colors";
import Image from "next/image";

const Container = styled.div`
  width: 100%;
  height: 54px;
  background: ${Colors.DARKBLUE};
`;
const Header = () => {
  return (
    <Container>
      <Image src="/ninja-logo.png" width={36} height={36} />
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      |{" "}
      <Link href="/about">
        <a>About</a>
      </Link>{" "}
      |{" "}
      <Link href="/users">
        <a>Users List</a>
      </Link>{" "}
      | <a href="/api/users">Users API</a>
    </Container>
  );
};
export default Header;
