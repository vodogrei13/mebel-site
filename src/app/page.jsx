import Link from "next/link";
import "./globals.css";
import { Main } from "../app/pages/main/main";

export default function Home() {
  return (
    <div>
      {/* Главная страница */}
      <Link href="/">
        <Main/>
      </Link>
      {/*  */}
      <Link href="/">
        <a>--</a> 
      </Link>
      {/*  */}
      <Link href="/">
        <a>--</a>  
      </Link>
  </div>
  );
}