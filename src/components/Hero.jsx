import styled from 'styled-components'
import { Container } from './Layout.jsx'
import IsoStack from './IsoStack.jsx'
import StatusBadge from './StatusBadge.jsx'

// Announcement banner — neon mint strip at the very top.
const Banner = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  text-align: center;
  padding: 9px 44px 9px 18px;
  position: relative;
  font-size: 0.85rem;
  font-weight: 600;

  b {
    background: rgba(255, 255, 255, 0.22);
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  @media (max-width: 640px) {
    font-size: 0.78rem;
    padding: 8px 12px;
  }
`

const HeroSection = styled.section`
  padding: 72px 0 64px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -80px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.glowBlue} 0%, transparent 65%);
    pointer-events: none;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const Left = styled.div`
  @media (max-width: 900px) {
    order: 2;
  }
`

const Visual = styled.div`
  @media (max-width: 900px) {
    order: 1;
  }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin: 16px 0 20px;

  .neon {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  @media (max-width: 640px) {
    font-size: 2.1rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 48ch;
  line-height: 1.65;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`

const ButtonPrimary = styled.a`
  display: inline-block;
  padding: 14px 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  font-weight: 700;
  font-size: 0.98rem;
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    text-decoration: none;
  }
`

const ButtonGhost = styled.a`
  display: inline-block;
  padding: 14px 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.98rem;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    text-decoration: none;
  }
`

const Proof = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
  max-width: 520px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`

const ProofItem = styled.div`
  border-top: 2px solid ${({ theme }) => theme.colors.gradient};
  padding-top: 14px;
  border-image: ${({ theme }) => theme.colors.gradient} 1;

  .k {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textFaint};
  }

  .v {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 6px;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .s {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 2px;
  }
`

const proof = [
  { k: 'Status', v: 'BETA', s: 'Public testnet of the ecosystem' },
  { k: 'Scoring', v: 'AI', s: 'Command Code agent, free model' },
  { k: 'Hosting', v: 'CF', s: '100% Cloudflare free tier' },
]

export default function Hero() {
  return (
    <>
      <Banner>
        <b>NEW</b> RSNX Cards are live — mint your AI-scored card now
      </Banner>
      <HeroSection id="top">
        <Container>
          <Grid>
            <Left>
              <StatusBadge tone="live">Live · v0.1</StatusBadge>
              <Title>
                The native asset of the{' '}
                <span className="neon">Sumbu Resona</span> ecosystem
              </Title>
              <Subtitle>
                RSNX is built on open, honest infrastructure. No empty promises,
                no fabricated claims. Your public record, scored by an AI agent,
                minted into a card.
              </Subtitle>
              <Actions>
                <ButtonPrimary href="#/cards">Mint your RSNX card</ButtonPrimary>
                <ButtonGhost href="#about">Explore the ecosystem</ButtonGhost>
              </Actions>
              <Proof>
                {proof.map((p) => (
                  <ProofItem key={p.k}>
                    <div className="k">{p.k}</div>
                    <div className="v">{p.v}</div>
                    <div className="s">{p.s}</div>
                  </ProofItem>
                ))}
              </Proof>
            </Left>
            <Visual>
              <IsoStack />
            </Visual>
          </Grid>
        </Container>
      </HeroSection>
    </>
  )
}
