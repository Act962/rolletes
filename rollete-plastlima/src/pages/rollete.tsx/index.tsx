import { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";

import Confetti from "react-confetti";
import type { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import { prizers } from "../../lib/prizer";
import { Button } from "../../components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useNavigate } from "react-router";

export default function Rollete() {
  const navigate = useNavigate();
  const dataWheel: WheelData[] = useMemo(
    () => prizers.map((item) => ({ id: item.id, option: item.display })),
    []
  );
  const colors = useMemo(() => {
    if (!prizers || prizers.length === 0) return [];
    return prizers.map((item) => item.color);
  }, []);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * dataWheel.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white relative">
      <img
        src="logo.svg"
        width={140}
        height={140}
        alt="Logo Princípio Ativo"
        className="absolute top-2"
      />
      <div className="relative mt-4">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={dataWheel}
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
          backgroundColors={colors}
          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true);
            setConfetti(prizers[prizeNumber].confetti);
          }}
        />

        <div
          className="absolute top-[50%] left-[50%] z-20 translate-x-[-55%] translate-y-[-55%] size-12 bg-white rounded-full shadow-md cursor-pointer"
          onClick={handleSpinClick}
        />
      </div>
      <Button
        onClick={handleSpinClick}
        className="cursor-pointer"
        variant="plastlimaGame"
      >
        GIRAR
      </Button>

      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span> {prizers[prizeNumber].title} </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <>
                {" "}
                {prizers[prizeNumber].message}{" "}
                <span className="font-medium">
                  {" "}
                  {prizers[prizeNumber].prize}{" "}
                </span>
                !
              </>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
                setConfetti(false);
                navigate("/", { replace: true });
              }}
              variant="default"
            >
              Continuar
            </Button>
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
