import Header from "@/components/Header";
import Exercice from "@/components/Exercice";

export default function Programs() {
  return (
    <>
      <Header />
      <main
        className={`flex flex-col min-h-screen min-w-full items-center justify-center bg-[linear-gradient(149deg,rgba(255,255,255,0.40)10%,rgba(6,125,93,0.40)65%,rgba(0,165,172,0.40)100%)]`}>
        <div className='w-[40%] h-[40%] bg-white ms-2.5 p-8 rounded'>
          <h2 className='font-medium text-xl font-[Sora] border-b flex items-center justify-center @apply rounded-[5px_5px_0px_0px] p-5'>
            Exercices
          </h2>
          <div className='p-2'>
            <Exercice />
          </div>
          <div className='flex items-center justify-center '>
            <button className='flex bg-white drop-shadow-lg w-[40%] h-[40px] items-center justify-center font-semibold'>
              Create new exercice
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
