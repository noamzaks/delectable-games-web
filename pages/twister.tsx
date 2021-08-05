import Head from "next/head"
import { useLocalStorage } from "../utilities/hooks"

const parts = ["left hand", "right hand", "left foot", "right foot"]
const colors = ["green", "red", "yellow", "blue"]

function random<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

const Twister = () => {
    const [players, setPlayers] = useLocalStorage("players", [])
    const [started, setStarted] = useLocalStorage("started", false)
    const [color, setColor] = useLocalStorage("color", "")
    const [instruction, setInstruction] = useLocalStorage("instruction", "")
    const [positions, setPositions] = useLocalStorage("positions", {})
    const [turn, setTurn] = useLocalStorage("turn", 0)

    const next = (currentTurn: number, currentPositions) => {
        const currentPlayer = players[currentTurn]
        const part = random(parts)
        const possibleColors = colors.filter(
            (color) => color !== currentPositions[currentPlayer][part]
        )
        const newColor = random(possibleColors)
        currentPositions[currentPlayer][part] = newColor
        const newInstruction = `${currentPlayer} moves ${part} to ${newColor}`
        if (window !== undefined && "speechSynthesis" in window) {
            window.speechSynthesis.speak(
                new SpeechSynthesisUtterance(newInstruction)
            )
        }
        setColor(newColor)
        setPositions(currentPositions)
        setInstruction(
            newInstruction
                .substring(0, newInstruction.indexOf("to"))
                .replace("hand", "✋")
                .replace("foot", "🦶")
        )
        setTurn((currentTurn) => {
            if (currentTurn + 1 < players.length) {
                return currentTurn + 1
            }
            return 0
        })
    }

    return (
        <div
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                justifyItems: "center",
                transition: "500ms ease-in-out",
            }}
            className={`bg-${color}`}
        >
            <Head>
                <title>Twister</title>
            </Head>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    margin: "auto",
                }}
            >
                <h1 style={{ fontSize: "7rem", textAlign: "center" }}>
                    Twister
                </h1>

                {started && (
                    <p style={{ fontSize: "5rem", textAlign: "center" }}>
                        {instruction}
                    </p>
                )}

                <ul>
                    {players.map((player) => {
                        return (
                            <li
                                key={player}
                                style={{
                                    textAlign: "center",
                                    margin: "0.5rem",
                                }}
                            >
                                <button
                                    onClick={() => {
                                        setPlayers((players) =>
                                            players.filter((p) => p !== player)
                                        )

                                        setPositions((positions) => {
                                            if (player in positions) {
                                                positions[player] = undefined
                                            }
                                            return positions
                                        })

                                        if (players.length === 2) {
                                            if (
                                                started &&
                                                window !== undefined &&
                                                "speechSynthesis" in window
                                            ) {
                                                const remainingPlayer =
                                                    players.filter(
                                                        (p) => p !== player
                                                    )[0]
                                                window.speechSynthesis.speak(
                                                    new SpeechSynthesisUtterance(
                                                        `I am pleased to report that ${remainingPlayer} won the awesome battle`
                                                    )
                                                )
                                            }
                                            setStarted(false)
                                            setColor("")
                                        }
                                    }}
                                    style={{
                                        paddingRight: "1rem",
                                        paddingLeft: "1rem",
                                        fontSize: "large",
                                    }}
                                >
                                    {player}
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {started || (
                    <>
                        <input
                            type="text"
                            style={{
                                marginTop: "1rem",
                                marginLeft: "auto",
                                marginRight: "auto",
                                fontSize: "larger",
                                width: "20rem",
                            }}
                            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                    setPlayers((players) => [
                                        ...players,
                                        event.currentTarget.value,
                                    ])
                                    event.currentTarget.value = ""
                                }
                            }}
                        />
                        <button
                            style={{
                                padding: "1rem",
                                marginTop: "1rem",
                                marginLeft: "auto",
                                marginRight: "auto",
                                fontSize: "larger",
                                width: "10rem",
                            }}
                            onClick={() => {
								setStarted(true)
								const newPositions = {}
								for (const player of players) {
									newPositions[player] = {
										"left hand": null,
										"right hand": null,
										"left foot": null,
										"right foot": null,
									}
								}
								next(0, newPositions)
                            }}
                        >
                            Start
                        </button>
                    </>
                )}

                {started && (
                    <button
                        style={{
                            padding: "1rem",
                            marginTop: "1rem",
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontSize: "larger",
                            width: "10rem",
                        }}
                        onClick={() => next(turn, positions)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default Twister
