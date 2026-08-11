import styled from 'styled-components'
import { Container, Section } from './Layout.jsx'
import StatusBadge from './StatusBadge.jsx'

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const Left = styled.div`
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 14px;

  .neon {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.02rem;
  line-height: 1.7;
  max-width: 56ch;

  + p {
    margin-top: 14px;
  }
`

const Cards = styled.div`
  display: grid;
  gap: 14px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 16px 18px;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateX(4px);
  }

  .num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.mintDark};
    background: ${({ theme }) => theme.colors.mintSoft};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 4px 8px;
    flex-shrink: 0;
  }

  .t {
    font-weight: 700;
    font-size: 0.95rem;
  }

  .d {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
    margin-top: 2px;
  }
`

const facts = [
  { title: 'Open, honest infrastructure', text: 'No locked doors, no hidden agendas.' },
  { title: 'TBD beats fabricated', text: 'Nothing is published until it is real.' },
  { title: 'Community-scored cards', text: 'Your GitHub record, rated by an AI agent.' },
]

export default function About() {
  return (
    <Section id="about">
      <Container>
        <Inner>
          <Left>
            <div className="eyebrow">
              <StatusBadge tone="live">About</StatusBadge>
            </div>
            <Title>
              Built on <span className="neon">honest infrastructure</span>
            </Title>
            <Text>
              RSNX is the native asset of the Sumbu Resona ecosystem — an
              independent project founded on the principle of open, honest
              infrastructure. No empty promises, no fabricated claims.
            </Text>
            <Text>
              This page is the first public home of that ecosystem. Details,
              documentation, and the full vision will be published here as the
              project takes shape.
            </Text>
          </Left>
          <Cards>
            {facts.map((f, i) => (
              <Row key={f.title}>
                <span className="num">0{i + 1}</span>
                <div>
                  <div className="t">{f.title}</div>
                  <div className="d">{f.text}</div>
                </div>
              </Row>
            ))}
          </Cards>
        </Inner>
      </Container>
    </Section>
  )
}
