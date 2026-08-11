import styled from 'styled-components'
import { Container, Section, SectionTitle } from './Layout.jsx'

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 640px;
`

const Item = styled.li`
  display: flex;
  gap: 20px;
  padding: 20px 0;

  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 4px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
  }
`

const Marker = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentDark};
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.85rem;
`

const items = [
  {
    title: 'Public home online',
    text: 'This page — the first public presence of the RSNX ecosystem.',
    status: 'live',
  },
  {
    title: 'Detailed roadmap & documentation',
    text: 'Concrete milestones and honest status for each phase of the ecosystem.',
    status: 'TBD',
  },
  {
    title: 'Ecosystem expansion',
    text: 'Grow the Sumbu Resona ecosystem step by step, in public.',
    status: 'TBD',
  },
]

export default function Roadmap() {
  return (
    <Section id="roadmap">
      <Container>
        <SectionTitle>Minimal roadmap</SectionTitle>
        <List>
          {items.map((item, index) => (
            <Item key={item.title}>
              <Marker>{index + 1}</Marker>
              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.text} Status: {item.status}.
                </p>
              </div>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}
