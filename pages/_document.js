// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // Make sure to compare strings consistently – process.env vars are always strings
    const isPwaEnabled =
      process.env.NEXT_PWA_STATUS === '1' ||
      process.env.NEXT_PWA_STATUS === 1;

    return (
      <Html lang="en">
        <Head>
          {isPwaEnabled && <link rel="manifest" href="/manifest.json" />}
          {/* Uncomment and adjust if you add an Apple touch icon */}
          {/* <link rel="apple-touch-icon" href="/icon.png" /> */}
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
