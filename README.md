# iCloud Album Viewer

View and download photos from shared iCloud albums with a beautiful, modern interface.

## ✨ Features

- 📱 View shared iCloud albums
- 🖼️ Grid layout with zoom controls
- 🎥 Video support with playback
- 📥 Download photos and videos
- 🌓 Dark/light mode
- 📅 Sort by date (newest/oldest)
- 🚀 Fast, serverless deployment

## 🚀 Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

Click the button above to deploy your own instance!

Or follow the manual steps in [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)

## 🆓 Completely Free

Runs on Google Cloud Run's generous free tier:
- 2 million requests/month
- No cold starts
- Scales automatically
- No credit card required

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create public directory
mkdir -p public
cp index.html public/

# Start the server
npm start
```

Visit `http://localhost:3001`

## 📖 Usage

1. Get a shared iCloud album link (Settings → Shared Albums → Share Link)
2. Paste it into the app
3. View, zoom, and download photos!

## 🏗️ Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React (vanilla, no build step)
- **Deployment:** Google Cloud Run
- **Container:** Docker

## 📁 Project Structure

```
├── Dockerfile              # Container configuration
├── cloudbuild.yaml         # Auto-deploy configuration
├── server.js               # Node.js backend
├── index.html              # React frontend
├── package.json            # Dependencies
└── GITHUB-DEPLOY.md        # Deployment guide
```

## 🔧 Configuration

The app automatically:
- Uses Cloud Run's PORT environment variable
- Scales to zero when idle
- Handles CORS for iCloud API
- Proxies downloads to bypass CORS

## 🌍 Custom Domain

After deploying, you can map a custom domain:

1. Go to Cloud Run console
2. Select your service
3. Click "Manage Custom Domains"
4. Follow the DNS setup instructions

## 📊 Monitoring

View your deployment:
- **Service:** https://console.cloud.google.com/run
- **Logs:** Cloud Run → Your Service → Logs tab
- **Metrics:** Cloud Run → Your Service → Metrics tab

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - feel free to use for any purpose!

## 🆘 Support

- **Issues:** Open a GitHub issue
- **Docs:** See [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)
- **Cloud Run:** https://cloud.google.com/run/docs

---

Made with ❤️ | Powered by Google Cloud Run
