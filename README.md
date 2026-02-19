# Dilucia - A Romantic Birthday Gift 💕

A beautiful, modern React web application that displays "I Love You" in 193+ languages with text-to-speech functionality.

## Features

- ✨ Beautiful, modern, and romantic design
- 🌍 193+ languages with "I Love You" translations
- 🔊 Text-to-speech with male voice support
- 💖 Animated entry page
- 📱 Fully responsive design
- 🎨 Glassmorphism effects and smooth animations

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Dilucia.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Update the base path** (if your repo name is different):
   - Open `vite.config.js`
   - Change `/Dilucia/` to match your repository name (e.g., `/your-repo-name/`)
   - Commit and push the changes

4. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically deploy when you push to the `main` branch
   - Your site will be available at: `https://YOUR_USERNAME.github.io/Dilucia/`

### Method 2: Manual Deployment

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select the `gh-pages` branch as the source
   - Your site will be live!

## Important Notes

- Make sure your repository name matches the base path in `vite.config.js`
- If your repo is named differently, update the `base` path accordingly
- The site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Technologies Used

- React 19
- Vite
- CSS3 (Glassmorphism, Animations)
- Web Speech API

## License

Made with 💕 for a special someone
