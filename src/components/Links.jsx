import styled from 'styled-components'
import { Container, Section, SectionTitle, SectionLead } from './Layout.jsx'

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
  padding: 18px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
    flex-shrink: 0;
    margin-left: 12px;
  }
`

const links = [
  { label: 'Twitter / X', status: 'TBD', href: undefined },
  { label: 'Telegram', status: 'TBD', href: undefined },
  { label: 'Whitepaper', status: 'TBD', href: undefined },
  { label: 'Source code', status: 'TBD', href: undefined },
]

export default function Links() {
  return (
    <Section id="links">
      <Container>
        <SectionTitle>Official links</SectionTitle>
        <SectionLead>
          Official channels will be listed here. Until they exist, nothing is
          linked — avoid unofficial sources.
        </SectionLead>
        <Grid>
          {links.map((link) => (
            <Card
              key={link.label}
              as={link.href ? 'a' : 'div'}
              href={link.href}
            >
              <span>{link.label}</span>
              <span>{link.status}</span>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
