import { Chip } from '@/components';
import { StatusKeys } from '@/services';
import { useCallback, useEffect, useState } from 'react';

type StatusChipProps = {
  status: StatusKeys;
  onChange: (value: StatusKeys) => void;
};

export const StatusChip = ({ status, onChange }: StatusChipProps) => {
  const captions: Record<StatusKeys, string> = {
    COMPLETE: 'Completo',
    ONGOING: 'Andamento',
    PENDING: 'Pendente',
  };

  const getVariant = useCallback(() => {
    switch (status) {
      case 'COMPLETE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'ONGOING':
        return 'info';
    }
  }, [status]);

  const handleUpdate = useCallback(() => {
    switch (status) {
      case 'PENDING':
        onChange('ONGOING');
        break;
      case 'ONGOING':
        onChange('COMPLETE');
        break;
    }
  }, [onChange, status]);

  const hasNextStatus = status !== 'COMPLETE';

  return (
    <button
      onClick={handleUpdate}
      className={`rounded-[30px] cursor-default ${hasNextStatus && 'cursor-pointer'}`}
      disabled={!hasNextStatus}
    >
      <Chip variant={getVariant()}>
        <span>{captions[status]}</span>
        {hasNextStatus && <span className="material-icons-round text-xl w-3">chevron_right</span>}
      </Chip>
    </button>
  );
};
