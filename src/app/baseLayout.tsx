"use client";

import { useDataPooling } from "@/hooks/useDataPooling";
export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useDataPooling();
  return <>{children}</>;
}
