type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  size?: 'fill' | 'md' | 'sm' | 'xs';
  title?: string;
}>;

export const Button = ({ children, disabled, size = 'md', title, onClick }: ButtonProps) => {
  const getSize = () => {
    switch (size) {
      case 'fill':
        return 'w-full';
      case 'md':
        return 'w-[270px]';
      case 'sm':
        return 'w-[225px]';
      case 'xs':
        return 'w-[175px]';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={disabled ? title : undefined}
      className={`${getSize()} h-[50px] py-[15px] bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed rounded justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal`}
    >
      {children}
    </button>
  );
};
