type ChipProps = React.PropsWithChildren<{
  variant: 'success' | 'warning' | 'info';
}>;

export const Chip = ({ variant, children }: ChipProps) => {
  const getColor = () => {
    switch (variant) {
      case 'success':
        return 'text-[#219653] bg-[#219653]/10';
      case 'warning':
        return 'text-[#F0950C] bg-[#F0950C]/10';
      case 'info':
        return 'text-[#005C9F] bg-[#005C9F]/10';
    }
  };

  return (
    <div
      className={`${getColor()} h-[30px] px-3.5 py-1 rounded-[30px] justify-start items-center inline-flex text-sm font-medium leading-snug`}
    >
      {children}
    </div>
  );
};
