import Lottie from "lottie-react";
import rolleteAnimation from "../../assets/rollete.json";

import { NavLink } from "react-router";
import { Button } from "../../components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">
        Bem-vindo ao <br />
        Girou Ganhou
      </h1>
      <div className="bg-white rounded-full shadow-sm">
        <Lottie animationData={rolleteAnimation} loop className="size-48" />
      </div>

      <h2 className="font-semibold">Instruções</h2>
      <div className="p-5 border max-w-xl bg-[#1BA2B5] text-white rounded-2xl mt-2 shadow">
        <p className="text-center font-medium">
          Para concorrer a um brinde, preencha um formulário rápido. Não leva
          nem um minuto. Cada cadastro tem direito a um giro.
        </p>
      </div>

      <Button
        value="Iniciar"
        size="lg"
        className=""
        asChild
        variant="princioAtivo"
      >
        <NavLink to="/signup">Iniciar</NavLink>
      </Button>
    </div>
  );
}
