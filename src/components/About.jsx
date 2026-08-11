import styled from 'styled-components'
import { Container, Section, SectionTitle } from './Layout.jsx'

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 68ch;
  font-size: 1.05rem;

  + p {
    margin-top: 16px;
  }
`

export default function About() {
  return (
    <Section id="about">
      <Container>
        <SectionTitle>About RSNX</SectionTitle>
        <Text>
          RSNX is the native asset of the Sumbu Resona ecosystem. Sumbu Resona
          is an independent ecosystem project built on the principle of open,
          honest infrastructure — no empty promises, no fabricated claims.
        </Text>
        <Text>
          This page is the first public home of that ecosystem. Details,
          documentation, and the full vision will be published here as the
          project takes shape.
        </Text>
      </Container>
    </Section>
  )
}
