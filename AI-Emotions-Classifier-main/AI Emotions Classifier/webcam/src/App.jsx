import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import BarGraphLine from "./components/BarGraphLine";
import Emoji from "./components/Emoji";
import iconMap from "./components/Emoji/iconMap";

function App() {
    const webcamRef = useRef(null)

    const processImage = useCallback(async () => {
        console.log("processing")
        const imageSrc = webcamRef.current.getScreenshot();
        const res = await inference(imageSrc)
        console.log(res)
        setPredictions(res)
    }, [webcamRef])

    useEffect(() => {
        const interval = setInterval(() => {
            processImage()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const inference = async (img) => {
        const request = await fetch("http://localhost:8000/process", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: img,
            })
        })
        const response = await request.json()
        console.log("RESPONSE", response)
        return response
    }

    // initial value: an object containing all the emotions from the icon map initialized to 0
    // ex: {happy: 0, anger: 0, sad: 0, ...}
    const [predictions, setPredictions] = useState(
        Object.fromEntries(Object.keys(iconMap).map((entry) => [entry, 0]))
    );

    // calculates the emotion with the highest prediction
    const highestPrediction = useMemo(() => {
        return Object.keys(predictions).reduce((a, b) =>
            predictions[a] > predictions[b] ? a : b
        );
    }, [predictions]);

    // temporary function for testing purposes
//    useEffect(() => {
//        (async function () {
//            function randInt(min, max) {
//                return Math.floor(Math.random() * (max - min + 1) + min);
//            }
//
//            const newPredictions = {};
//            let percentageRemaining = 100;
//
//            Object.keys(predictions).forEach((prediction) => {
//                const newValue = randInt(0, percentageRemaining);
//                percentageRemaining -= newValue;
//                newPredictions[prediction] = newValue;
//            });
//
//            await sleep(1000);
//            setPredictions(newPredictions);
//        })();
//    }, [predictions]);
//
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="flex items-center justify-center border-r-4">
                <Webcam className="rounded-lg"
                    ref={webcamRef}
                />
            </div>

            <div>
                <Emoji>{highestPrediction}</Emoji>

                <hr className="border-b-4 w-full" />

                <div className="flex flex-col items-center justify-center gap-4 p-4">
                    {Object.keys(predictions).map((prediction) => (
                        <BarGraphLine
                            key={prediction}
                            emoji={prediction}
                            percentage={predictions[prediction]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
