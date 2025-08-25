import Link from 'next/link'
export default function NotFound() {
    return (
        <main className="min-h-[60vh] grid place-items-center">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Page not found</h1>
                <p className="mt-2 text-neutral-600">The page you’re looking for doesn’t exist.</p>
                <Link href="/public" className="mt-4 inline-block underline">Go home</Link>
            </div>
        </main>
    )
}
