# Resume PDF Generator

This script converts your `RESUME.md` file into a professionally styled PDF.

## Prerequisites

- Node.js installed on your system
- npm or pnpm package manager

## Installation & Usage

### Option 1: Using the main package.json script (Recommended)

From the `portfolio-2.0` directory, run:

```bash
npm run generate-resume
```

or if you're using pnpm:

```bash
pnpm generate-resume
```

### Option 2: Manual installation in scripts folder

1. Navigate to the scripts folder:
```bash
cd scripts
```

2. Install dependencies:
```bash
npm install
```

3. Generate the PDF:
```bash
npm run generate
```

## Output

The script will generate a file named `Sushil_Kumar_Resume.pdf` in the `portfolio-2.0` directory.

## Features

- ✅ Professional styling with custom CSS
- ✅ Optimized for Letter size paper (8.5" x 11")
- ✅ Print-friendly colors and layout
- ✅ Proper page breaks and spacing
- ✅ Clickable links in the PDF
- ✅ 0.75" margins on all sides

## Customization

To modify the PDF styling, edit the `resumeCSS` variable in `scripts/generate-resume-pdf.js`.

## Troubleshooting

If you encounter issues:

1. Make sure you're in the correct directory
2. Delete `scripts/node_modules` and reinstall: `cd scripts && rm -rf node_modules && npm install`
3. Check that `RESUME.md` exists in the `portfolio-2.0` directory
4. Ensure you have write permissions in the directory

## Dependencies

- **marked**: Converts Markdown to HTML
- **puppeteer**: Generates PDF from HTML using headless Chrome
