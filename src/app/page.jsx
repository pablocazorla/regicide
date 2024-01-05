"use client";
import MainApp from "@/screens/app";
import AppOptionContextProvider from "@/contexts/appOptions/provider";

export default function Home() {
  return (
    <AppOptionContextProvider>
      <MainApp />
    </AppOptionContextProvider>
  );
}
