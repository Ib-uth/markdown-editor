'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  Download,
  FileText,
  Moon,
  Sun,
  Eye,
  EyeOff
} from 'lucide-react'
import { MarkdownPreview } from './markdown-preview'
import { MarkdownToolbar } from './markdown-toolbar'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
})

export interface MarkdownEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
  className?: string
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '# Welcome to Markdown Editor\n\nStart typing your markdown here...\n\n## Features\n\n- **Bold text**\n- *Italic text*\n- `Code snippets`\n- [Links](https://example.com)\n- Lists and more!\n\n```javascript\nconsole.log("Hello, World!");\n```\n\n> This is a blockquote\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n',
  onChange,
  className = ''
}) => {
  const [markdown, setMarkdown] = useState(initialValue)
  const [editorTheme, setEditorTheme] = useState('vs-dark')
  const [showPreview, setShowPreview] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const editorRef = useRef<any>(null)
  const { theme, setTheme } = useTheme()

  const handleEditorChange = useCallback((value: string | undefined) => {
    const newValue = value || ''
    setMarkdown(newValue)
    onChange?.(newValue)
  }, [onChange])

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const insertText = useCallback((text: string, offset = 0) => {
    if (!editorRef.current) return
    
    const selection = editorRef.current.getSelection()
    const range = {
      startLineNumber: selection.startLineNumber,
      startColumn: selection.startColumn,
      endLineNumber: selection.endLineNumber,
      endColumn: selection.endColumn
    }
    
    editorRef.current.executeEdits('', [{
      range,
      text,
      forceMoveMarkers: true
    }])
    
    // Set cursor position
    if (offset !== 0) {
      const newPosition = {
        lineNumber: selection.startLineNumber,
        column: selection.startColumn + offset
      }
      editorRef.current.setPosition(newPosition)
    }
    
    editorRef.current.focus()
  }, [])

  const exportToPDF = useCallback(async () => {
    if (isExporting) return
    
    setIsExporting(true)
    toast.loading('Generating PDF...', { id: 'pdf-export' })
    
    try {
      const { exportMarkdownToPDF } = await import('./export-utils')
      await exportMarkdownToPDF(markdown, editorTheme)
      toast.success('PDF exported successfully!', { id: 'pdf-export' })
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      toast.error('Failed to export PDF. Please try again.', { id: 'pdf-export' })
    } finally {
      setIsExporting(false)
    }
  }, [markdown, editorTheme, isExporting])

  const exportToHTML = useCallback(async () => {
    if (isExporting) return
    
    setIsExporting(true)
    toast.loading('Generating HTML...', { id: 'html-export' })
    
    try {
      const { exportMarkdownToHTML } = await import('./export-utils')
      await exportMarkdownToHTML(markdown)
      toast.success('HTML exported successfully!', { id: 'html-export' })
    } catch (error) {
      console.error('Error exporting to HTML:', error)
      toast.error('Failed to export HTML. Please try again.', { id: 'html-export' })
    } finally {
      setIsExporting(false)
    }
  }, [markdown, isExporting])

  const togglePreview = () => setShowPreview(!showPreview)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <TooltipProvider>
      <div className={`flex flex-col h-screen bg-background ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Markdown Editor</h1>
              <p className="text-xs text-muted-foreground">
                By{' '}
                <a 
                  href="https://linkedin.com/in/ibraheem-uthman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Ibraheem Uthman
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={editorTheme} onValueChange={setEditorTheme}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">VS Dark</SelectItem>
                  <SelectItem value="vs-light">VS Light</SelectItem>
                  <SelectItem value="hc-black">High Contrast</SelectItem>
                  <SelectItem value="github-dark">GitHub Dark</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={togglePreview}>
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </TooltipContent>
            </Tooltip>
            
            <Button variant="outline" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToHTML}
              disabled={isExporting}
            >
              <FileText className="h-4 w-4 mr-2" />
              HTML
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToPDF}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <MarkdownToolbar onInsertText={insertText} />

        {/* Editor and Preview */}
        <div className="flex flex-1 overflow-hidden">
          {/* Editor */}
          <div className={`${showPreview ? 'w-1/2' : 'w-full'} border-r`}>
            <MonacoEditor
              height="100%"
              language="markdown"
              theme={editorTheme}
              value={markdown}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                wordWrap: 'on',
                lineNumbers: 'on',
                fontSize: 14,
                fontFamily: 'var(--font-jetbrains-mono), Consolas, Monaco, monospace',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                renderWhitespace: 'selection',
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true
                }
              }}
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-1/2 overflow-auto">
              <MarkdownPreview content={markdown} theme={editorTheme} />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
