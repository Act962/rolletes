import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "./components/ui/button";
import { ExternalLink } from 'lucide-react'
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
  { id: 1, title: "Parabéns 🎉🎉", message: "Você acaba de ganhar um ", prize: "DESCONTO DE 5%", confetti: true, repeat: false },
  { id: 4, title: "Parabéns 🎉🎉", message: "Você acaba de ganhar um ", prize: "DESCONTO DE 15%", confetti: true, repeat: false },
  { id: 3, title: "Parabéns 🎉🎉", message: "Escolha seu ", prize: "BRINDE", confetti: true, repeat: false },
  { id: 4, title: "Parabéns 🎉🎉", message: "Você acaba de ganhar um ", prize: "DESCONTO DE 10%", confetti: true, repeat: false },
  { id: 5, title: "Que pena!", message: "Infelizmente não foi dessa vez!", prize: "", confetti: false, repeat: false },

]

const data = [
  { id: 1, option: "DESCONTO 5%" },
  { id: 2, option: "DESCONTO 15%" },
  { id: 3, option: "BRINDE" },
  { id: 4, option: "DESCONTO 10%" },
  { id: 5, option: "PASSOU A VEZ" },
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#314367] to-[#2B3856] relative">
      <div className="relative">
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
          fontSize={16}
          textColors={["white"]}
          fontWeight="bold"
          spinDuration={0.6}
          backgroundColors={[
            "#60a5fa",
            "#64b031",
            "oklch(63.7% 0.237 25.331)",
            "#60a5fa",
            "oklch(63.7% 0.237 25.331)",
            "oklch(63.7% 0.237 25.331)"
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

      {/* External Link */}
      <a href="https://nasaex.com/totem?cod=principio" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a>


      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p> {alert[prizeNumber].title} </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p> {alert[prizeNumber].message} <span className="font-medium"> {alert[prizeNumber].prize} </span>!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* {alert[prizeNumber].repeat ?
              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel> : <a href="https://nasaex.com/totem?cod=Xand_bar">
                <AlertDialogCancel className="cursor-pointer" onClick={() => {
                  setOpen(false);
                  setConfetti(false);
                }}>
                  Continuar
                </AlertDialogCancel>
              </a>
            } */}
            <a href="https://nasaex.com/totem?cod=principio">
              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel>
            </a>

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