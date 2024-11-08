import * as S from './Table.styles';

type CommomProps = React.PropsWithChildren<{}>;

const Root = ({ children }: CommomProps) => {
  return (
    <table className="table-auto w-full min-w-full overflow-x-auto" cellPadding="15">
      {children}
    </table>
  );
};

const Head = ({ children }: CommomProps) => {
  return (
    <thead className="text-dark bg-[#F7F9FC] text-left">
      <S.HeaderRow>{children}</S.HeaderRow>
    </thead>
  );
};

const HeadItem = ({ children }: CommomProps) => {
  return <th className="text-nowrap">{children}</th>;
};

const Body = ({ children }: CommomProps) => {
  return <tbody>{children}</tbody>;
};

const Row = ({ children }: CommomProps) => {
  return <S.BodyRow className="h-[66px] border-b border-[#EEEEEE]">{children}</S.BodyRow>;
};

const RowItem = ({ children }: CommomProps) => {
  return <td className="text-nowrap">{children}</td>;
};

export const Table = {
  Root,
  Head,
  HeadItem,
  Body,
  Row,
  RowItem,
};
