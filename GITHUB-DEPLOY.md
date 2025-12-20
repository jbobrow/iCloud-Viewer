# Deploy to Google Cloud Run from GitHub (Easiest Method!)

## 🎯 Why This Method is Better

- ✅ **No CLI needed** - Deploy directly from Cloud Console
- ✅ **Auto-deploy** - Pushes to GitHub automatically redeploy
- ✅ **No local Docker** - Google builds the container for you
- ✅ **Visual setup** - Click through the UI
- ✅ **Free tier** - Same generous limits

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Push Your Code to GitHub

1. Create a new GitHub repository
2. Add these files to your repo:
   - `Dockerfile`
   - `.dockerignore`
   - `server.js` (the updated version)
   - `index.html`
   - `package.json`

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/icloud-album-viewer.git
git push -u origin main
```

### Step 2: Deploy from Cloud Console

1. **Go to Cloud Run:** https://console.cloud.google.com/run

2. **Click "CREATE SERVICE"**

3. **Select "Continuously deploy from a repository (source)"**

4. **Click "SET UP WITH CLOUD BUILD"**

5. **Authenticate with GitHub:**
   - Click "Authenticate"
   - Authorize Google Cloud Build
   - Select your repository
   - Click "Next"

6. **Configure Build:**
   - **Branch:** `main` (or your default branch)
   - **Build Type:** Dockerfile
   - **Source location:** `/Dockerfile`
   - Click "Save"

7. **Configure Service:**
   - **Service name:** `icloud-album-viewer`
   - **Region:** `us-central1` (free tier eligible)
   - **CPU allocation:** Request-based (scales to zero)
   - **Authentication:** Allow unauthenticated invocations ✅
   - **Container port:** `8080`
   
8. **Expand "Container, Networking, Security":**
   - **Memory:** 512 MiB
   - **CPU:** 1
   - **Min instances:** 0
   - **Max instances:** 10

9. **Click "CREATE"**

That's it! ✨

## 📱 Your Deployment URL

After deployment (takes ~2-3 minutes), you'll get:

```
https://icloud-album-viewer-[hash]-uc.a.run.app
```

Click the URL in the Cloud Console to open your app!

## 🔄 Auto-Deployment

Now every time you push to GitHub:

```bash
git add .
git commit -m "Updated features"
git push
```

Google Cloud Build will:
1. Automatically detect the push
2. Build a new container
3. Deploy it to Cloud Run
4. Zero downtime!

## 🎨 Alternative: Deploy Button

Add this to your GitHub README.md:

```markdown
[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)
```

Anyone can click it to deploy your app to their own Cloud Run!

## 📊 Monitoring Your Deploys

**View Build History:**
```
https://console.cloud.google.com/cloud-build/builds
```

**View Logs:**
```
https://console.cloud.google.com/run > Select your service > LOGS tab
```

**Metrics:**
```
https://console.cloud.google.com/run > Select your service > METRICS tab
```

## 🔧 Trigger Settings

To modify auto-deploy settings:

1. Go to https://console.cloud.google.com/cloud-build/triggers
2. Find your trigger (created automatically)
3. Click to edit:
   - Change branch patterns
   - Add filters
   - Modify build config

## 🌍 Custom Domain

To add your own domain:

1. **In Cloud Run Console:**
   - Select your service
   - Click "MANAGE CUSTOM DOMAINS"
   - Click "ADD MAPPING"
   - Enter your domain
   - Follow DNS instructions

2. **Add DNS Records** (at your domain registrar):
   ```
   Type: CNAME
   Name: www (or @)
   Value: ghs.googlehosted.com
   ```

## 💰 Staying Free

Your app will remain free as long as you stay under:
- **2M requests/month** (more than enough)
- **180k vCPU-seconds** (50 hours)
- **360k GiB-seconds** (100 hours @ 1GB)
- **1GB egress/month**

For a personal album viewer, you'll likely use <1% of this!

## 🎯 Comparison: GitHub vs Manual Deploy

| Feature | GitHub Integration | Manual CLI |
|---------|-------------------|------------|
| Setup time | 5 minutes | 10 minutes |
| Auto-redeploy | ✅ Yes | ❌ No |
| CLI needed | ❌ No | ✅ Yes |
| Version control | ✅ Built-in | Manual |
| Rollback | Easy (redeploy old commit) | Manual |
| Collaboration | Easy (GitHub) | Complex |

## 🔐 Security Best Practices

Since your repo is public, make sure:
- ✅ No API keys in code
- ✅ No sensitive data committed
- ✅ Use environment variables for secrets

To add secrets in Cloud Run:
1. Go to your service
2. Click "EDIT & DEPLOY NEW REVISION"
3. Variables & Secrets tab
4. Add secret references

## 🐛 Troubleshooting

### Build fails
- Check build logs in Cloud Build console
- Verify Dockerfile syntax
- Ensure all dependencies in package.json

### Service won't start
- Check Cloud Run logs
- Verify port 8080 is used
- Ensure container exits on PORT env var

### Can't connect repository
- Verify GitHub permissions
- Try re-authenticating
- Check repository visibility

## 📚 Resources

- **Cloud Run docs:** https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build
- **Pricing:** https://cloud.google.com/run/pricing
- **Quotas:** https://cloud.google.com/run/quotas
- **Support:** https://cloud.google.com/support

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Cloud Run service created
- [ ] GitHub repository connected
- [ ] Auto-deploy triggered on push
- [ ] Service URL works
- [ ] Albums load correctly
- [ ] Download works
- [ ] Build succeeds on new commits

---

**This is the recommended method!** No CLI installation, automatic updates, and super easy to maintain. 🚀
