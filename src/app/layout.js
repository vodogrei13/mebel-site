import { Roboto } from "next/font/google";
import "./globals.scss";

const inter = Roboto({
  subsets: ["latin"],
  weights: ["400","500", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Contract manufacturing for furniture manufacturers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
