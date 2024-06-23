import React, { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const ConComp = () => {
    const canvasRef = useRef(null);
    const gradientRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        gradientRef.current = new NeatGradient({
            ref: canvasRef.current,
            colors: [
                { color: "#272019", enabled: true },
                { color: "#E7D9BE", enabled: false },
                { color: "#E53A38", enabled: false },
                { color: "#7ADBE2", enabled: false },
                { color: "#e6eed6", enabled: false }
            ],
            speed: 4,
            horizontalPressure: 3,
            verticalPressure: 3,
            waveFrequencyX: 2,
            waveFrequencyY: 2,
            waveAmplitude: 9,
            shadows: 0,
            highlights: 10,
            colorSaturation: -1,
            colorBrightness: 1,
            wireframe: false,
            colorBlending: 8,
            backgroundColor: "#FFFFFF",
            backgroundAlpha: 1,
            resolution: 1
        });

        return () => {
            gradientRef.current.destroy();
        };
    }, []);

    return (
        <canvas
            className="bgColor" // Ensure this CSS class is defined in your styles
            style={{
                // isolation: "isolate",
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                zIndex: -1
            }}
            ref={canvasRef}
        />
    );
};

export default ConComp;