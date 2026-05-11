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
import { StoryFn, Meta } from '@storybook/react';
import DocumentIcon from '@hcl-software/enchanted-icons/dist/carbon/es/document';
import IconView from '@hcl-software/enchanted-icons/dist/carbon/es/view';
import HomeIcon from '@hcl-software/enchanted-icons/dist/carbon/es/home';
import FolderIcon from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import ArrowLeftIcon from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--left';
import OverflowMenuHorizontalIcon from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';
import EditIcon from '@hcl-software/enchanted-icons/dist/carbon/es/edit';
import TrashCanIcon from '@hcl-software/enchanted-icons/dist/carbon/es/trash-can';
import Box from '@mui/material/Box';
import CustomIconUserStatusActive from '@hcl-software/enchanted-icons/dist/apps/es/user-status--active';
import IconButton from '../IconButton';
import { IconButtonVariants } from '../IconButton/IconButton';
import TreeView, { TreeItem } from './TreeView';

export default {
  title: 'Navigation/TreeView',
  component: TreeView,
  argTypes: {
    multiSelect: {
      if: { arg: 'interactive' },
      description: 'If true, ctrl and shift will trigger multiselect',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    disableSelection: {
      if: { arg: 'interactive' },
      description: 'If true, selection is disabled',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    defaultExpanded: { table: { disable: true } },
    defaultCollapseIcon: { table: { disable: true } },
    defaultExpandIcon: { table: { disable: true } },
    defaultParentIcon: { table: { disable: true } },
    defaultEndIcon: { table: { disable: true } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    classes: { table: { disable: true } },
    sx: { table: { disable: true } },
    expanded: { table: { disable: true } },
    selected: { table: { disable: true } },
    onNodeSelect: { table: { disable: true } },
    onNodeToggle: { table: { disable: true } },
    onNodeFocus: { table: { disable: true } },
  },
} as Meta<typeof TreeView>;

/* Status badge helper */
const StatusBadge = () => {
  return (
    <CustomIconUserStatusActive style={{ fontSize: 16, color: '#15D36E' }} sx={{ '& path': { stroke: '#07432F' } }} />
  // <Badge
  //   badgeContent=""
  //   color="success"
  //   variant="dot"
  //   sx={{ '& .MuiBadge-badge': { width: 16, height: 16, borderRadius: '1000px' } }}
  // />
  );
};

/* ── Interactive story ─────────────────────────────────────────────────── */
type InteractiveArgs = { multiSelect?: boolean; disableSelection?: boolean };
const InteractiveTemplate: StoryFn<InteractiveArgs> = (args) => {
  const overflowAction = (
    <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}>
      <OverflowMenuHorizontalIcon />
    </IconButton>
  );
  const hoverActionButtons = (
    <>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><IconView /></IconButton>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><OverflowMenuHorizontalIcon /></IconButton>
    </>
  );

  return (
    <TreeView
      multiSelect={args.multiSelect}
      disableSelection={args.disableSelection}
      defaultExpanded={['1', '3']}
    >
      {/* Default – all Figma slots */}
      <TreeItem
        nodeId="1"
        label="Item"
        startIcon={<DocumentIcon />}
        statusBadge={<StatusBadge />}
        detailsIcon={<ArrowLeftIcon />}
        detailsText="Text"
        endIcon={<HomeIcon />}
        endAction={overflowAction}
        hoverActions={hoverActionButtons}
      >
        {/* Hover actions variant */}
        <TreeItem
          nodeId="2"
          label="Chrome"
          startIcon={<DocumentIcon />}
          hoverActions={hoverActionButtons}
        >
          <TreeItem nodeId="3" label="Default Settings" startIcon={<DocumentIcon />} hoverActions={hoverActionButtons} />
        </TreeItem>
      </TreeItem>
      {/* Disabled */}
      <TreeItem nodeId="4" label="Bootstrap" startIcon={<DocumentIcon />} disabled>
        <TreeItem nodeId="5" label="test" startIcon={<DocumentIcon />} />
      </TreeItem>
    </TreeView>
  );
};

export const ExampleTreeView = InteractiveTemplate.bind({});
ExampleTreeView.args = { multiSelect: false, disableSelection: false };
ExampleTreeView.parameters = { controls: { include: ['multiSelect', 'disableSelection'] } };

/* ── Visual test – all Figma variants ─────────────────────────────────── */
const VisualTestTemplate: StoryFn<object> = () => {
  const overflowAction = (
    <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}>
      <OverflowMenuHorizontalIcon />
    </IconButton>
  );
  const hoverActionButtons = (
    <>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><EditIcon /></IconButton>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><TrashCanIcon /></IconButton>
    </>
  );

  type ExtraProps = {
    hoverActions?: React.ReactNode;
    endAction?: React.ReactNode;
    disabled?: boolean;
  };
  const fullItem = (nodeId: string, extra?: ExtraProps) => {
    return (
      <TreeItem
        nodeId={nodeId}
        label="Item"
        startIcon={<DocumentIcon />}
        statusBadge={<StatusBadge />}
        detailsIcon={<ArrowLeftIcon />}
        detailsText="Text"
        endIcon={<HomeIcon />}
        endAction={overflowAction}
        {...extra}
      />
    );
  };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', gap: 4, p: 2,
    }}
    >
      {/* ── State=Default, Selected=False, Hover actions=False ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=False · Hover actions=False</Box>
        <TreeView defaultExpanded={['a1']}>
          {fullItem('a1')}
        </TreeView>
      </Box>

      {/* ── State=Default, Selected=False, Hover actions=True ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=False · Hover actions=True</Box>
        <TreeView defaultExpanded={['b1']}>
          {fullItem('b1', { hoverActions: hoverActionButtons, endAction: undefined })}
        </TreeView>
      </Box>

      {/* ── State=Default, Selected=True, Hover actions=False ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=True · Hover actions=False</Box>
        <TreeView defaultExpanded={['c1']} defaultSelected="c2">
          <TreeItem nodeId="c1" label="Folder" startIcon={<FolderIcon />}>
            {fullItem('c2')}
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── State=Default, Selected=True, Hover actions=True ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=True · Hover actions=True</Box>
        <TreeView defaultExpanded={['d1']} defaultSelected="d2">
          <TreeItem nodeId="d1" label="Folder" startIcon={<FolderIcon />}>
            {fullItem('d2', { hoverActions: hoverActionButtons, endAction: undefined })}
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── No optional slots ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Minimal – label only</Box>
        <TreeView defaultExpanded={['e1']}>
          <TreeItem nodeId="e1" label="Folder">
            <TreeItem nodeId="e2" label="File one" />
            <TreeItem nodeId="e3" label="File two" />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Disabled ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Disabled</Box>
        <TreeView defaultExpanded={['f1']}>
          <TreeItem nodeId="f1" label="Folder (disabled)" startIcon={<FolderIcon />} disabled>
            <TreeItem nodeId="f2" label="File" startIcon={<DocumentIcon />} />
          </TreeItem>
          <TreeItem nodeId="f3" label="Item (disabled)" startIcon={<DocumentIcon />} disabled />
        </TreeView>
      </Box>
    </Box>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = { controls: { disable: true } };
