import { Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { Modal } from './Modal';
import { useCallback, useEffect, useState } from 'react';
import { Room, getRooms } from '@/services';

export const RoomsPage = () => {
  const [tableValues, setTableValues] = useState<Room[]>();
  const [modalData, setModalData] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((item: Room) => {
    setModalData(item);
    setIsModalOpen(true);
  }, []);

  const getInitialData = useCallback(async () => {
    const { data, isError } = await getRooms();

    if (!isError) {
      setTableValues(data ?? []);
    }
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Quartos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Quartos" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>N°</Table.HeadItem>
              <Table.HeadItem>Descrição</Table.HeadItem>
              <Table.HeadItem>Banheiros</Table.HeadItem>
              <Table.HeadItem>Lotação</Table.HeadItem>
              <Table.HeadItem>Preço</Table.HeadItem>
              <Table.HeadItem></Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {tableValues?.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.number}</Table.RowItem>
                  <Table.RowItem>{item.description}</Table.RowItem>
                  <Table.RowItem>{item.num_bathrooms}</Table.RowItem>
                  <Table.RowItem>{item.capacity}</Table.RowItem>
                  <Table.RowItem>
                    {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Table.RowItem>
                  <div className="h-[66px] flex items-center">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="material-icons-round text-[#1C2434] p-1 rounded-full hover:bg-dark/10"
                    >
                      visibility
                    </button>
                  </div>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
      <Modal item={modalData} isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </HeroLayout>
  );
};
