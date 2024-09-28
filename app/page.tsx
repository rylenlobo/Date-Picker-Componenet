import Image from "next/image";
import MiniCalendar from "@/components/MiniCalendar";
import RepeatOptions from "@/components/RepeatOptions";

export default function Home() {
  return (
    <main className=" h-screen w-screen flex justify-center items-start">
      <div className="absolute w-72 shadow-lg flex flex-col rounded-lg p-1">
        <MiniCalendar />
        <RepeatOptions />
      </div>
    </main>
  );
}
