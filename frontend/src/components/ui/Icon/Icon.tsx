"use client";

import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import styles from "./Icon.module.scss";
import themeService from "@/services/theme.service";

interface IconProps {
    svgContent: string;
    fillColor?: string;
    size: number;
}

const Icon: React.FC<IconProps> = ({ svgContent, fillColor, size }) => {

    const normalizeColor = (color: string) => {
        if (!color) return "#CECECE";
        if (color.startsWith("#")) {
            return color;
        }
        return '#' + color;
    }
    
    const cleanSvg = useMemo(() => {
        if (!svgContent) return "";
        const sanitizedSvg = DOMPurify.sanitize(svgContent, { USE_PROFILES: { svg: true } });
        const modifiedSvg = fillColor ? sanitizedSvg
            .replace(/fill="[^"]*"/g, `fill="${normalizeColor(fillColor) || "var(--text)"}"`)
            .replace(/stroke="[^"]*"/g, `stroke="${normalizeColor(fillColor) || "var(--text)"}"`)
            : sanitizedSvg;
        
        return modifiedSvg;
    }, [svgContent, fillColor]);

    return (
        <div
            className={styles.icon}
            style={{ width: size, height: size, background: themeService.hexToRgba(normalizeColor(fillColor) || "var(--text)", 0.1) }}
            dangerouslySetInnerHTML={{ __html: cleanSvg }}
        />
    );
};

export default Icon;
