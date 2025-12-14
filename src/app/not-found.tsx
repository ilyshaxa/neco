import { Inter } from 'next/font/google';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { NotFoundButtons } from "./NotFoundButtons";
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>404 - Page Not Found | Neco</title>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange
          storageKey="neco-theme"
        >
          <AnimatedBackground />
          <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6">
            <Empty>
              <EmptyHeader>
                <EmptyTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  404
                </EmptyTitle>
                <EmptyDescription className="text-lg text-gray-700 dark:text-gray-300">
                  The page you're looking for doesn't exist. It may have been moved or deleted.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <NotFoundButtons />
              </EmptyContent>
            </Empty>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

