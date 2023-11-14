import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherNxt",
  description: "Live weather application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WeatherNxt" />
        <meta
          property="og:description"
          content="Live weather updates from location and around the world"
        />
        <meta property="og:image" content="/cloudy-256x256.png" />
        <meta property="og:url" content="https://weathernxt.vercel.app/" />
        <meta
          property="og:site_name"
          content="WeatherNxt: Live weather updates from location and around the world"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WeatherNxt" />
        <meta
          name="twitter:description"
          content="Live weather updates from location and around the world"
        />
        <meta name="twitter:image" content="/cloudy-256x256.png" />

        <link rel="preconnect" href="https://api.openweathermap.org" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* favicon.io */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/cloudy-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/cloudy-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
