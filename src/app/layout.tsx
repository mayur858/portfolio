import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { Roboto } from "next/font/google";
import { DarkModeProvider } from "./context/DarkModeContext";



import "./globals.css";



const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable}  antialiased`}
      >
        <DarkModeProvider>
          <Header />
          {children}
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
