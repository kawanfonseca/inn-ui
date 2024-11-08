import { Button, Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { Customer, getCustomers } from '@/services';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const CustomersPage = () => {
  const [tableValues, setTableValues] = useState<Customer[]>();

  const getInitialData = useCallback(async () => {
    const { data, isError } = await getCustomers();

    if (!isError) {
      setTableValues(data ?? []);
    }
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const router = useRouter();

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Clientes</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Clientes" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(Routes.AddCustomer)}>Cadastrar Novo</Button>
        </div>
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>Cliente</Table.HeadItem>
              <Table.HeadItem>Nome</Table.HeadItem>
              <Table.HeadItem>Data de nascimento</Table.HeadItem>
              <Table.HeadItem>Email</Table.HeadItem>
              <Table.HeadItem>Celular</Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {tableValues?.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.id}</Table.RowItem>
                  <Table.RowItem>{item.name}</Table.RowItem>
                  <Table.RowItem>{format(item.date_of_birth, 'dd/MM/yyyy')}</Table.RowItem>
                  <Table.RowItem>{item.email}</Table.RowItem>
                  <Table.RowItem>{item.cellphone}</Table.RowItem>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </HeroLayout>
  );
};
