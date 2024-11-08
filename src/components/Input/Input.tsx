import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  mask?: (value: string) => string;
};

export const Input = ({ label, placeholder, value, type = 'text', onChange, mask }: InputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      onChange?.(mask(e.target.value));
    } else {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className="w-full h-[85px] flex-col justify-center items-start gap-[13px] flex">
      <label className="text-gray-800 text-sm font-medium leading-snug">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleOnChange}
        className="w-full h-[50px] relative bg-white rounded border border-slate-200 px-6 py-4 text-dark placeholder:text-txtcolor text-base font-normal leading-normal"
        placeholder={placeholder}
      />
    </div>
  );
};
