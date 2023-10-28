'use client';

import { MantineProvider } from '@mantine/core';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
  );
}
