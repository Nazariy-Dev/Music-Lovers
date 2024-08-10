˝˝export default function Hero() {
    return (
        <div
            className="hero min-h-screen bg-gradient-to-b from-primary to-secondary"
            >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">WELCOME TO MUSIC LOVERS</h1>
                    <p className="mb-5 text-xl font-bold">
                        Join and find new amazing music and share your taste to the world
                    </p>
                    <button onClick={() => window.location.href = "#about"} className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}
