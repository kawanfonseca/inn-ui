import { Sidebar } from '@/components';

type HeroLayoutProps = React.PropsWithChildren<{}>;

export const HeroLayout = ({ children }: HeroLayoutProps) => {
  return (
    <div className="w-[100vw] min-h-[100vh] overflow-hidden relative">
      <Sidebar />
      <div className="w-[calc(100vw-280px)] ml-[280px] h-full bg-slate-100 py-[50px] px-[105px] gap-14 flex flex-col">
        {children}
      </div>
    </div>
  );
};
