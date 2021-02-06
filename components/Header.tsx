import Link from "next/link";
import styled from "styled-components";
import { Colors } from "../assets/Colors";
import { useRouter } from "next/router";

type ActiveLinkProps = {
  children: React.ReactNode;
  isActive: boolean;
};

const Container = styled.div`
  width: 100%;
  height: 54px;
  color: ${Colors.WHITE};
  background: ${Colors.DARKBLUE};
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 170px;
  height: 100%;
  font-size: 1.2em;
  font-weight: bold;
`;
const Logo = styled.img`
  margin-right: 14px;
  width: 2em;
  height: 2em;
`;
const Categories = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  list-style: none;
  height: 100%;
  a {
    color: ${Colors.WHITE};
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: none;
    width: 120px;
    display: block;
  }
`;
const Setting = styled.div`
  height: 100%;
`;
const ActiveLink = styled.li`
  display: flex;
  align-items: center;
  a {
    color: ${(props: ActiveLinkProps) =>
      props.isActive ? Colors.CYAN : Colors.WHITE};
  }
  border-bottom: ${(props: ActiveLinkProps) =>
    props.isActive ? `3px solid ${Colors.CYAN}` : 0};
`;

const Header = () => {
  const router = useRouter();

  return (
    <Container>
      <Link href="/">
        <LogoContainer>
          <Logo src="/ninja-logo.png" />
          poe.ninja.clone
        </LogoContainer>
      </Link>
      <Categories>
        <ActiveLink isActive={router.pathname === "/economy"}>
          <Link href="/economy">Economy</Link>
        </ActiveLink>
        <ActiveLink isActive={router.pathname === "/challenge/builds"}>
          <Link href="/challenge/builds">Builds</Link>
        </ActiveLink>
        <ActiveLink isActive={router.pathname === "/trade"}>
          <Link href="/trade">Trade</Link>
        </ActiveLink>
      </Categories>
      <Setting />
    </Container>
  );
};
export default Header;
