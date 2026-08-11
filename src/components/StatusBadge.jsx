import styled from 'styled-components'

// Status badge — SOON / BETA / LIVE. Neon pill on dark ink.
// Tone: 'soon' | 'beta' | 'live' (from theme.colors.status).

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.status[({ $tone }) => $tone]?.bg || theme.colors.status.soon.bg};
  color: ${({ theme }) => theme.colors.status[({ $tone }) => $tone]?.fg || theme.colors.status.soon.fg};
  border: 1px solid ${({ theme }) => theme.colors.status[({ $tone }) => $tone]?.border || theme.colors.status.soon.border};
  white-space: nowrap;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }
`

export default function StatusBadge({ tone = 'soon', children, ...rest }) {
  return (
    <Badge $tone={tone} {...rest}>
      {children}
    </Badge>
  )
}
