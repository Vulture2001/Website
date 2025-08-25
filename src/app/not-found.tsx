// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            {/* SVG face */}
            <Image
                src="/face.svg"       // put face.svg inside public/
                alt="Not found face"
                width={80}
                height={80}
                className="mb-6 opacity-80"
            />

            <h1 className="text-3xl font-semibold text-gray-900">Page not found...</h1>
            <p className="mt-2 text-gray-600 max-w-md">
                The page you&apos;re looking for isn&apos;t available. Try searching again or use the button below.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
                Go back home
            </Link>
        </main>
    )
}
