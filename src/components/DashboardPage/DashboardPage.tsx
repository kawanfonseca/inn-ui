import { Card, Header, HeroLayout, Table } from '@/components';
import { DashboardData, getDashboard } from '@/services';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-400 text-dark">
        <p className="font-medium">{`${format(label, 'dd/MM/yyyy HH:MM')}`}</p>
        <div>
          {payload.map((pld: any, index: number) => (
            <div key={index} className="flex gap-1">
              <div>Valor total:</div>
              <div style={{ color: pld.fill }}>
                {pld.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const DashboardPage = () => {
  const [pageData, setPageData] = useState<DashboardData | null>(null);

  const getPageData = useCallback(async () => {
    const { data, isError } = await getDashboard();

    if (!isError) {
      setPageData(data);
    }
  }, []);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Dashboard</Header.Title>
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        {pageData?.recentBookings && (
          <Card>
            <span className="text-lg font-semibold text-dark h-12 flex">Agendamentos recentes</span>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageData.recentBookings} width={100} height={100}>
                <XAxis dataKey="created_tmz" tickFormatter={(label: string) => format(label, 'dd/MM/yyyy HH:MM')} />
                <YAxis />
                <Bar dataKey="total_amount" fill="#7E2726" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
        {pageData && (
          <Card>
            <div className="flex justify-around items-center h-[58px] ">
              <div className="h-full flex-col justify-center items-center gap-0.5 inline-flex">
                <div className="text-center text-gray-800 text-[28px] font-bold leading-[34px]">
                  {pageData.totalCustomers}
                </div>
                <div className="text-center text-slate-500 text-sm font-medium leading-snug">Clientes</div>
              </div>
              <span className="w-[1px] h-full flex bg-slate-200" />
              <div className="h-full flex-col justify-center items-center gap-0.5 inline-flex">
                <div className="text-center text-gray-800 text-[28px] font-bold leading-[34px]">
                  {pageData.totalRevenue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="text-center text-slate-500 text-sm font-medium leading-snug">Ganho total</div>
              </div>
              <span className="w-[1px] h-full flex bg-slate-200" />
              <div className="h-full flex-col justify-center items-center gap-0.5 inline-flex">
                <div className="text-center text-gray-800 text-[28px] font-bold leading-[34px]">
                  {pageData.totalRooms}
                </div>
                <div className="text-center text-slate-500 text-sm font-medium leading-snug">Quartos</div>
              </div>
              <span className="w-[1px] h-full flex bg-slate-200" />
              <div className="h-full flex-col justify-center items-center gap-0.5 inline-flex">
                <div className="text-center text-gray-800 text-[28px] font-bold leading-[34px]">
                  {pageData.totalBookings}
                </div>
                <div className="text-center text-slate-500 text-sm font-medium leading-snug">Agendamentos</div>
              </div>
            </div>
          </Card>
        )}
        {pageData?.recentCustomers && (
          <Card>
            <span className="text-lg font-semibold text-dark h-12 flex">Clientes recentes</span>
            <Table.Root>
              <Table.Head>
                <Table.HeadItem>Cliente</Table.HeadItem>
                <Table.HeadItem>Nome</Table.HeadItem>
                <Table.HeadItem>Data de nascimento</Table.HeadItem>
              </Table.Head>
              <Table.Body>
                {pageData?.recentCustomers?.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.RowItem>{item.id}</Table.RowItem>
                    <Table.RowItem>{item.name}</Table.RowItem>
                    <Table.RowItem>{format(item.date_of_birth, 'dd/MM/yyyy')}</Table.RowItem>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card>
        )}
      </div>
    </HeroLayout>
  );
};
