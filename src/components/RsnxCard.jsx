import styled, { css } from 'styled-components'

// ── 3D RSNX card, adapted from the vantis-card idiom (CSS-only, no libs) ──

const Scene = styled.div`
  position: relative;
  width: var(--card-w, min(400px, 94vw));
  aspect-ratio: 400 / 252;
  margin: 0 auto;
  perspective: 1300px;

  &::after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -34px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(10, 26, 29, 0.22) 0%, transparent 70%);
    filter: blur(6px);
    animation: rsnx-shadowpulse 6s ease-in-out infinite;
  }

  @keyframes rsnx-shadowpulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.94); opacity: 0.8; }
  }
`

const Float = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: rsnx-floaty 6s ease-in-out infinite;

  @keyframes rsnx-floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }
`

const Flip = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: rsnx-spin 12s linear infinite;

  @keyframes rsnx-spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }

  .scene:hover &, .scene:hover & {
    animation-play-state: paused;
  }
`

// Face visibility driven by the SAME timeline as the spin (switch at 25%/75%),
// so at most one face exists at a time even where preserve-3d flattens.
const Face = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  border: 1px solid var(--cedge, rgba(8, 127, 151, 0.25));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.12);

  &::after {
    content: '';
    position: absolute;
    inset: -40%;
    pointer-events: none;
    background: linear-gradient(
      100deg,
      transparent 34%,
      rgba(255, 255, 255, 0.18) 45%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.18) 55%,
      transparent 66%
    );
    transform: translateX(-90%) rotate(8deg);
    animation: rsnx-sheen 5.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes rsnx-sheen {
    0% { transform: translateX(-90%) rotate(8deg); }
    46% { transform: translateX(90%) rotate(8deg); }
    100% { transform: translateX(90%) rotate(8deg); }
  }
