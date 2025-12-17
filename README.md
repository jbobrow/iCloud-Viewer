# iCloud Album Viewer

A web app to view and download photos from shared iCloud albums.

## Features

- Paste any shared iCloud album URL to browse photos
- View photo thumbnails in a grid
- Download individual photos
- Supports photos and videos

## Deployment

### Deploy to Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click "Create Web Service"

Your app will be live at `https://your-app-name.onrender.com`

## Local Development

```bash
npm install
npm start
```

Then open http://localhost:3001

## Usage

1. Get a shared iCloud album URL (looks like `https://www.icloud.com/sharedalbum/#TOKEN`)
2. Paste the URL into the input field
3. Click "Load Album"
4. Browse and download photos!

## How It Works

The server proxies requests to Apple's iCloud API to:
1. Fetch album metadata and photo list
2. Resolve photo URLs from Apple's CDN
3. Serve the photos to the frontend

## License

MIT
