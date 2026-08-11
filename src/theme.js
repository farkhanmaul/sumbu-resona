const theme = {
  colors: {
    // Light crypto-tech surface — whites tinted with a whisper of mint.
    bg: '#fbfdfd',
    surface: '#f0f7f8',
    surfaceRaised: '#ffffff',
    border: '#d7e9ec',
    borderStrong: '#b5d8de',
    text: '#0b1f24',
    textMuted: '#46636b',
    textFaint: '#7d99a1',

    // Neon blue -> mint accent system.
    accent: '#0aa8c7',
    accentDark: '#067c96',
    accentSoft: '#e0f5f9',
    mint: '#22e6a8',
    mintDark: '#0c9a6f',
    mintSoft: '#dcf9ef',
    glow: 'rgba(34, 230, 168, 0.35)',
    glowBlue: 'rgba(10, 168, 199, 0.3)',
    gradient: 'linear-gradient(120deg, #0aa8c7 0%, #22e6a8 100%)',
    gradientSoft: 'linear-gradient(120deg, #e0f5f9 0%, #dcf9ef 100%)',

    status: {
      soon: { bg: '#0b1f24', fg: '#22e6a8', border: 'rgba(34, 230, 168, 0.5)' },
      beta: { bg: '#0b1f24', fg: '#7fe3f4', border: 'rgba(127, 227, 244, 0.5)' },
      live: { bg: '#dcf9ef', fg: '#0c9a6f', border: 'rgba(12, 154, 111, 0.4)' },
    },

    card: {
      cyan: '#0aa8c7',
      cyanDark: '#067c96',
      cyanSoft: '#eefbfe',
      holo: '#22e6a8',
      holo2: '#7fe3f4',
      ink: '#0b1f24',
      gradient: 'linear-gradient(135deg, #0aa8c7 0%, #22e6a8 100%)',
    },
  },
  fonts: {
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    display: `'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'SF Mono', ui-monospace, Menlo, Consolas, monospace`,
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '18px',
    pill: '999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(11, 31, 36, 0.06)',
    md: '0 4px 14px rgba(11, 31, 36, 0.08)',
    lg: '0 12px 34px rgba(11, 31, 36, 0.12)',
    glow: '0 8px 30px rgba(34, 230, 168, 0.35)',
    glowBlue: '0 8px 30px rgba(10, 168, 199, 0.3)',
  },
  maxWidth: '1080px',
}

export default theme