`

const Front = styled(Face)`
  transform: rotateY(0deg) translateZ(0.4px);
  animation: rsnx-facefront 12s linear infinite;
  color: #0e1a1d;
  background:
    repeating-linear-gradient(105deg, rgba(8, 127, 151, 0.08) 0 1px, transparent 1px 5px),
    radial-gradient(120% 90% at 18% 0%, rgba(10, 168, 199, 0.14) 0%, transparent 55%),
    linear-gradient(150deg, #eefbfe 0%, #d5f2f8 60%, #b9e8f3 100%);

  @keyframes rsnx-facefront {
    0%, 24.99% { visibility: visible; }
    25%, 74.99% { visibility: hidden; }
    75%, 100% { visibility: visible; }
  }
`

const Back = styled(Face)`
  transform: rotateY(180deg) translateZ(0.4px);
  visibility: hidden;
  animation: rsnx-faceback 12s linear infinite;
  padding: 0;
  color: #0e1a1d;
  background:
    repeating-linear-gradient(105deg, rgba(10, 168, 199, 0.1) 0 1px, transparent 1px 5px),
    radial-gradient(120% 90% at 80% 100%, rgba(255, 255, 255, 0.3) 0%, transparent 55%),
    linear-gradient(135deg, #7fe3f4 0%, #2fc3df 55%, #0aa8c7 100%);

  @keyframes rsnx-faceback {
    0%, 24.99% { visibility: hidden; }
    25%, 74.99% { visibility: visible; }
    75%, 100% { visibility: hidden; }
  }
`

const Holo = styled.div`
  width: 44px;
  height: 32px;
  border-radius: 7px;
  position: relative;
  margin-top: 4px;
  background: linear-gradient(120deg, #bdf0fb, #0aa8c7 22%, #7fe3f4 45%, #c79bff 65%, #ffe79b 82%, #0aa8c7);
  background-size: 320% 320%;
  animation: rsnx-holo 7s linear infinite;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 7px;
    background:
      linear-gradient(to right, transparent 46%, rgba(14, 26, 29, 0.35) 46%, rgba(14, 26, 29, 0.35) 54%, transparent 54%),
      linear-gradient(to bottom, transparent 30%, rgba(14, 26, 29, 0.35) 30%, rgba(14, 26, 29, 0.35) 36%, transparent 36%, transparent 64%, rgba(14, 26, 29, 0.35) 64%, rgba(14, 26, 29, 0.35) 70%, transparent 70%);
  }

  @keyframes rsnx-holo {
    0% { background-position: 0% 50%; }
    100% { background-position: 320% 50%; }
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
  position: relative;
`

const Brand = styled.div`
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #087f97;
`

const DateTag = styled.div`
  font-size: 11px;
  color: #4b6267;
  font-variant-numeric: tabular-nums;
`

const Handle = styled.div`
  font-weight: 800;
  font-size: 30px;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
  z-index: 1;
  position: relative;
  color: #0e1a1d;

  &.long { font-size: 24px; }
  &.xlong { font-size: 19px; }
`

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
  position: relative;
`

const Label = styled.div`
  font-size: 9px;
  color: #4b6267;
  text-transform: uppercase;
  letter-spacing: 0.14em;
`

const Value = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 2px;
  color: #0e1a1d;
`

const Rarity = styled.div`
  font-size: 10px;
  color: #087f97;
  font-weight: 700;
  letter-spacing: 0.1em;
`

const Curl = styled.div`
  font-size: 10px;
  color: #4b6267;
  margin-top: 4px;
  font-family: ui-monospace, Menlo, Consolas, monospace;
`

const Stripe = styled.div`
  margin-top: 26px;
  height: 44px;
  background: linear-gradient(180deg, #0e1a1d 0%, #1d3a42 45%, #0e1a1d 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
`

const BackBody = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 24px 20px;
  position: relative;
`

const BackInfo = styled.div`
  font-size: 10px;
  line-height: 1.9;
  color: rgba(14, 26, 29, 0.75);
  font-family: ui-monospace, Menlo, Consolas, monospace;

  .bh {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #0e1a1d;
  }
`

const BackMark = styled.div`
  height: 88px;
  color: #0e1a1d;
  opacity: 0.9;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: flex-end;
`

const rsnx = css`
  color: inherit;
`

// Export pieces so the page can customize structure; default export = full card.
export { rsnx }

export default function RsnxCard({ handle = 'yourhandle', name, tier = '—', score, date }) {
  const shown = '@' + handle
  const hClass =
    shown.length > 21 ? 'xlong' : shown.length > 15 ? 'long' : ''
  const dateStr = date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()

  return (
    <Scene className="scene">
      <Float>
        <Flip>
          <Front>
            <Row>
              <Brand>RSNX · SUMBU RESONA</Brand>
              <DateTag>{dateStr}</DateTag>
            </Row>
            <Holo />
            <Handle className={hClass}>{shown}</Handle>
            <FooterRow>
              <div>
                <Label>Identity</Label>
                <Value>{name || 'GitHub Developer'}</Value>
                <Curl>sumbu-resona.pages.dev/card/{handle}</Curl>
              </div>
              <div>
                <Rarity>ONE OF ONE</Rarity>
                <Label>Tier</Label>
                <Value>{tier}</Value>
              </div>
            </FooterRow>
          </Front>
          <Back>
            <Stripe />
            <BackBody>
              <BackInfo>
                <div className="bh">RSNX CARDS</div>
                sumbu-resona.pages.dev/card/{handle}
                <br />
                ONE OF ONE · {dateStr}
                <br />
                AI-scored by Command Code.
                <br />
                Virtual identity card.
              </BackInfo>
              <BackMark>
                {score != null ? (
                  <span style={{ fontSize: 40, lineHeight: 1 }}>{score}</span>
                ) : (
                  <span>RSNX</span>
                )}
              </BackMark>
            </BackBody>
          </Back>
        </Flip>
      </Float>
    </Scene>
  )
}
