"use client";

import { motion } from "framer-motion";

export function LogoAnimation() {
    const circles = [
        { cx: 278, cy: 278, r: 278, fill: "#3485FD" }, // Blue
        { cx: 336, cy: 278, r: 278, fill: "#14AE5C" }, // Green
        { cx: 493, cy: 278, r: 278, fill: "#D9D9D9" }, // Gray
        { cx: 415, cy: 278, r: 278, fill: "#7561FF" }, // Purple
        { cx: 493, cy: 278, r: 278, fill: "#FD933A" }, // Orange
    ];

    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 556 556"
            width={500}
            height={500}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <mask
                id="mask0"
                style={{ maskType: "alpha" }}
                x="0"
                y="0"
                width="800"
                height="800"
            >
                <circle cx="278" cy="278" r="278" fill="#7561FF" />
            </mask>

            {/* Whole logo rotation */}
            <motion.g
                mask="url(#mask0)"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
                {circles.map((circle, i) => (
                    <motion.circle
                        key={i}
                        {...circle}
                        animate={{
                            scale: [1, 1.08, 1],
                            x: [0, (i % 2 === 0 ? 15 : -15), 0],
                            y: [0, (i % 2 === 0 ? -15 : 15), 0],
                            opacity: [0.85, 1, 0.9],
                        }}
                        transition={{
                            duration: 5 + i * 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                ))}
            </motion.g>
        </motion.svg>
    );
}
