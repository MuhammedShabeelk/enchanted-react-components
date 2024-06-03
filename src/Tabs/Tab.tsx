/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab';

interface TabProps extends MuiTabProps {
  orientation?: 'horizontal' | 'vertical';
}

const TabStyled = styled(MuiTab)<TabProps>(({ theme, orientation, iconPosition }) => {
  return {
    '&.MuiTab-root': {
      ...theme.typography.subtitle2,
      minHeight: '30px',
    },
    '& .MuiSvgIcon-root': { // This targets the icon
      color: theme.palette.action.active,
      width: orientation === 'horizontal' ? '16px' : '20px',
      height: orientation === 'horizontal' ? '16px' : '20px',
      marginBottom: (orientation === 'horizontal' && iconPosition === 'top') ? '4px' : '0px',
    },
    '& .MuiTab-label': { // This targets the label
      color: theme.palette.text.secondary,
    },
    '&.Mui-selected': {
      color: theme.palette.text.primary,
    },
    '&.Mui-disabled': { // This targets the tab when it's disabled
      color: theme.palette.text.disabled,
      '& .MuiSvgIcon-root': { // This targets the icon of the disabled tab
        color: theme.palette.action.disabled,
      },
    },
  };
});

const Tab = ({ ...props }: TabProps) => {
  return (
    <TabStyled
      {...props}
      sx={{
        padding: props.orientation === 'horizontal' ? '6px 8px' : '10px',
        minHeight: 'auto',
        minWidth: 'auto',
        textTransform: 'none',
      }}
    />
  );
};

Tab.defaultProps = {
};

export * from '@mui/material/Tab';
export default Tab;
