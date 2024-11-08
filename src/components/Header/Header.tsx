import Link from 'next/link';

type RootProps = React.PropsWithChildren<{}>;
type TitleProps = React.PropsWithChildren<{}>;
type BreadcrumbsProps = {
  parent: string;
  parentRoute: string;
  page: string;
};

const Root = ({ children }: RootProps) => {
  return <div className="w-full justify-between items-center inline-flex">{children}</div>;
};

const Title = ({ children }: TitleProps) => {
  return <div className="text-gray-800 text-[26px] font-bold leading-[30px]">{children}</div>;
};

const Breadcrumbs = ({ parent, parentRoute, page }: BreadcrumbsProps) => {
  return (
    <div className="h-6 justify-start items-start gap-2 inline-flex">
      <Link href={parentRoute} className="text-right text-txtcolor text-base font-medium leading-normal">
        {parent} /
      </Link>
      <span className="text-right text-primary text-base font-medium leading-normal cursor-default">{page}</span>
    </div>
  );
};

export const Header = {
  Root,
  Title,
  Breadcrumbs,
};
