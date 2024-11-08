import { Button, Card, Header, HeroLayout, Input } from '@/components';
import { maskCpf, maskPhone } from '@/utils';
import { Routes } from '@/constants';
import { isValid } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { postCustomer } from '@/services';

export const AddCustomerPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cellphone, setCellphone] = useState('');

  const getIsValid = useCallback(() => {
    let numInvalid = 5;

    if (name.trim().length > 0) {
      numInvalid--;
    }
    if (customer.trim().length === 14) {
      numInvalid--;
    }
    if (/^[\w-\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.trim())) {
      numInvalid--;
    }
    if (isValid(new Date(dateOfBirth))) {
      numInvalid--;
    }
    if (cellphone.trim().length === 15) {
      numInvalid--;
    }

    return numInvalid === 0;
  }, [cellphone, customer, dateOfBirth, email, name]);

  const handleSubmit = useCallback(async () => {
    const { isError } = await postCustomer({ name, id: customer, email, dateOfBirth, cellphone });
    if (!isError) {
      router.push(Routes.Customers);
    }
  }, [cellphone, customer, dateOfBirth, email, name, router]);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Cadastro de Clientes</Header.Title>
        <Header.Breadcrumbs parent="Clientes" page="Cadastro de Clientes" parentRoute={Routes.Customers} />
      </Header.Root>
      <Card removePadding showScroll={false}>
        <div className="px-[50px] py-[15px] text-dark text-base font-medium border-b border-b-[#E2E8F0]">
          Informações do Cliente
        </div>
        <div className="px-[50px] py-[45px]">
          <div className="w-full h-[395px] flex-col justify-start items-start gap-[30px] inline-flex">
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Nome" placeholder="Ex: Guilherme Silva de Sordi " value={name} onChange={setName} />
              <Input
                label="CPF"
                placeholder="Ex: 111.111.111-11"
                value={customer}
                onChange={setCustomer}
                mask={maskCpf}
              />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Email" placeholder="Ex: example@email.com" value={email} onChange={setEmail} />
              <Input label="Data de nascimento" type="date" value={dateOfBirth} onChange={setDateOfBirth} />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input
                label="Celular"
                placeholder="Ex: (48) 99999-9999"
                value={cellphone}
                onChange={setCellphone}
                mask={maskPhone}
              />
              <div className="w-full" />
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
