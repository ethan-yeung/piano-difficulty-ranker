"use client";
import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

type AnimatedNumberProps = {
    from: number;
    to: number;
};

export default function AnimatedNumber({ from, to }: AnimatedNumberProps) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        count.set(from);
        const controls = animate(count, to, {
            duration: 1,
            ease: "easeOut",
            delay: 0.6,   
        });
        return () => controls.stop();
    }, [from, to]);

    return <motion.span>{rounded}</motion.span>;
}