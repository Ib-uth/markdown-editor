'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3,
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image, 
  Table,
  Minus
} from 'lucide-react'

interface MarkdownToolbarProps {
  onInsertText: (text: string, offset?: number) => void
}

export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onInsertText }) => {
  const toolbarItems = [
    {
      group: 'text',
      items: [
        { icon: Bold, tooltip: 'Bold', action: () => onInsertText('**bold text**', 2) },
        { icon: Italic, tooltip: 'Italic', action: () => onInsertText('*italic text*', 1) },
        { icon: Strikethrough, tooltip: 'Strikethrough', action: () => onInsertText('~~strikethrough~~', 2) },
        { icon: Code, tooltip: 'Inline Code', action: () => onInsertText('`code`', 1) },
      ]
    },
    {
      group: 'headings',
      items: [
        { icon: Heading1, tooltip: 'Heading 1', action: () => onInsertText('# Heading 1\n\n') },
        { icon: Heading2, tooltip: 'Heading 2', action: () => onInsertText('## Heading 2\n\n') },
        { icon: Heading3, tooltip: 'Heading 3', action: () => onInsertText('### Heading 3\n\n') },
      ]
    },
    {
      group: 'lists',
      items: [
        { icon: List, tooltip: 'Unordered List', action: () => onInsertText('- List item\n- List item\n- List item\n\n') },
        { icon: ListOrdered, tooltip: 'Ordered List', action: () => onInsertText('1. List item\n2. List item\n3. List item\n\n') },
        { icon: Quote, tooltip: 'Blockquote', action: () => onInsertText('> Blockquote\n\n') },
      ]
    },
    {
      group: 'media',
      items: [
        { icon: Link, tooltip: 'Link', action: () => onInsertText('[link text](https://example.com)', 1) },
        { icon: Image, tooltip: 'Image', action: () => onInsertText('![alt text](image-url)', 2) },
        { icon: Table, tooltip: 'Table', action: () => onInsertText('| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n\n') },
        { icon: Minus, tooltip: 'Horizontal Rule', action: () => onInsertText('\n---\n\n') },
      ]
    }
  ]

  return (
    <div className="flex items-center p-2 border-b bg-muted/30 overflow-x-auto">
      {toolbarItems.map((group, groupIndex) => (
        <React.Fragment key={group.group}>
          {groupIndex > 0 && <Separator orientation="vertical" className="h-6 mx-2" />}
          <div className="flex items-center space-x-1">
            {group.items.map((item, itemIndex) => (
              <Tooltip key={itemIndex}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={item.action}
                    className="h-8 w-8 p-0"
                  >
                    <item.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {item.tooltip}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </React.Fragment>
      ))}
      
      <Separator orientation="vertical" className="h-6 mx-2" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onInsertText('```javascript\nconsole.log("Hello, World!");\n```\n\n')}
            className="h-8 px-2 text-xs font-mono"
          >
            {'</>'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Code Block
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
