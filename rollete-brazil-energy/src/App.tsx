import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from "react-confetti";

interface Prizes {
  id: number;
  title: string;
  message: string;
  prize?: string;
  confetti: boolean;
  repeat: boolean
}

const alert: Prizes[] = [
  { id: 1, title: "Parabéns, você girou e brilhou 🎉🎉", message: "A sorte sorriu e o brinde é seu!", prize: "", confetti: true, repeat: false },
  { id: 2, title: "Ops!!", message: "A sorte escapou dessa vez 😅", prize: "", confetti: false, repeat: true },
  { id: 3, title: "Que pena!!", message: "Você não ganhou dessa vez! Não desanime, têm muita energia por aqui⚡", prize: "", confetti: false, repeat: true },
  { id: 4, title: "Parabéns, você ganhou 🎉🎉", message: "Você é pura energia premiada ⚡", prize: "", confetti: true, repeat: true },
  { id: 5, title: "Que pena!", message: "Sorte offline no momento! 😬", prize: "", confetti: false, repeat: true },
  { id: 6, title: "Que pena!", message: "Perdeu...mas ganhou experiência! 🍀", prize: "", confetti: false, repeat: true },

]

const data = [
  { id: 1, option: "PRÊMIO" },
  { id: 2, option: "NÃO FOI DESSA VEZ" },
  { id: 3, option: "PERDEU" },
  { id: 4, option: "PRÊMIO" },
  { id: 5, option: "PASSOU A VEZ" },
  { id: 6, option: "PASSOU A VEZ" },
];

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">

      <img src="FUNDO TOTEN ACT.png" className="absolute -z-10 w-full h-full object-fit" alt="" />

      <div className="relative z-10">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          disableInitialAnimation={true}
          outerBorderColor="#FFFFFF"
          outerBorderWidth={4}
          innerBorderColor={"#f2f2f2"}
          radiusLineColor={"tranparent"}
          radiusLineWidth={1}
          fontSize={15}
          textColors={["white"]}
          fontWeight="bold"
          spinDuration={0.6}
          backgroundColors={[
            "#60a5fa",
            "#64b031",
            "oklch(63.7% 0.237 25.331)",
            "#60a5fa",
            "#64b031",
            "oklch(63.7% 0.237 25.331)",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true);
            setConfetti(alert[prizeNumber].confetti);
          }}
        />

        <div className="absolute top-[50%] left-[50%] z-20 translate-x-[-55%] translate-y-[-55%] size-12 bg-white rounded-full shadow-md cursor-pointer" onClick={handleSpinClick} />
      </div>
      <Button
        onClick={handleSpinClick}
        className="border-1 border-transparent hover:border-white cursor-pointer"
      >
        GIRAR
      </Button>

      {/* External Link
      <a href="https://nasaex.com/totem?cod=principio" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a>
      */}


      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p> {alert[prizeNumber].title} </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p> {alert[prizeNumber].message} <span className="font-medium"> {alert[prizeNumber].prize} </span>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>

              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel>


          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Contetti */}
      {confetti && (
        <Confetti
          className="w-full h-screen"
          width={screen.width}
          height={screen.height}
          tweenDuration={1000}
        />
      )}
    </div>
  );
}