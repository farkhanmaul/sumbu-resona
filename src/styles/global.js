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
`
