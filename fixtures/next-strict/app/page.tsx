// Next.js Strict ESLint configuration fixture
import React from 'react';

interface HomePageProps {
  readonly searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ searchParams }: HomePageProps) {
  const greeting = (searchParams?.greeting as string) || 'Hello, Next.js!';

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        {greeting}
      </h1>
      <p
        style={{
          fontSize: '1.125rem',
          color: '#666',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        This is a Next.js application using the strict ESLint configuration.
      </p>
    </main>
  );
}

export const metadata = {
  title: 'Next.js Strict Fixture',
  description: 'A fixture for testing Next.js strict ESLint configuration',
} as const;
