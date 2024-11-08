import { Button, Card, Header, HeroLayout, Input } from '@/components';
import { Routes } from '@/constants';
import { postStaff } from '@/services';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const AddStaffPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getIsValid = useCallback(() => {
    let numInvalid = 4;

    if (name.trim().length > 0) {
      numInvalid--;
    }
    if (username.trim().length > 0) {
      numInvalid--;
    }
    if (password.trim().length > 0) {
      numInvalid--;
    }
    if (password === confirmPassword) {
      numInvalid--;
    }

    return numInvalid === 0;
  }, [confirmPassword, name, password, username]);

  const handleSubmit = useCallback(async () => {
    const { isError } = await postStaff({ name, username, password });
    if (!isError) {
      router.push(Routes.Staff);
    }
  }, [name, password, router, username]);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Cadastro de Staff</Header.Title>
        <Header.Breadcrumbs parent="Staff" page="Cadastro de Staff" parentRoute={Routes.Staff} />
      </Header.Root>
      <Card removePadding showScroll={false}>
        <div className="px-[50px] py-[15px] text-dark text-base font-medium border-b border-b-[#E2E8F0]">
          Informações do Staff
        </div>
        <div className="px-[50px] py-[45px]">
          <div className="w-full flex-col justify-start items-start gap-[30px] inline-flex">
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Nome" placeholder="Ex: Guilherme Silva de Sordi " value={name} onChange={setName} />
              <Input label="Usuário" placeholder="Ex: guilherme_ss" value={username} onChange={setUsername} />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input
                label="Senha"
                placeholder="Digite a sua senha aqui"
                value={password}
                onChange={setPassword}
                type="password"
              />
              <Input
                label="Confirmar senha"
                placeholder="Digite a sua senha novamente"
                value={confirmPassword}
                onChange={setConfirmPassword}
                type="password"
              />
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
