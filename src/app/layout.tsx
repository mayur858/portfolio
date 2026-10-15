import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { Roboto } from "next/font/google";
import { DarkModeProvider } from "./context/DarkModeContext";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayur Kumar Garchar | Software Developer",
  description: "Portfolio of Mayur Kumar Garchar, a software developer building Flutter mobile apps, full-stack web applications, and machine-learning projects.",
  openGraph: {
    title: "Mayur Kumar Garchar | Software Developer",
    description: "Explore Flutter apps, full-stack applications, and machine-learning projects by Mayur Kumar Garchar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayur Kumar Garchar | Software Developer",
    description: "Flutter, full-stack development, and machine-learning projects.",
  },
};

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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
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
          </>
        ) : null}
        <DarkModeProvider>
          <Header />
          {children}
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
