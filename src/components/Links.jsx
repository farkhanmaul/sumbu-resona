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

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 60ch;
  margin-top: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 20px 22px;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
    text-decoration: none;
  }

  .label {
    font-weight: 700;
    font-size: 0.98rem;
  }
`

const links = [
  { label: 'Twitter / X', status: 'Soon', tone: 'soon', href: undefined },
  { label: 'Telegram', status: 'Soon', tone: 'soon', href: undefined },
  { label: 'Whitepaper', status: 'Soon', tone: 'soon', href: undefined },
  { label: 'Source code', status: 'Live', tone: 'live', href: 'https://github.com/farkhanmaul/sumbu-resona' },
]

export default function Links() {
  return (
    <Section id="links">
      <Container>
        <Head>
          <div className="eyebrow">
            <StatusBadge tone="live">Official links</StatusBadge>
          </div>
          <Title>
            Official <span className="neon">links</span>
          </Title>
          <Lead>
            Official channels will be listed here. Until they exist, nothing is
            linked — avoid unofficial sources.
          </Lead>
        </Head>
        <Grid>
          {links.map((link) => (
            <Card
              key={link.label}
              as={link.href ? 'a' : 'div'}
              href={link.href}
              target={link.href ? '_blank' : undefined}
              rel={link.href ? 'noopener' : undefined}
            >
              <span className="label">{link.label}</span>
              <StatusBadge tone={link.tone}>{link.status}</StatusBadge>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
