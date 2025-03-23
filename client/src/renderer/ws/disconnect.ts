import React from 'react';
import {getSocket} from './socket';

export const useWSDisconnect = (onDisconnect: () => void) => {
  const prev = React.useRef<VoidFunction | undefined>(undefined);
  React.useEffect(() => {
    const io = getSocket();
    if (prev.current) {
      // Clear any previous listener, as this is a singleton.
      io.off('disconnect', prev.current);
    }
    prev.current = onDisconnect;
    io.on('disconnect', onDisconnect);

    return () => {
      io.off('disconnect', onDisconnect);
    }
  }, [onDisconnect]);
};
