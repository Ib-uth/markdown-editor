'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import 'highlight.js/styles/github-dark.css'

interface MarkdownPreviewProps {
  content: string
  theme: string
  className?: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  content, 
  theme, 
  className = '' 
}) => {
  return (
    <div 
      id="markdown-preview"
      className={`p-6 h-full overflow-auto prose prose-slate dark:prose-invert max-w-none ${className}`}
      style={{
        backgroundColor: theme.includes('dark') ? '#1e1e1e' : '#ffffff',
        color: theme.includes('dark') ? '#d4d4d4' : '#24292e'
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom components for better styling
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 pb-2 border-b">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3 pb-1 border-b">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold mb-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-semibold mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-semibold mb-2">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 pl-6 list-disc">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 pl-6 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic bg-gray-50 dark:bg-gray-800/50">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className?.includes('language-')
            return !isInline ? (
              <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              {children}
            </td>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <Image 
              src={typeof src === 'string' ? src : ''} 
              alt={alt || ''} 
              width={800}
              height={400}
              className="max-w-full h-auto rounded-lg shadow-sm mb-4"
            />
          ),
          hr: () => (
            <hr className="my-8 border-gray-300 dark:border-gray-600" />
          ),
          // Task list items (GitHub-flavored markdown)
          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2"
                  {...props}
                />
              )
            }
            return <input type={type} {...props} />
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
