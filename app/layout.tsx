import { Raleway } from "next/font/google";
import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Provider from "@/components/Provider"
const raleway = Raleway({ subsets: ["latin"] });

export const metadata= {
  title: "PromptAI",
  description: "Prompt Ai is a platform that allows you to generate,delete,modify and create prompts ai",
};

export default function RootLayout({
  children
}:{
  children:React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Provider>
          <div className="main">
              <div className="gradient" />
          </div>

          <main className="app">
            {/* shared navbar */}
            <Navbar />
            {children}
          </main>
          </Provider>
      </body>
    </html>
  );
}
