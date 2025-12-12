'use client'

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
    data,
    width = 100,
    height = 30,
    color = "#22c55e",
    className
}) => {

    // Simple SVG Path generator
    const path = useMemo(() => {
        if (!data || data.length === 0) return "";

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        // Scaling functions
        // X goes from 0 to width
        // Y goes from height to 0 (SVG coords, where 0 is top)
        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - min) / range) * height;
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
    }, [data, width, height]);

    return (
        <svg width={width} height={height} className={cn("overflow-visible", className)}>
            <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
