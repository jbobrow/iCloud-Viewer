const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.text());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.static('public'));

const hostCache = new Map();

async function iCloudRequest(token, endpoint, body, maxRedirects = 3) {
  let host = hostCache.get(token) || 'p56-sharedstreams.icloud.com';
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    const url = `https://${host}/${token}/sharedstreams/${endpoint}`;
    console.log(`[iCloud] POST ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Origin': 'https://www.icloud.com',
        'Accept': '*/*',
      },
      body: JSON.stringify(body)
    });

    console.log(`[iCloud] Status: ${response.status}`);

    if (response.status === 330) {
      const redirectData = await response.json();
      const newHost = redirectData['X-Apple-MMe-Host'];
      
      if (!newHost) {
        throw new Error('330 redirect but no X-Apple-MMe-Host');
      }

      console.log(`[iCloud] Redirect to: ${newHost}`);
      hostCache.set(token, newHost);
      host = newHost;
      redirectCount++;
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[iCloud] Error: ${errorText}`);
      throw new Error(`iCloud API error: ${response.status}`);
    }

    return await response.json();
  }

  throw new Error('Too many redirects');
}

app.post('/api/album/:token', async (req, res) => {
  const { token } = req.params;
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Fetching album: ${token}`);
  console.log(`${'='.repeat(50)}`);
  
  try {
    // Step 1: Get stream data
    const streamData = await iCloudRequest(token, 'webstream', {
      streamCtag: null
    });

    console.log(`Album: ${streamData.streamName || 'Unknown'}`);
    console.log(`Photos: ${streamData.photos?.length || 0}`);

    if (streamData.photos && streamData.photos.length > 0) {
      // Collect photoGuids (NOT checksums!)
      const photoGuids = streamData.photos.map(p => p.photoGuid);
      
      console.log(`Photo GUIDs to resolve: ${photoGuids.length}`);
      console.log(`Sample GUID: ${photoGuids[0]}`);

      try {
        // Step 2: Get asset URLs using photoGuids
        const assetResponse = await iCloudRequest(token, 'webasseturls', {
          photoGuids: photoGuids
        });

        console.log(`Asset response keys:`, Object.keys(assetResponse));
        
        const items = assetResponse.items || {};
        const locations = assetResponse.locations || {};
        const itemCount = Object.keys(items).length;
        console.log(`Asset URLs received: ${itemCount}`);
        console.log(`Locations received: ${Object.keys(locations).length}`);

        // Log a sample item to see the structure
        if (itemCount > 0) {
          const sampleKey = Object.keys(items)[0];
          console.log(`Sample asset key: ${sampleKey}`);
          console.log(`Sample asset URL structure:`, JSON.stringify(items[sampleKey], null, 2));
        }

        // Create a map from checksum to URL
        const checksumToUrl = {};
        Object.entries(items).forEach(([checksum, urlInfo]) => {
          checksumToUrl[checksum] = `https://${urlInfo.url_location}${urlInfo.url_path}`;
        });

        // Merge URLs into derivatives using checksum lookup
        streamData.photos = streamData.photos.map(photo => {
          if (photo.derivatives) {
            Object.keys(photo.derivatives).forEach(key => {
              const derivative = photo.derivatives[key];
              if (derivative.checksum && checksumToUrl[derivative.checksum]) {
                derivative.url = checksumToUrl[derivative.checksum];
              }
            });
          }
          return photo;
        });

        // Attach for debugging
        streamData.assetUrls = items;

      } catch (assetError) {
        console.error(`Asset URL error: ${assetError.message}`);
      }
    }

    res.json(streamData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to fetch album',
      message: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  iCloud Album Viewer                 ║
║  http://localhost:${PORT}             ║
╚══════════════════════════════════════╝
  `);
});
