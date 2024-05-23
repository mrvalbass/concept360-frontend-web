import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main
        className={`flex flex-col min-h-[90vh] items-center justify-center`}
      >
        Bienvenue sur la HomePage
      </main>
    </>
  );
}
