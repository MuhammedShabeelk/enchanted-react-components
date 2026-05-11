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
import FolderIcon from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import EditIcon from '@hcl-software/enchanted-icons/dist/carbon/es/edit';
import TrashCanIcon from '@hcl-software/enchanted-icons/dist/carbon/es/trash-can';
import Box from '@mui/material/Box';
import IconButton from '../../IconButton';

import TreeView from './TreeView';
import TreeItem from './TreeItem';

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

/* ── Interactive story ─────────────────────────────────────────────────── */
type InteractiveArgs = { multiSelect?: boolean; disableSelection?: boolean };
const InteractiveTemplate: StoryFn<InteractiveArgs> = (args) => {
  return (
    <TreeView multiSelect={args.multiSelect} disableSelection={args.disableSelection} defaultExpanded={['1', '3']}>
      {/* Selected=False, Hover actions=False */}
      <TreeItem nodeId="1" label="Applications" icon={<FolderIcon />}>
        <TreeItem nodeId="2" label="Calendar" icon={<DocumentIcon />} />
        {/* Selected=False, Hover actions=True */}
        <TreeItem
          nodeId="3"
          label="Chrome"
          icon={<DocumentIcon />}
          hoverActions={(
            <>
              <IconButton size="small"><EditIcon /></IconButton>
              <IconButton size="small"><TrashCanIcon /></IconButton>
            </>
            )}
        >
          <TreeItem nodeId="4" label="Default Settings" icon={<DocumentIcon />} />
        </TreeItem>
        {/* Secondary variant – label + secondaryLabel, Hover actions=True */}
        <TreeItem
          nodeId="5"
          label="Webstorm"
          secondaryLabel="v2023.3"
          icon={<DocumentIcon />}
          hoverActions={(
            <>
              <IconButton size="small"><EditIcon /></IconButton>
              <IconButton size="small"><TrashCanIcon /></IconButton>
            </>
            )}
        />
      </TreeItem>
      {/* Disabled item */}
      <TreeItem nodeId="6" label="Documents (disabled)" icon={<FolderIcon />} disabled>
        <TreeItem nodeId="7" label="Bootstrap" icon={<DocumentIcon />} />
      </TreeItem>
    </TreeView>
  );
};

export const ExampleTreeView = InteractiveTemplate.bind({});
ExampleTreeView.args = {
  multiSelect: false,
  disableSelection: false,
};
ExampleTreeView.parameters = {
  controls: { include: ['multiSelect', 'disableSelection'] },
};

/* ── Visual-test story (all Figma variants) ────────────────────────────── */
const VisualTestTemplate: StoryFn<object> = () => {
  const hoverActionButtons = (
    <>
      <IconButton size="small"><EditIcon /></IconButton>
      <IconButton size="small"><TrashCanIcon /></IconButton>
    </>
  );

  return (
    <Box
      sx={{
        display: 'flex', gap: 4, flexWrap: 'wrap', p: 2,
      }}
    >

      {/* ── Selected=False, Hover actions=False ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Selected=False, Hover actions=False</Box>
        <TreeView defaultExpanded={['f1']}>
          <TreeItem nodeId="f1" label="Folder" icon={<FolderIcon />}>
            <TreeItem nodeId="f2" label="File one" icon={<DocumentIcon />} />
            <TreeItem nodeId="f3" label="File two" icon={<DocumentIcon />} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Selected=False, Hover actions=True ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Selected=False, Hover actions=True</Box>
        <TreeView defaultExpanded={['h1']}>
          <TreeItem nodeId="h1" label="Folder" icon={<FolderIcon />} hoverActions={hoverActionButtons}>
            <TreeItem nodeId="h2" label="File one" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
            <TreeItem nodeId="h3" label="File two" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Selected=True, Hover actions=False ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Selected=True, Hover actions=False</Box>
        <TreeView defaultExpanded={['s1']} defaultSelected="s2">
          <TreeItem nodeId="s1" label="Folder" icon={<FolderIcon />}>
            <TreeItem nodeId="s2" label="File one (selected)" icon={<DocumentIcon />} />
            <TreeItem nodeId="s3" label="File two" icon={<DocumentIcon />} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Selected=True, Hover actions=True ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Selected=True, Hover actions=True</Box>
        <TreeView defaultExpanded={['sh1']} defaultSelected="sh2">
          <TreeItem nodeId="sh1" label="Folder" icon={<FolderIcon />} hoverActions={hoverActionButtons}>
            <TreeItem nodeId="sh2" label="File one (selected)" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
            <TreeItem nodeId="sh3" label="File two" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Secondary, Hover actions=False ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Secondary (with secondaryLabel), Hover actions=False</Box>
        <TreeView defaultExpanded={['sec1']}>
          <TreeItem nodeId="sec1" label="Folder" secondaryLabel="12 items" icon={<FolderIcon />}>
            <TreeItem nodeId="sec2" label="Document A" secondaryLabel="48 KB" icon={<DocumentIcon />} />
            <TreeItem nodeId="sec3" label="Document B" secondaryLabel="102 KB" icon={<DocumentIcon />} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Secondary, Hover actions=True ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Secondary (with secondaryLabel), Hover actions=True</Box>
        <TreeView defaultExpanded={['sch1']}>
          <TreeItem nodeId="sch1" label="Folder" secondaryLabel="12 items" icon={<FolderIcon />} hoverActions={hoverActionButtons}>
            <TreeItem nodeId="sch2" label="Document A" secondaryLabel="48 KB" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
            <TreeItem nodeId="sch3" label="Document B" secondaryLabel="102 KB" icon={<DocumentIcon />} hoverActions={hoverActionButtons} />
          </TreeItem>
        </TreeView>
      </Box>

      {/* ── Disabled ── */}
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Disabled</Box>
        <TreeView defaultExpanded={['d1']}>
          <TreeItem nodeId="d1" label="Folder (disabled)" icon={<FolderIcon />} disabled>
            <TreeItem nodeId="d2" label="File one" icon={<DocumentIcon />} />
          </TreeItem>
          <TreeItem nodeId="d3" label="File (disabled)" icon={<DocumentIcon />} disabled />
        </TreeView>
      </Box>

    </Box>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  controls: { disable: true },
};
