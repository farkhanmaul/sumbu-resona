import styled from 'styled-components'
import { Container, Section, SectionTitle } from './Layout.jsx'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
  }
`

const pillars = [
  {
    title: 'Open ecosystem',
    text: 'A public, transparent ecosystem built to be understood — no locked doors, no hidden agendas.',
  },
  {
    title: 'Honest roadmap',
    text: 'What is not real yet is marked TBD. Expectations are set straight from day one.',
  },
  {
    title: 'Utility before hype',
    text: 'Real, useful infrastructure before marketing. Substance over noise.',
  },
]

export default function Vision() {
  return (
    <Section id="vision">
      <Container>
        <SectionTitle>Vision &amp; ecosystem</SectionTitle>
        <Grid>
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
