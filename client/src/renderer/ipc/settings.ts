import {useMutation} from '@tanstack/react-query';

interface Args {
  onSuccess: () => void;
}

export const useResetSettings = ({onSuccess}: Args) => {
  return useMutation<void, Error, void>({
      mutationFn: () => {
        return window.todoApi.resetSettings();
      },
      onSuccess,
    },
  );
}
