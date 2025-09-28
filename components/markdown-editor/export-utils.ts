import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportMarkdownToPDF = async (markdown: string, theme: string) => {
  try {
    // Get the preview element
    const previewElement = document.getElementById('markdown-preview')
    if (!previewElement) {
      throw new Error('Preview element not found')
    }

    // Temporarily modify the preview for better PDF rendering
    const originalStyle = previewElement.style.cssText
    previewElement.style.cssText = `
      ${originalStyle}
      width: 794px !important;
      max-width: 794px !important;
      padding: 40px !important;
      background: ${theme.includes('dark') ? '#1e1e1e' : '#ffffff'} !important;
      color: ${theme.includes('dark') ? '#d4d4d4' : '#24292e'} !important;
      font-size: 14px !important;
      line-height: 1.6 !important;
    `

    // Wait a bit for styles to apply
    await new Promise(resolve => setTimeout(resolve, 100))

    // Create canvas from the preview element
    const canvas = await html2canvas(previewElement, {
      backgroundColor: theme.includes('dark') ? '#1e1e1e' : '#ffffff',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 794,
      windowWidth: 794,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('markdown-preview')
        if (clonedElement) {
          clonedElement.style.width = '794px'
          clonedElement.style.maxWidth = '794px'
          clonedElement.style.padding = '40px'
        }
      }
    })

    // Restore original styles
    previewElement.style.cssText = originalStyle

    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width
    
    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    // Download the PDF
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    pdf.save(`markdown-export-${timestamp}.pdf`)
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    throw new Error('Failed to export PDF. Please ensure the preview is visible and try again.')
  }
}

export const exportMarkdownToHTML = async (markdown: string) => {
  try {
    // Import marked for markdown to HTML conversion
    const { marked } = await import('marked')
    
    // Configure marked for GitHub-flavored markdown
    marked.setOptions({
      gfm: true,
      breaks: true
    })

    // Convert markdown to HTML
    const htmlContent = marked(markdown)

    // Create a complete HTML document
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body {
            font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #24292e;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #ffffff;
        }
        
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
            line-height: 1.25;
            letter-spacing: -0.025em;
        }
        
        h1 {
            font-size: 2rem;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.5rem;
        }
        
        h2 {
            font-size: 1.5rem;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.25rem;
        }
        
        h3 { font-size: 1.25rem; }
        h4 { font-size: 1rem; }
        h5 { font-size: 0.875rem; }
        h6 { font-size: 0.85rem; }
        
        p {
            margin-bottom: 1rem;
            line-height: 1.7;
        }
        
        ul, ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
        }
        
        li {
            margin-bottom: 0.25rem;
        }
        
        blockquote {
            margin: 1rem 0;
            padding: 0 1rem;
            color: #6a737d;
            border-left: 4px solid #dfe2e5;
            background-color: #f6f8fa;
        }
        
        code {
            background-color: #f6f8fa;
            border-radius: 3px;
            font-size: 85%;
            margin: 0;
            padding: 0.2em 0.4em;
            font-family: var(--font-jetbrains-mono), 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        
        pre {
            background-color: #f6f8fa;
            border-radius: 6px;
            font-size: 85%;
            line-height: 1.45;
            overflow: auto;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        
        pre code {
            background-color: transparent;
            border: 0;
            display: inline;
            line-height: inherit;
            margin: 0;
            max-width: auto;
            overflow: visible;
            padding: 0;
            word-wrap: normal;
        }
        
        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            margin-bottom: 1rem;
        }
        
        table th,
        table td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }
        
        table th {
            background-color: #f6f8fa;
            font-weight: 600;
        }
        
        table tr:nth-child(2n) {
            background-color: #f6f8fa;
        }
        
        a {
            color: #0366d6;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        
        hr {
            border: none;
            border-top: 1px solid #eaecef;
            margin: 2rem 0;
        }
        
        /* Task list styles */
        input[type="checkbox"] {
            margin-right: 0.5rem;
        }
        
        @media print {
            body {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`

    // Create and download the file
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    a.download = `markdown-export-${timestamp}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting to HTML:', error)
    throw new Error('Failed to export HTML. Please try again.')
  }
}
