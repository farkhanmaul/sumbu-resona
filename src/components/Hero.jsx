import styled from 'styled-components'
import { Container } from './Layout.jsx'

const HeroSection = styled.section`
  padding: 96px 0 80px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 64px 0 48px;
    text-align: left;
  }
`

const Badge = styled.span`
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accentDark};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 6px 14px;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 20px;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 640px) {
    font-size: 2.2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 56ch;
  margin: 0 auto 32px;

  @media (max-width: 640px) {
    font-size: 1rem;
    margin: 0 0 28px;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const Button = styled.a`
  display: inline-block;
  padding: 12px 22px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    text-decoration: none;
  }
`

export const ButtonPrimary = styled(Button)`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
  }
`

export const ButtonGhost = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentDark};
  }
`

export default function Hero() {
  return (
    <HeroSection id="top">
      <Container>
        <Badge>Sumbu Resona Ecosystem</Badge>
        <Title>
          RSNX — the native asset of <span>Sumbu Resona</span>
        </Title>
        <Subtitle>
          The official public home of the RSNX / Sumbu Resona ecosystem.
          Vision, roadmap, and official links — nothing more, nothing fake.
        </Subtitle>
        <Actions>
          <ButtonPrimary href="#about">Explore the ecosystem</ButtonPrimary>
          <ButtonGhost href="#links">Official links</ButtonGhost>
        </Actions>
      </Container>
    </HeroSection>
  )
}
