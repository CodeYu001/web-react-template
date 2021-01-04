import React from 'react';
import * as AllIcons from '@ant-design/icons';
import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export type TotalIconsProps = {
  name: string;
} & AntdIconProps;

const TotalIcons: React.FC<TotalIconsProps> = ({ className, name, ...rest }) => {
  return name
    ? React.createElement((AllIcons as AnyObject)[name], {
        ...rest,
      })
    : null;
};

export default TotalIcons;
