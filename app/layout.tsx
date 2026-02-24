import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Navi Mumbai House Price Prediction",
    description: "Predict house prices in Navi Mumbai accurately",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-background text-foreground min-h-screen">
                <main className="min-h-screen flex flex-col items-center justify-center p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
