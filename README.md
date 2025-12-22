# iCloud Album Viewer

<div align="center">
  <img src="public/apple-touch-icon.png" alt="iCloud Viewer" width="64" height="64">
  
  **View and download photos from shared iCloud albums**
  
  ✨ [**Try it live at icloudviewer.com**](https://icloudviewer.com) ✨
  
  ![](https://img.shields.io/badge/deployment-Google%20Cloud%20Run-4285F4?logo=google-cloud)
  ![](https://img.shields.io/badge/license-MIT-blue)
</div>

---

## Features

- 🖼️ **Beautiful grid layout** with adjustable zoom (2-20 columns)
- 🎥 **Video support** with inline playback and duration display
- 🔍 **Advanced filtering** by media type and contributors
- 📥 **Bulk downloads** for images, videos, or entire albums
- 🌓 **Dark/light mode** with smooth transitions
- 📅 **Flexible sorting** by date (newest/oldest first)
- 🚀 **Zero-install** web app - just paste a link

## Usage

1. Get a shared iCloud album link from Photos app
2. Paste the link at [icloudviewer.com](https://icloudviewer.com)
3. View, filter, and download your photos!

## Deploy Your Own

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

Runs completely free on Google Cloud Run's generous free tier (2M requests/month).

### Manual Deployment

```bash
# Install dependencies
npm install

# Start local server
npm start
```

Visit `http://localhost:3001`

## Tech Stack

- **Frontend:** React (vanilla, no build step)
- **Backend:** Node.js + Express
- **Deployment:** Google Cloud Run + Docker
- **API:** iCloud Shared Streams API

## Project Structure

```
├── public/
│   └── index.html      # React frontend (single file)
├── server.js           # Express API server
├── package.json        # Dependencies
├── Dockerfile          # Container config
└── cloudbuild.yaml     # Auto-deploy config
```

## License

MIT - Use freely for any purpose!

---

<div align="center">
  Made with ❤️ | Powered by <a href="https://cloud.google.com/run">Google Cloud Run</a>
</div>