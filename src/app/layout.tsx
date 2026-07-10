import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { Roboto } from "next/font/google";
import { DarkModeProvider } from "./context/DarkModeContext";
import Script from "next/script";

// @ts-ignore: side-effect CSS import without type declarations
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}  antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <DarkModeProvider>
          <Header />
          {children}
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
