# Bytedesk Next.js Demo

This is a demo project showing how to integrate Bytedesk chat widget with Next.js.

## Features

- Server-side rendering (SSR) support
- TypeScript support
- Tailwind CSS for styling
- Full chat widget functionality
- Invite dialog with loop feature
- Responsive design

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Run the development server:
```bash
yarn dev
```

3. Open [http://localhost:9026](http://localhost:9026) in your browser.

## Project Structure

```
nextjs-demo/
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main demo page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   └── components/
│       └── InstallGuide.tsx  # Installation guide component
├── public/
├── package.json
└── README.md
```

## Configuration

See the `config` object in `src/app/page.tsx` for available configuration options.

## Learn More

- [Bytedesk Documentation](https://github.com/bytedesk/bytedesk-web)
- [Next.js Documentation](https://nextjs.org/docs) 