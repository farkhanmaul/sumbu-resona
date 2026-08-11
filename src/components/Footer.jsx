import styled from 'styled-components'
import { Container } from './Layout.jsx'

// Ink closing band — the last screenful is the loudest.
const Band = styled.div`
  background: ${({ theme }) => theme.colors.text};
  color: #fff;
  padding: 64px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 120%, ${({ theme }) => theme.colors.glow} 0%, transparent 60%);
    pointer-events: none;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
    position: relative;

    .neon {
      background: ${({ theme }) => theme.colors.gradient};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media (max-width: 640px) {
      font-size: 1.4rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    max-width: 52ch;
    margin: 0 auto;
    font-size: 0.95rem;
    position: relative;
  }
`

const Cta = styled.a`
  display: inline-block;
  margin-top: 24px;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  font-weight: 800;
  font-size: 0.98rem;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  position: relative;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    text-decoration: none;
  }
`

const Footer = styled.footer`
  padding: 40px 0 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .brand {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 800;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.text};

    span {
      background: ${({ theme }) => theme.colors.gradient};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`

export default function SiteFooter() {
  return (
    <>
      <Band>
        <h2>
          Ship first. <span className="neon">Iterate later.</span>
        </h2>
        <p>
          RSNX is the first public home of the Sumbu Resona ecosystem.
          Everything here is real, or clearly marked as coming soon.
        </p>
        <Cta href="#/cards">Mint your RSNX card</Cta>
      </Band>
      <Footer>
        <Container>
          <Inner>
            <span>© {new Date().getFullYear()} Sumbu Resona. All rights reserved.</span>
            <span className="brand">
              RSNX <span>/ Sumbu Resona</span>
            </span>
          </Inner>
        </Container>
      </Footer>
    </>
  )
}
