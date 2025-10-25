'use client';

import Image from 'next/image';
import { Button } from '@novawaveui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center">
        Welcome to NovaWave UI!
      </h1>
      <div className="flex flex-col items-center gap-8">
        <Button color="primary" size="lg" variant="ghost" asChild>
          <Link href="/cool">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
