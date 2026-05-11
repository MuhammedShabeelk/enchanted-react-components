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
import React, { ReactNode } from 'react';
import MuiTreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Full Figma-spec layout for a tree item row (212 × 28 px):
 *
 *  padding-left 4px
 *  [caret 16×16] gap-4px
 *  [startIcon 16×16] gap-4px
 *  [statusBadge 16×16] gap-4px
 *  [label text – flex fill]
 *  [detailsIcon 16×16] gap-4px [detailsText body2]
 *  gap-4px [endIcon 16×16] gap-8px [endAction 16×16]
 *  padding-right 6px
 *
 * hoverActions are shown only on row hover / keyboard focus.
 */
export interface EnhancedTreeItemProps extends Omit<TreeItemProps, 'endIcon'> {
  /** Icon after the expand/collapse caret. 16×16. E.g. DocumentIcon. */
  startIcon?: ReactNode;
  /** Status badge after startIcon. 16×16. E.g. a coloured circle / Badge. */
  statusBadge?: ReactNode;
  /** Icon in the Details section (left of detailsText). 16×16. E.g. ArrowLeftIcon. */
  detailsIcon?: ReactNode;
  /** Text in the Details section. Rendered as body2 / text-secondary. */
  detailsText?: ReactNode;
  /**
   * Always-visible icon at the far right, before endAction. 16×16.
   * Corresponds to "Icon - end" in Figma (e.g. HomeIcon).
   */
  endIcon?: ReactNode;
  /**
   * Always-visible action at the far right (e.g. an IconButton).
   * Corresponds to "Action - end" / "overflow-menu--horizontal" in Figma.
   */
  endAction?: ReactNode;
  /** Buttons revealed only on row hover / keyboard focus (opacity 0 → 1). */
  hoverActions?: ReactNode;
}

const ICON_SLOT_SX = {
  width: 16,
  height: 16,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { fontSize: '16px' },
} as const;
const IconSlot = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <Box
      className={`tree-item-icon${className ? ` ${className}` : ''}`}
      sx={ICON_SLOT_SX}
    >
      {children}
    </Box>
  );
};

const TreeItem = React.forwardRef<HTMLLIElement, EnhancedTreeItemProps>(
  (
    {
      label,
      startIcon,
      statusBadge,
      detailsIcon,
      detailsText,
      endIcon,
      endAction,
      hoverActions,
      ...props
    },
    ref,
  ) => {
    const customLabel = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '4px',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {startIcon && <IconSlot className="tree-item-start-icon">{startIcon}</IconSlot>}

        {statusBadge && (
          <Box className="tree-item-icon tree-item-status" sx={ICON_SLOT_SX}>
            {statusBadge}
          </Box>
        )}

        <Typography
          className="tree-item-label-text"
          variant="body2"
          color="text.primary"
          noWrap
          sx={{
            flex: '1 0 0',
            minWidth: 0,
          }}
        >
          {label}
        </Typography>

        {(detailsIcon !== undefined || detailsText !== undefined) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {detailsIcon && <IconSlot className="tree-item-details-icon">{detailsIcon}</IconSlot>}
            {detailsText !== undefined && (
              <Typography className="tree-item-details-text" variant="body2" color="text.secondary" noWrap sx={{ flexShrink: 0 }}>
                {detailsText}
              </Typography>
            )}
          </Box>
        )}

        {(endIcon !== undefined || endAction !== undefined) && (
          <Box
            className="tree-item-end-action"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {endIcon && <IconSlot className="tree-item-end-icon">{endIcon}</IconSlot>}
            {endAction}
          </Box>
        )}

        {hoverActions && (
          <Box
            className="tree-item-hover-actions"
            sx={{
              maxWidth: 0,
              overflow: 'hidden',
              opacity: 0,
              transition: 'max-width 0.2s ease, opacity 0.2s ease',
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              gap: '8px',
              marginLeft: '4px',
              '.MuiTreeItem-content:hover &, .MuiTreeItem-content.Mui-focused &': {
                maxWidth: '200px',
                opacity: 1,
              },
            }}
          >
            {hoverActions}
          </Box>
        )}
      </Box>
    );

    return <MuiTreeItem ref={ref} {...props} label={customLabel} />;
  },
);

TreeItem.displayName = 'TreeItem';

export * from '@mui/lab/TreeItem';
export default TreeItem;
