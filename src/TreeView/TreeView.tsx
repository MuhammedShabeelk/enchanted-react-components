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
import MuiTreeView, { TreeViewProps } from '@mui/lab/TreeView';
import '@mui/lab/themeAugmentation';
import { Components, Theme } from '@mui/material';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import ChevronRight from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';

export { TreeViewProps };

/**
 * Override out of the box styling from MUI to align with designer theme.
 * @returns override TreeView and TreeItem component styles and props
 */
export const getMuiTreeViewThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTreeView: {
      styleOverrides: {
        root: () => {
          return {
            padding: '0px',
          };
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => {
          return {
            '& .MuiTreeItem-content': {
              position: 'relative',
              minHeight: '28px',
              height: 'auto',
              padding: '0 10px 0 4px',
              borderRadius: '2px',
              gap: '4px',
              '& .MuiTreeItem-label': {
                paddingLeft: 0,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selectedOpacity,
                '& .tree-item-icon svg': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-label-text': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-details-text': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-end-action svg': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-hover-actions svg': {
                  color: theme.palette.action.selected,
                },
                '& .MuiTreeItem-iconContainer svg': {
                  color: theme.palette.action.selected,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  borderRadius: '2px 0 0 2px',
                  backgroundColor: theme.palette.action.selected,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.selectedOpacityHover,
                },
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '-2px',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selectedOpacity,
                  '&:hover': {
                    backgroundColor: theme.palette.action.selectedOpacityHover,
                  },
                },
              },
              // '&.Mui-focused': {
              //   backgroundColor: 'transparent',
              // },
              '&.Mui-disabled': {
                pointerEvents: 'none',
              },
              '&:hover .tree-item-hover-actions, &.Mui-focused .tree-item-hover-actions': {
                opacity: 1,
              },
            },
            '& .MuiTreeItem-iconContainer': {
              width: '16px !important',
              height: '16px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 0,
              marginRight: '0 !important',
              '& svg': {
                fontSize: '16px !important',
                color: theme.palette.text.secondary,
              },
            },
            '& .MuiTreeItem-label': {
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 0,
              ...theme.typography.body2,
              color: theme.palette.text.primary,
            },
            '&.Mui-disabled > .MuiTreeItem-content': {
              pointerEvents: 'none',
            },
            '& .MuiTreeItem-group': {
              marginLeft: '12px',
              paddingLeft: '8px',
              borderLeft: `1px solid ${theme.palette.border.secondary}`,
            },
          };
        },
      },
    },
  };
};

const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (props: TreeViewProps, ref: React.Ref<HTMLUListElement>) => {
    const { defaultCollapseIcon, defaultExpandIcon, ...rest } = props;
    return (
      <MuiTreeView
        ref={ref}
        defaultCollapseIcon={defaultCollapseIcon ?? <ChevronDownIcon />}
        defaultExpandIcon={defaultExpandIcon ?? <ChevronRight />}
        {...rest}
      />
    );
  },
);

TreeView.displayName = 'TreeView';

export * from '@mui/lab/TreeView';
export { default as TreeItem } from './TreeItem';
export type { EnhancedTreeItemProps } from './TreeItem';
export default TreeView;
