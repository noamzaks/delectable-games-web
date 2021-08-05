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
                    padding: "3rem",
                    borderRadius: "1rem",
                }}
            >
                <h1 style={{ fontSize: "7rem" }}>Minigames</h1>
                <button style={{ fontSize: "3rem", margin: "2rem" }}>
                    <Link href="twister">Start Twister</Link>
                </button>
            </div>
        </div>
    )
}

export default HomePage
