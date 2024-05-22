import Header from "@/components/Header";
import Exercice from "@/components/Exercice";

export default function Programs() {
  return (
    <>
      <Header />
      <main
        className={`flex flex-col min-h-screen min-w-full items-center justify-center bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}>
        <div className='border-4 border-[red] bg-white ms-2.5	p-8	rounded'>
          <h2 className='flex border-4 border-[yellow] items-center justify-center @apply rounded-[5px_5px_0px_0px] p-5'>
            Exercices
          </h2>
          <div className='border-4 border-[blue]'>
            <Exercice />
            <Exercice />
            <Exercice />
          </div>
          <button>Create new exercice</button>
        </div>
      </main>
    </>
  );
}
