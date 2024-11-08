import { Button, Card, Header, HeroLayout, Input } from '@/components';
import { keepOnlyNumbers, maskCpf, maskCurrency } from '@/utils';
import { Routes } from '@/constants';
import { isValid } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { postBooking } from '@/services';

export const AddBookingPage = () => {
  const router = useRouter();

  const [customer, setCustomer] = useState('');
  const [room, setRoom] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  const getIsValid = useCallback(() => {
    let numInvalid = 6;

    if (customer.trim().length === 14) {
      numInvalid--;
    }
    if (room.trim().length > 0) {
      numInvalid--;
    }
    if (numPeople.trim().length > 0) {
      numInvalid--;
    }
    if (+keepOnlyNumbers(totalAmount) / 100 > 0) {
      numInvalid--;
    }
    if (isValid(new Date(checkinDate))) {
      numInvalid--;
    }
    if (isValid(new Date(checkoutDate))) {
      numInvalid--;
    }

    return numInvalid === 0;
  }, [checkinDate, checkoutDate, customer, numPeople, room, totalAmount]);

  const handleSubmit = useCallback(async () => {
    const { isError } = await postBooking({
      customer,
      checkinDate,
      checkoutDate,
      numPeople,
      room,
      totalAmount: +keepOnlyNumbers(totalAmount) / 100,
    });
    if (!isError) {
      router.push(Routes.Bookings);
    }
  }, [checkinDate, checkoutDate, customer, numPeople, room, router, totalAmount]);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Cadastro de Agendamentos</Header.Title>
        <Header.Breadcrumbs parent="Agendamentos" page="Cadastro de Agendamentos" parentRoute={Routes.Bookings} />
      </Header.Root>
      <Card removePadding showScroll={false}>
        <div className="px-[50px] py-[15px] text-dark text-base font-medium border-b border-b-[#E2E8F0]">
          Informações do Agendamento
        </div>
        <div className="px-[50px] py-[45px]">
          <div className="w-full h-[395px] flex-col justify-start items-start gap-[30px] inline-flex">
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input
                label="Cliente"
                placeholder="Ex: 111.111.111-11"
                value={customer}
                onChange={setCustomer}
                mask={maskCpf}
              />
              <Input label="Quarto" placeholder="Ex: 201" value={room} onChange={setRoom} mask={keepOnlyNumbers} />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input
                label="N° Pessoas"
                placeholder="Ex: 3"
                value={numPeople}
                onChange={setNumPeople}
                mask={keepOnlyNumbers}
              />
              <Input
                label="Valor total"
                placeholder="Ex: R$ 1280,05"
                value={totalAmount}
                onChange={setTotalAmount}
                mask={maskCurrency}
              />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Data de checkin" type="date" value={checkinDate} onChange={setCheckinDate} />
              <Input label="Data de checkout" type="date" value={checkoutDate} onChange={setCheckoutDate} />
            </div>
            <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
              <Button
                onClick={handleSubmit}
                size="sm"
                disabled={!getIsValid()}
                title="Preencha todos os campos corretamente antes de enviar!"
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </HeroLayout>
  );
};
