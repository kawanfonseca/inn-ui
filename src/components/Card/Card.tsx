type CardProps = React.PropsWithChildren<{
  removePadding?: boolean;
  showScroll?: boolean;
}>;

export const Card = ({ children, removePadding, showScroll = true }: CardProps) => {
  return (
    <div
      className={`w-full bg-white ${removePadding ? '' : 'p-[30px]'} rounded-sm	border border-[#E2E8F0] drop-shadow-xl ${showScroll ? 'overflow-auto max-w-full' : ''}`}
    >
      {children}
    </div>
  );
};
