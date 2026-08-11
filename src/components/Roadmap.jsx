import styled from 'styled-components'
import { Container, Section } from './Layout.jsx'
import StatusBadge from './StatusBadge.jsx'

const Head = styled.div`
  margin-bottom: 32px;

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

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 720px;
`

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 22px 0;

  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
  }
`

const Marker = styled.span`
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  display: grid;
  place-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 800;
  font-size: 0.8rem;
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
`

const items = [
  {
    title: 'Public home online',
    text: 'This page — the first public presence of the RSNX ecosystem.',
    status: 'live',
    tone: 'live',
  },
  {
    title: 'RSNX Cards beta',
    text: 'AI-scored community cards, live in beta.',
    status: 'beta',
    tone: 'beta',
  },
  {
    title: 'Detailed roadmap & documentation',
    text: 'Concrete milestones and honest status for each phase of the ecosystem.',
    status: 'soon',
    tone: 'soon',
  },
  {
    title: 'Ecosystem expansion',
    text: 'Grow the Sumbu Resona ecosystem step by step, in public.',
    status: 'soon',
    tone: 'soon',
  },
]

export default function Roadmap() {
  return (
    <Section id="roadmap">
      <Container>
        <Head>
          <div className="eyebrow">
            <StatusBadge tone="beta">Roadmap</StatusBadge>
          </div>
          <Title>
            Minimal <span className="neon">roadmap</span>
          </Title>
        </Head>
        <List>
          {items.map((item, index) => (
            <Item key={item.title}>
              <Marker>{index + 1}</Marker>
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}
