import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
						rel="stylesheet"
					/>
					<link
					  href="https://raw.githubusercontent.com/xSallus/igflix/main/public/film.svg"
					  rel="shortcut icon"
            type="image/svg"
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

export default MyDocument;
