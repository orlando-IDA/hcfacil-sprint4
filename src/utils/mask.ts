export const maskCPF = (value: string): string => {
  let v = value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); // 123.4
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // 123.456.7
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4'); // 123.456.789-00

  return v;
};

export const maskTelefone = (value: string): string => {
  let v = value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/, '($1) $2'); // (11) 9
  v = v.replace(/(\d{5})(\d{4})$/, '$1-$2'); // (11) 98888-7777

  return v;
};