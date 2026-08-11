import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;
`

export const Section = styled.section`
  padding: 72px 0;

  @media (max-width: 640px) {
    padding: 48px 0;
  }
`

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`

export const SectionLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 60ch;
  margin-bottom: 40px;

  @media (max-width: 640px) {
    margin-bottom: 28px;
  }
`
