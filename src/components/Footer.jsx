import styled from 'styled-components'
import { Container } from './Layout.jsx'

const Footer = styled.footer`
  margin-top: auto;
  padding: 32px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

export default function SiteFooter() {
  return (
    <Footer>
      <Container>
        <Inner>
          <span>© {new Date().getFullYear()} Sumbu Resona. All rights reserved.</span>
          <span>RSNX</span>
        </Inner>
      </Container>
    </Footer>
  )
}
