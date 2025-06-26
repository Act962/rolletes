export function phoneApplyMask(value: string) {
  return value
    .replace(/\D/g, "") // remove tudo que não for dígito
    .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}
