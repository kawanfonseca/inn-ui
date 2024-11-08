import { Button, Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { format } from 'date-fns';
import { StatusChip } from './StatusChip';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Booking, StatusKeys, getBookings, putBooking } from '@/services';

export const BookingsPage = () => {
  const [tableValues, setTableValues] = useState<Booking[]>();

  const getInitialData = useCallback(async () => {
    const { data, isError } = await getBookings();

    if (!isError) {
      setTableValues(data ?? []);
    }
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleUpdateStatus = useCallback(
    async (item: Booking, index: number, status: StatusKeys) => {
      const booking = {
        id: item.id,
        status: status,
        numPeople: item.num_people,
        checkinDate: item.checkin_date,
        checkoutDate: item.checkout_date,
        totalAmount: item.total_amount,
        customer: item.customer,
        room: item.room,
      };

      const { isError } = await putBooking(booking);

      if (!isError) {
        let arr = JSON.parse(JSON.stringify(tableValues)) as Booking[];
        arr[index] = { ...arr[index], status };
        setTableValues(arr);
      }
    },
    [tableValues],
  );

  const router = useRouter();

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Agendamentos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Agendamentos" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(Routes.AddBooking)}>Cadastrar Novo</Button>
        </div>
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>Cliente</Table.HeadItem>
              <Table.HeadItem>Quarto</Table.HeadItem>
              <Table.HeadItem>Data</Table.HeadItem>
              <Table.HeadItem>N° Pessoas</Table.HeadItem>
              <Table.HeadItem>Status</Table.HeadItem>
              <Table.HeadItem>Valor</Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {tableValues?.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.customer}</Table.RowItem>
                  <Table.RowItem>{item.room}</Table.RowItem>
                  <Table.RowItem>
                    {format(item.checkin_date, 'dd/MM/yyyy')} - {format(item.checkout_date, 'dd/MM/yyyy')}
                  </Table.RowItem>
                  <Table.RowItem>{item.num_people}</Table.RowItem>
                  <Table.RowItem>
                    <StatusChip status={item.status} onChange={(status) => handleUpdateStatus(item, index, status)} />
                  </Table.RowItem>
                  <Table.RowItem>
                    {item.total_amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Table.RowItem>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </HeroLayout>
  );
};
