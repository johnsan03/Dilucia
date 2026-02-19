# GitHub Pages Deployment Guide

## Quick Start

### Step 1: Update Repository Name in Config

**IMPORTANT:** Before deploying, update the base path in `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

Replace `YOUR_REPO_NAME` with your actual GitHub repository name.

### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Romantic birthday gift"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 4: Wait for Deployment

- GitHub Actions will automatically build and deploy your site
- Check the **Actions** tab to see the deployment progress
- Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Troubleshooting

### Site shows blank page or 404

- **Check the base path:** Make sure `/YOUR_REPO_NAME/` in `vite.config.js` matches your repository name exactly
- **Check GitHub Actions:** Go to Actions tab and see if the build succeeded
- **Clear browser cache:** Try opening in incognito mode

### Assets not loading

- Ensure the base path is correct
- Check browser console for 404 errors
- Verify all paths in the code use relative paths (they should)

### Build fails

- Check the Actions tab for error messages
- Ensure `package.json` has all dependencies
- Try building locally: `npm run build`

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

3. In GitHub Settings → Pages, select `gh-pages` branch as source

## Notes

- The site will automatically redeploy every time you push to `main` branch
- Changes may take 1-2 minutes to appear
- Make sure your repository is public (or you have GitHub Pro for private repos with Pages)
