import { useRouter } from "next/router";
import { useEffect } from "react";


export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000);
    }, []);

    return (
    <div>Такой страницы тут нет...</div>
    )
}