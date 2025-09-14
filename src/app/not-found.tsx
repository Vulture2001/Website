// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import Button from "@components/buttons/Button";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            {/* SVG face */}
            <Image
                src="svg/face.svg"       // put face.svg inside public/
                alt="Not found face"
                width={80}
                height={80}
                className="mb-6 opacity-80 text-black"
            />

            <h1 className="text-3xl font-semibold text-gray-900">Page not found...</h1>

            <Link href="/" className="mt-6">
                <Button variant="outline" shape="pill" size="lg">
                    Go back home
                </Button>
            </Link>
        </main>
    )
}
