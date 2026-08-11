import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
    background-image:
      radial-gradient(ellipse 60% 40% at 85% -5%, ${({ theme }) => theme.colors.glowBlue} 0%, transparent 60%),
      radial-gradient(ellipse 50% 35% at 5% 10%, ${({ theme }) => theme.colors.glow} 0%, transparent 55%);
    background-attachment: fixed;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, p {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.accentDark};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img,
  svg {
    max-width: 100%;
    display: block;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.mintSoft};
    color: ${({ theme }) => theme.colors.mintDark};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`
