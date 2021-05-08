import React, { ReactNode } from 'react';
import { Icon, IconType } from '../../common/Icon';
import { buildField } from './fields/fieldBuilder';
import { ISetting, ISettingsProps } from './interfaces';
import { Container, Content, Field, Label } from './styles';

export const Settings: React.FC<ISettingsProps> = (props) => {
  const renderSetting = (name: string, data: ISetting, index: number): ReactNode => {
    return (
      <Field key={index}>
        <Label>
          {data['label']}
          {data.hint && <Icon type={IconType.HelpCircleO} title={data.hint} />}
        </Label>
        {buildField({ name, ...data, onChange: props.onSettingChanged }, data.customInput)}
      </Field>
    );
  };

  return (
    <Container visible={props.visible}>
      <Content>
        {Object.keys(props.settings).map((key, i) => renderSetting(key, props.settings[key], i))}
      </Content>
    </Container>
  );
};
