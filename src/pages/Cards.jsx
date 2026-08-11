import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Layout.jsx'
import RsnxCard from '../components/RsnxCard.jsx'

const Page = styled.div`
  padding: 48px 0 80px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;

  span {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) { font-size: 1.8rem; }
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 56ch;
  margin-bottom: 32px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(0, 460px);
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
`

const InputWrap = styled.div`
  position: relative;

  .at {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 15px 18px 15px 38px;
  font-size: 1rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accentSoft};
  }
`

const Button = styled.button`
  padding: 15px 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  &:disabled { opacity: 0.5; cursor: default; transform: none; }
`

const Status = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  min-height: 20px;

  &.err { color: #c0392b; }
`

const CardSlot = styled.div`
  position: sticky;
  top: 80px;
`

const LogPanel = styled.div`
  margin-top: 24px;
  max-width: 640px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 18px;
`

const LogTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .live {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textMuted};
    color: ${({ theme }) => theme.colors.textMuted};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mint};
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.mint};
    animation: rsnx-blink 1.2s ease-in-out infinite;
  }

  @keyframes rsnx-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
`

const Log = styled.div`
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  max-height: 220px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-wrap;
  word-break: break-word;

  .delta { color: ${({ theme }) => theme.colors.accentDark}; }
`

const Result = styled.div`
  margin-top: 40px;
`

const ResultHead = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
`

const BreakdownCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 24px;
  max-width: 640px;
`

const DimRow = styled.div`
  margin-bottom: 14px;

  .k {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 5px;

    b {
      background: ${({ theme }) => theme.colors.gradient};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }
  }
`

const Bar = styled.div`
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 4px;
    transition: width 0.5s ease;
  }
`

const Reasoning = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.6;
  margin-top: 18px;
  max-width: 640px;
`

const TierBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.mint};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
`

const DIMS = ['contribution', 'community', 'reputation', 'diversity', 'credibility']

export default function Cards() {
  const [handle, setHandle] = useState('')
  const [status, setStatus] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState(null)
  const [logLines, setLogLines] = useState([])
  const pollRef = useRef(null)
  const logRef = useRef(null)

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logLines])

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  async function submit(e) {
    e.preventDefault()
    const h = handle.trim().replace(/^@/, '')
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37})$/.test(h)) {
      setErr('Invalid GitHub username — letters, numbers and hyphens only.')
      return
    }
    setErr('')
    setStatus('Preparing your card…')
    setLoading(true)
    setCard(null)
    setLogLines([])
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: h }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setCard(data)
      if (data.status === 'ready') {
        setStatus(`Card ready — @${data.handle} is ${data.tier} (${data.score}/100).`)
        window.history.replaceState(null, '', `#/card/${data.handle}`)
        setLoading(false)
        return
      }
      // Pending — start polling log + status
      setStatus(`Scoring @${data.handle} with the RSNX agent… this takes ~30s.`)
      startPolling(data.id)
    } catch (e2) {
      setErr(e2.message || 'Request failed')
      setLoading(false)
    }
  }

  function startPolling(id) {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const [statusRes, logRes] = await Promise.all([
          fetch(`/api/cards/${id}`),
          fetch(`/api/cards/${id}/log`),
        ])
        const data = await statusRes.json()
        if (logRes.ok) {
          const logData = await logRes.json()
          setLogLines(logData.log || [])
        }
        if (data.status === 'ready') {
          clearInterval(pollRef.current)
          pollRef.current = null
          setCard(data)
          setStatus(`Card ready — @${data.handle} is ${data.tier} (${data.score}/100).`)
          setLoading(false)
          window.history.replaceState(null, '', `#/card/${data.handle}`)
        } else if (data.status === 'failed') {
          clearInterval(pollRef.current)
          pollRef.current = null
          setStatus(data.error || 'Scoring failed. Try again.')
          setErr(data.error || 'Scoring failed. Try again.')
          setLoading(false)
        }
      } catch {
        /* keep polling */
      }
    }, 2000)
  }

  // Render log lines; model text deltas highlighted in accent.
  function renderLog() {
    return logLines.map((line, i) => {
      const isDelta =
        line &&
        !line.startsWith('Scoring') &&
        !line.startsWith('Model') &&
        !line.startsWith('(') &&
        !line.startsWith('Done')
      return (
        <span key={i}>
          <span className={isDelta ? 'delta' : ''}>{line}</span>
          {'\n'}
        </span>
      )
    })
  }

  return (
    <Page>
      <Container>
        <Title>
          Your <span>RSNX Card</span>
        </Title>
        <Lead>
          Connect your GitHub username. A Command Code agent reads your public
          profile and scores it across five dimensions. Nothing is fabricated —
          missing data is missing data.
        </Lead>

        <Grid>
          <div>
            <Form onSubmit={submit}>
              <InputWrap>
                <span className="at">@</span>
                <Input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="github-username"
                  maxLength={39}
                  aria-label="GitHub username"
                />
              </InputWrap>
              <Button type="submit" disabled={loading}>
                {loading ? 'Scoring…' : 'Mint my RSNX Card'}
              </Button>
            </Form>
            <Status className={err ? 'err' : ''}>{err || status}</Status>

            {card?.status === 'pending' && (
              <LogPanel>
                <LogTitle>
                  <span>Agent thinking</span>
                  <span className="live">
                    <span className="dot" /> live
                  </span>
                </LogTitle>
                <Log ref={logRef}>{renderLog()}</Log>
              </LogPanel>
            )}
          </div>

          <CardSlot>
            {/* Card stays stable during scoring: shows the user's handle/name
                only, filled with the tier+score once status becomes ready. */}
            <RsnxCard
              handle={card?.handle || handle.replace(/^@/, '') || 'yourhandle'}
              name={card?.name}
              tier={card?.status === 'ready' ? card.tier : '—'}
              score={card?.status === 'ready' ? card.score : null}
            />
          </CardSlot>
        </Grid>

        {card?.status === 'ready' && (
          <Result>
            <ResultHead>
              @{card.handle} — <TierBadge as="span">{card.tier}</TierBadge>{' '}
              {card.score}/100
            </ResultHead>
            <BreakdownCard>
              {DIMS.map((d) => (
                <DimRow key={d}>
                  <div className="k">
                    <span>{d}</span>
                    <b>{card.breakdown?.[d] ?? 0}/20</b>
                  </div>
                  <Bar>
                    <i style={{ width: `${((card.breakdown?.[d] ?? 0) / 20) * 100}%` }} />
                  </Bar>
                </DimRow>
              ))}
            </BreakdownCard>
            <Reasoning>{card.reasoning}</Reasoning>
            <p style={{ marginTop: 16, fontSize: '0.85rem', color: '#4b6267' }}>
              Share: sumbu-resona.pages.dev/card/{card.handle} · scored by{' '}
              {card.model === 'heuristic'
                ? 'fallback heuristic'
                : `Command Code (${card.model})`}
            </p>
          </Result>
        )}
      </Container>
    </Page>
  )
}
