import React from "react";
import "/styles/scss/nextjs-material-kit.scss";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}