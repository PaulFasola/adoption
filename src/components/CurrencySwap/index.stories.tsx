import React, { useState } from 'react';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
import { activeProtocols } from '../ProtocolSelector/__tests__/mocks';
import { CurrencySwap } from '.';
import { ISwapSubmission } from './interfaces';

export default {
  title: 'Components/CurrencySwap',
};

export const Basic = (): React.ReactElement => {
  const [submittedPayload, setSubmittedPayload] = useState<ISwapSubmission>();

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <CurrencySwap
          protocols={{
            input: activeProtocols,
          }}
          onSubmit={(payload) => setSubmittedPayload(payload)}
        />
      </div>

      {submittedPayload && (
        <div style={{ marginTop: '30px' }}>
          <b>Submission:</b>
          <pre>{JSON.stringify(submittedPayload, null, '\t')}</pre>
        </div>
      )}
    </>
  );
};

export const Themed = (): React.ReactNode => {
  return (
    <ThemeWrapper>
      <Basic />
    </ThemeWrapper>
  );
};
