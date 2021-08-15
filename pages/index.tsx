import Head from "next/head"
import Link from "next/link"
import Colors from "../components/colors"

const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                justifyItems: "center",
            }}
        >
            <Head>
                <title>Minigames</title>
            </Head>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    backgroundColor: Colors.main.background,
                    color: Colors.main.text,
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                }}
            >
                <h1 style={{ fontSize: "3rem" }}>Minigames</h1>
                <button
                    style={{ fontSize: "1rem", margin: "1rem" }}
                    onClick={() => {
                        window.localStorage.clear()
                    }}
                >
                    Clear games
                </button>
                <Link href="twister">
                    <button style={{ fontSize: "1rem", margin: "1rem" }}>
                        Start Twister
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage
