import Link from "next/link";
import "./globals.css";
import { Main } from "../app/pages/main/main";

export default function Page() {
  return (
    <div>
      {/* Главная страница */}
      <Link href="/">
        <Main/>
      </Link>
  </div>
  );
}