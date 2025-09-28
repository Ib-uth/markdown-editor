# MarkCraft

A powerful, modern markdown editor built with React, TypeScript, and Tailwind CSS. Features a split-screen layout with live preview, syntax highlighting, and export capabilities.

![MarkCraft Screenshot](https://markcraft.lindy.site)

## 🚀 Features

- **Split-Screen Layout**: Editor on the left, live preview on the right
- **Syntax Highlighting**: Multiple themes including VS Dark, VS Light, GitHub Dark, Monokai, and High Contrast
- **Live Preview**: Real-time rendering of GitHub-flavored Markdown
- **Comprehensive Toolbar**: Quick formatting buttons for bold, italic, headers, lists, links, images, tables, and more
- **Export Options**: Export to PDF and HTML with preserved styling
- **Responsive Design**: Optimized for tablets and desktop
- **Dark/Light Mode**: System-aware theme switching
- **GitHub-Flavored Markdown**: Full support for tables, task lists, code blocks, and more
- **Toast Notifications**: Elegant success/error messages for all operations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Editor**: Monaco Editor (VS Code editor)
- **Markdown Processing**: react-markdown with remark-gfm
- **Syntax Highlighting**: highlight.js with rehype-highlight
- **Export**: html2canvas + jsPDF for PDF export
- **Notifications**: Sonner for toast messages
- **Theme**: next-themes for dark/light mode

## 🎯 Live Demo

Visit the live application: [https://markcraft.lindy.site](https://markcraft.lindy.site)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ib-uth/markcraft.git
cd markcraft
```

2. Install dependencies:
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

3. Start the development server:
```bash
# Using bun
bun dev

# Or using npm
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

### Basic Editing
- Type markdown in the left editor panel
- See live preview in the right panel
- Use the toolbar for quick formatting

### Toolbar Features
- **Text Formatting**: Bold, italic, strikethrough, inline code
- **Headers**: H1, H2, H3 quick insertion
- **Lists**: Unordered and ordered lists
- **Media**: Links, images, tables
- **Code Blocks**: Syntax-highlighted code blocks
- **Blockquotes**: Quote formatting
- **Horizontal Rules**: Section dividers

### Export Options
- **HTML Export**: Clean, styled HTML file
- **PDF Export**: High-quality PDF with preserved styling
- Both exports include timestamps in filenames

### Theme Options
- VS Dark (default)
- VS Light
- High Contrast
- GitHub Dark
- Monokai

## 🎨 Customization

The editor uses Tailwind CSS and shadcn/ui components, making it easy to customize:

- Modify `app/globals.css` for global styles
- Update component styles in `components/markcraft/`
- Customize themes in the Monaco Editor configuration

## 📦 Project Structure

```
markcraft/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page
├── components/
│   ├── markcraft/
│   │   ├── markcraft.tsx    # Main editor component
│   │   ├── markdown-preview.tsx   # Preview component
│   │   ├── markdown-toolbar.tsx   # Toolbar component
│   │   ├── export-utils.ts        # Export functionality
│   │   └── index.ts               # Component exports
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ibraheem Uthman**
- LinkedIn: [https://linkedin.com/in/ibraheem-uthman](https://linkedin.com/in/ibraheem-uthman)
- GitHub: [@Ib-uth](https://github.com/Ib-uth)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the VS Code-like editing experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

⭐ If you found this project helpful, please give it a star on GitHub!
