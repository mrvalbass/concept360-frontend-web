import Header from "@/components/Header";
import Exercice from "@/components/Exercice";
import DisplayRoutine from "@/components/DisplayRoutine";
import RoutineModal from "@/components/RoutineModal";
import { useState } from "react";

export default function Programs() {
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  return (
    <>
      <RoutineModal
        open={openRoutineModal}
        setOpenRoutineModal={setOpenRoutineModal}
      />
      <Header />
      <main
        className={`flex justify-center p-10 min-h-[90vh] gap-10 bg-[linear-gradient(149deg,_rgba(255,_255,_255,_0.50)_10%,_rgba(6,_125,_93,_0.50)_65%,_rgba(0,_165,_172,_0.50)_100%)]`}>
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
        <DisplayRoutine setOpenRoutineModal={setOpenRoutineModal} />
      </main>
    </>
  );
}
