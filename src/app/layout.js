import { Roboto } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Button_Up } from "@/components/ui/buttons/button-up/button-up";

const inter = Roboto({
  subsets: ["latin"],
  weights: ["400", "500", "700"],
});

export const metadata = {
  title: "mebel-site",
  description: "Contract manufacturing for furniture manufacturers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div>
          <Header/>
        </div>
        {children}
        <div><Button_Up/></div>
        <div>
            <Footer/>
        </div>
      </body>
    </html>
  );
}
