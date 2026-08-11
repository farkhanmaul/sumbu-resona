import styled from 'styled-components'
import { Container } from './Layout.jsx'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    text-decoration: none;
  }
`

const Logo = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accent};
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 0.92rem;

  a {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: 640px) {
    display: none;
  }
`

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#vision', label: 'Vision' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#links', label: 'Links' },
]

export default function Navbar() {
  return (
    <Header>
      <Container>
        <Nav>
          <Brand href="#top">RSNX</Brand>
          <Links>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </Links>
        </Nav>
      </Container>
    </Header>
  )
}
