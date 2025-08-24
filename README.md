# 🥷 Number Ninja

**Sharpen your math skills, one slash at a time.**

A fun, kid-friendly multiplication practice app built with Next.js. Choose your multiplication table, train through 10 problems, and track your progress!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/number-ninja)

## ✨ Features

- **📊 Customizable Base Numbers**: Practice any multiplication table (1-99+)
- **⏱️ Time Tracking**: Monitor your speed and accuracy
- **🎯 Interactive Quiz**: Card-by-card format with instant feedback
- **📱 Mobile-Friendly**: Works great on all devices
- **💾 Local Storage**: Remembers your preferred base number
- **🎨 Clean UI**: Built with Tailwind CSS for a polished look
- **🚀 Zero Config**: No backend required, deploys instantly to Vercel

## 🚀 Quick Start

### Development

```bash
# Clone and install
git clone <your-repo-url>
cd number-ninja
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start training!

### Production

```bash
# Build for production
npm run build
npm start
```

## 🎮 How to Play

1. **Choose Your Base**: Select a multiplication table (default: 9) using the ⚙️ gear icon
2. **Start Training**: Click "Start Training 🥷" to begin your 10-card quiz
3. **Answer Questions**: Type your answer and press Enter (or click Submit)
4. **Track Progress**: See your results with timing and accuracy breakdown
5. **Train Again**: Keep practicing to improve your ninja skills!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (zero config)
- **State Management**: Client-side React state + localStorage

## 📁 Project Structure

```
number-ninja/
├── app/
│   ├── page.tsx          # Home/setup page
│   ├── quiz/page.tsx     # Quiz interface
│   ├── results/page.tsx  # Results breakdown
│   ├── types.ts          # TypeScript definitions
│   ├── utils.ts          # Utility functions
│   └── globals.css       # Global styles
├── public/               # Static assets
└── README.md
```

## 🎯 Key Features Implementation

- **Base Selection**: Supports 1-20 quick selection + custom input for higher numbers
- **Quiz Logic**: Generates random factors (0-12) for chosen multiplication table
- **Timing System**: Tracks time per card and total quiz time
- **Progress Tracking**: Visual progress bar and card counter
- **Results Analysis**: Shows correct/incorrect breakdown with timing details
- **Accessibility**: Keyboard navigation (Enter to submit), proper ARIA labels
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Deploy to Vercel

The fastest way to deploy Number Ninja is using the Vercel Platform:

1. Click the "Deploy with Vercel" button above, or
2. Push your code to GitHub and import it in Vercel, or  
3. Use the Vercel CLI: `vercel --prod`

No environment variables or configuration needed - it just works!

## 📝 License

MIT License - feel free to fork and customize for your own ninja training dojo!
