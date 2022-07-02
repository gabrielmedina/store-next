import Document, { Html, Head, Main, NextScript } from 'next/document'

class StoreDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default StoreDocument
