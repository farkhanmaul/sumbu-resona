import styled from 'styled-components'
import { Container, Section } from './Layout.jsx'
import StatusBadge from './StatusBadge.jsx'

const Head = styled.div`
  margin-bottom: 36px;

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

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 60ch;
  margin-top: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};

    &::before {
      opacity: 1;
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.gradientSoft};
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: grid;
    place-items: center;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 800;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.accentDark};
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`

const pillars = [
  { icon: '01', title: 'Open ecosystem', text: 'A public, transparent ecosystem built to be understood — no locked doors, no hidden agendas.' },
  { icon: '02', title: 'Honest roadmap', text: 'What is not real yet is marked TBD or SOON. Expectations are set straight from day one.' },
  { icon: '03', title: 'Utility before hype', text: 'Real, useful infrastructure before marketing. Substance over noise.' },
]

export default function Vision() {
  return (
    <Section id="vision">
      <Container>
        <Head>
          <div className="eyebrow">
            <StatusBadge tone="beta">Vision</StatusBadge>
          </div>
          <Title>
            Vision &amp; <span className="neon">ecosystem</span>
          </Title>
          <Lead>
            Three pillars hold the ecosystem up. Each one is a promise we
            intend to keep in public.
          </Lead>
        </Head>
        <Grid>
          {pillars.map((p) => (
            <Card key={p.title}>
              <div className="icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
