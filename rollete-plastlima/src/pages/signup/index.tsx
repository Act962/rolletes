import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function applyMask(input: string) {
    const onlyNumbers = input.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos

    let masked = onlyNumbers;

    if (onlyNumbers.length <= 2) {
      masked = onlyNumbers;
    } else if (onlyNumbers.length <= 7) {
      masked = `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
    } else {
      masked = `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(
        2,
        7
      )}-${onlyNumbers.slice(7)}`;
    }

    setPhone(masked);
  }

  async function signUpUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const payload = {
        name,
        phone,
        nota: "plastlima",
      };
      const response = await fetch(
        "https://nasago.bubbleapps.io/version-test/api/1.1/wf/form_totem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json(); // <-- await adicionado aqui
      if (data) {
        toast.success("Cadastrado com sucesso");
        navigate("/rollete");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao se cadastrar");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="p-12 border rounded-md max-w-3xl w-full">
        <h3 className="font-bold text-center text-2xl">Cadastro</h3>
        <form onSubmit={signUpUser} className="space-y-4 mt-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChange={(e) => applyMask(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            value="Iniciar"
            size="lg"
            className="w-full"
            variant="plastlima"
            disabled={!(name && phone.length > 14) || isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Começar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
