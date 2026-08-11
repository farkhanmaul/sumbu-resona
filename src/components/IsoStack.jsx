import styled from 'styled-components'

// Isometric 3D stack — pure CSS, no assets. Three floating layers with
// neon blue->mint gradient edges, used as the hero illustration.

const Stack = styled.div`
  position: relative;
  width: 300px;
  height: 260px;
  margin: 0 auto;
  transform-style: preserve-3d;

  @media (max-width: 640px) {
    width: 240px;
    height: 210px;
  }
`

const Layer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 160px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.gradientSoft};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  transform-origin: center center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(10, 168, 199, 0.12), rgba(34, 230, 168, 0.12));
  }

  &::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    top: 12px;
    height: 8px;
    border-radius: 4px;
    background: linear-gradient(120deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.mint});
    opacity: 0.8;
  }
`

const L1 = styled(Layer)`
  transform: translate(-50%, -50%) rotate(0deg) translateY(30px);
  animation: iso-float1 5s ease-in-out infinite;
`
const L2 = styled(Layer)`
  transform: translate(-50%, -50%) rotate(4deg) translateY(-6px) scale(1.02);
  animation: iso-float2 6s ease-in-out infinite;
  background: linear-gradient(120deg, #ffffff, #eefbfe);
`
const L3 = styled(Layer)`
  transform: translate(-50%, -50%) rotate(-5deg) translateY(-42px) scale(0.9);
  animation: iso-float3 5.5s ease-in-out infinite;
  background: linear-gradient(120deg, #ffffff, #f0fbfd);
`

const Chip = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.gradient};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transform: translate(-50%, -50%) rotate(45deg);
  display: grid;
  place-items: center;

  span {
    transform: rotate(-45deg);
    color: #fff;
    font-weight: 800;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.15rem;
    letter-spacing: 0.04em;
  }
`

const Orbit = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  transform: translate(-50%, -50%);
  animation: iso-spin 18s linear infinite;

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mint};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @keyframes iso-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`

const Glow = styled.div`
  position: absolute;
  left: 50%;
  top: 62%;
  width: 220px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.glow};
  filter: blur(30px);
  transform: translateX(-50%);
`

// Keyframes for float — defined once, referenced above.
const isoKeyframes = `
  @keyframes iso-float1 { 0%,100% { transform: translate(-50%,-50%) rotate(0deg) translateY(30px); } 50% { transform: translate(-50%,-50%) rotate(0.5deg) translateY(36px); } }
  @keyframes iso-float2 { 0%,100% { transform: translate(-50%,-50%) rotate(4deg) translateY(-6px) scale(1.02); } 50% { transform: translate(-50%,-50%) rotate(4.5deg) translateY(-12px) scale(1.04); } }
  @keyframes iso-float3 { 0%,100% { transform: translate(-50%,-50%) rotate(-5deg) translateY(-42px) scale(0.9); } 50% { transform: translate(-50%,-50%) rotate(-4.5deg) translateY(-48px) scale(0.92); } }
`

export default function IsoStack() {
  return (
    <Stack aria-hidden="true">
      <style>{isoKeyframes}</style>
      <Glow />
      <Orbit />
      <L1 />
      <L2 />
      <L3 />
      <Chip>
        <span>RSNX</span>
      </Chip>
    </Stack>
  )
}
