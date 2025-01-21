import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/app/providers/WalletProvider";
import {
  GITBOOK_URL,
  GITHUB_URL,
  MINTING_TOKEN_NAME,
} from "@/app/constants/app-config";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";

export const metadata: Metadata = {
  title: MINTING_TOKEN_NAME,
  description: `An example minting UI for ${MINTING_TOKEN_NAME}`,
};

export const primaryFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.className} antialiased`}>
        <WalletProvider>
          <div className="flex min-h-screen">
            <div className="flex-grow items-center justify-center flex flex-col">
              <main>
                <div className="max-w-[500px] flex flex-col gap-4 px-2">
                  <h1 className="text-2xl font-bold">
                    Example {MINTING_TOKEN_NAME} Minting UI
                  </h1>
                  <p className="text-sm text-gray-800">
                    This application demonstrates {MINTING_TOKEN_NAME} token
                    minting and can be customized via{" "}
                    <i>/constants/app-config.ts</i>.
                  </p>
                </div>
                {children}

                <div className="flex w-full flex-wrap gap-4 items-center justify-end px-2">
                  <Link
                    href={GITBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/gitbook.svg"
                      alt="Gitbook Logo"
                      width={32}
                      height={32}
                      className="h-6 w-6"
                    />
                  </Link>
                  <Link
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#808080]"
                  >
                    <FaGithub className="h-6 w-6" />
                  </Link>
                </div>
                <ToastContainer
                  position="bottom-right"
                  autoClose={8000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
                />
              </main>
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
