import React, { useState } from 'react';
import { ProtocolSelector } from '.';
import { ITheme } from '../../providers/theme/ITheme';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
import { IProtocol } from './interfaces';
import { activeProtocols } from './__tests__/mocks';

console.log(activeProtocols);

export default {
  title: 'Components/ProtocolSelector',
};

export const Basic = (): React.ReactNode => {
  const [activeProtocol, setActiveProtocol] = useState<IProtocol | null>(null);

  const handleChange = (proto: IProtocol | null) => setActiveProtocol(proto);

  return (
    <>
      <ProtocolSelector list={activeProtocols} onChange={handleChange} />
      <div style={{ marginTop: '10px' }}>
        <p>Selected protocol:</p>
        <pre>{JSON.stringify(activeProtocol, null, '\t')}</pre>
      </div>
    </>
  );
};

export const Themed = (): React.ReactNode => {
  const customThemes: Record<string, Partial<ITheme>> = {
    ugly: {
      primary: {
        hoverColor: 'blue',
        hoverBgColor: 'green',
      },
      defaultButton: {
        backgroundColor: 'pink',
        color: 'yellow',
        hoverBackgroundColor: 'red',
      },
    },
  };

  return (
    <ThemeWrapper customThemes={customThemes}>
      <ProtocolSelector list={activeProtocols} />
    </ThemeWrapper>
  );
};
