import React, { ReactNode } from 'react';
import { Icon, IconType } from '../../common/Icon';
import { buildField } from './fields/fieldBuilder';
import { ISetting, ISettingsProps } from './interfaces';
import { Container, Content, Field, Label } from './styles';

export const SettingsPanel: React.FC<ISettingsProps> = (props) => {
  const renderSetting = (name: string, data: ISetting, index: number): ReactNode => (
    <Field key={index}>
      <Label htmlFor={name}>
        {data.label}
        {data.hint && <Icon type={IconType.HelpCircleO} title={data.hint} />}
        {buildField({ name, ...data, onChange: props.onSettingChanged }, data.customInput)}
      </Label>
    </Field>
  );

  return (
    <Container visible={props.visible}>
      <Content canOverflow={Object.entries(props.settings).length > 3}>
        {Object.keys(props.settings).map((key, i) => renderSetting(key, props.settings[key], i))}
      </Content>
    </Container>
  );
};
