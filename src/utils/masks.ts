export const keepOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, '');
};

export const maskCurrency = (value: string) => {
  return (+keepOnlyNumbers(value) / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

export const maskCpf = (value: string) => {
  return keepOnlyNumbers(value)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = (value: string) => {
  value = value.slice(0, 15);
  value = keepOnlyNumbers(value)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
};
