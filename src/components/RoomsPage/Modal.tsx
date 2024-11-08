import { Button } from '@/components';
import { Card } from '../Card';
import { Room } from '@/services';

type ModalProps = {
  item: Room | null;
  isOpen: boolean;
  handleClose: () => void;
};

export const Modal = ({ item, isOpen, handleClose }: ModalProps) => {
  if (!isOpen || !item) return null;

  return (
    <div className="w-[100vw] h-[100vh] absolute inset-0 bg-dark/20 flex items-center justify-center">
      <div className="w-[805px]">
        <Card removePadding showScroll={false}>
          <div className="w-full h-[70px] px-[30px] border-b border-slate-200 justify-start items-center gap-2.5 inline-flex text-dark text-2xl font-semibold leading-normal">
            {item.number} - {item.description}
          </div>
          <div className="w-full px-[30px] py-2.5 flex-col justify-start items-start gap-2.5 flex">
            <div className="self-stretch h-[117px] flex-col justify-start items-start gap-[5px] flex">
              <div className="self-stretch h-10 text-dark text-xl font-medium leading-normal">Descrição</div>
              <div className="self-stretch px-5 justify-start items-start gap-2.5 inline-flex">
                <div className="grow shrink basis-0 self-stretch">
                  <div>
                    <span className="text-dark text-base font-medium leading-normal">N° banheiros:</span>
                    <span className="text-dark text-base font-normal leading-normal"> {item.num_bathrooms}</span>
                  </div>
                  <div>
                    <span className="text-dark text-base font-medium leading-normal">Lotação máxima:</span>
                    <span className="text-dark text-base font-normal leading-normal"> {item.capacity}</span>
                  </div>
                  <div>
                    <span className="text-dark text-base font-medium leading-normal">Preço diária:</span>
                    <span className="text-dark text-base font-normal leading-normal">
                      {' '}
                      {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-[5px] flex pb-6">
              <div className="self-stretch h-10 text-dark text-xl font-medium leading-normal">Amenidades</div>
              <div className="self-stretch grow shrink basis-0 px-5 justify-start items-center gap-2.5 flex flex-wrap">
                {item.amenities.map((a, index) => (
                  <div
                    key={index}
                    className="w-[227px] h-10 bg-secondary text-white rounded-[100px] justify-center items-center gap-[11px] flex"
                  >
                    <div className="relative material-icons-round">{a.icon}</div>
                    <div className="text-base font-normal leading-normal">{a.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-[100px] px-5 flex items-center justify-end">
            <Button size="xs" onClick={handleClose}>
              Ok
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
