import styled from 'styled-components'
import { Container } from './Layout.jsx'
import StatusBadge from './StatusBadge.jsx'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(251, 253, 253, 0.85);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
`

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    text-decoration: none;
  }
`

const Logo = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gradient};
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
`

const BrandSub = styled.span`
  color: ${({ theme }) => theme.colors.textFaint};
  font-weight: 500;
  font-size: 0.8rem;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 0.92rem;

  a {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 500;

    &:hover {
      color: ${({ theme }) => theme.colors.accentDark};
      text-decoration: none;
    }
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const Cta = styled.a`
  padding: 9px 18px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    text-decoration: none;
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
          <Brand href="#top">
            <Logo>R</Logo>
            <span>
              RSNX <BrandSub>/ Sumbu Resona</BrandSub>
            </span>
            <StatusBadge tone="beta">Beta</StatusBadge>
          </Brand>
          <Links>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </Links>
          <Cta href="#/cards">Get your card</Cta>
        </Nav>
      </Container>
    </Header>
  )
}
