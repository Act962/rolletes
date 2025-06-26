import { Button } from "../../components/ui/button";

export function Buttons() {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button>Primary Outline</Button>
    </div>
  );
}
