import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/brand/kefcore-icon.png" />
        <link rel="apple-touch-icon" href="/brand/kefcore-icon.png" />
        <meta
          name="google-site-verification"
          content="q7_ovEv8zrcINJXuzN3dfJJuUdqZofuRoZK8-Irmt8I"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
