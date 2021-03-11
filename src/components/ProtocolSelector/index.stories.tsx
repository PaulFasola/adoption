import React from 'react';
import { ProtocolSelector } from '.';
import { activeProtocols } from './__tests__/mocks';

console.log(activeProtocols);

export default {
  title: 'Components/ProtocolSelector',
};

export const Basic = (): React.ReactNode => {
  return <ProtocolSelector list={activeProtocols} current={activeProtocols[2]} />;
};
