# Vimeo Integration Guide - SEI Streaming

This guide explains how to integrate Vimeo live streaming and video hosting into the SEI Streaming application.

## Table of Contents
1. [Getting Vimeo API Credentials](#getting-vimeo-api-credentials)
2. [Environment Setup](#environment-setup)
3. [Live Streaming Setup](#live-streaming-setup)
4. [Video Upload](#video-upload)
5. [Video Playback](#video-playback)
6. [API Endpoints](#api-endpoints)

---

## Getting Vimeo API Credentials

### Step 1: Create a Vimeo Developer Account
1. Go to https://developer.vimeo.com
2. Sign in with your Vimeo account: `emile@seimediagroup.co`
3. Navigate to **My Apps**

### Step 2: Create a New App
1. Click **Create App**
2. Fill in the details:
   - **App Name**: SEI Streaming Platform
   - **App Description**: Professional sports streaming platform
   - **App URL**: https://seistreaming.com (or your domain)
3. Accept the terms and create the app

### Step 3: Get Your Credentials
After creating the app, you'll get:
- **Client ID**: Copy this
- **Client Secret**: Copy this
- **Access Token**: Generate a new token with these scopes:
  - `public` - View public videos
  - `private` - View private videos
  - `create` - Create videos
  - `edit` - Edit videos
  - `delete` - Delete videos
  - `upload` - Upload videos
  - `video_files` - Access video files
  - `live` - Create and manage live events

---

## Environment Setup

### Update `.env` file with your credentials:

```env
# Vimeo API Credentials
VIMEO_CLIENT_ID=your_client_id_from_vimeo
VIMEO_CLIENT_SECRET=your_client_secret_from_vimeo
VIMEO_ACCESS_TOKEN=your_access_token_from_vimeo
VIMEO_EMAIL=emile@seimediagroup.co
```

### Database Setup
The database schema has been updated to include Vimeo fields:
- `vimeo_live_event_id` - Vimeo live event identifier
- `stream_key` - RTMP stream key for live broadcasting
- `rtmp_url` - RTMP server URL
- `vimeo_video_id` - Video identifier
- `embed_url` - Embed player URL

---

## Live Streaming Setup

### Create a Live Event

#### Via API:
```bash
POST /api/vimeo/live-events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "South Africa vs England - Rugby Championship",
  "description": "Live coverage of the Rugby Championship match"
}
```

#### Response:
```json
{
  "live_event_id": "12345678",
  "stream_key": "abc123-def456-ghi789",
  "rtmp_url": "rtmp://live.vimeo.com/live/",
  "embed_url": "<iframe src='...'></iframe>",
  "status": "ready"
}
```

### Start Broadcasting

1. **Use OBS Studio or similar broadcasting software**:
   - **Server**: rtmp://live.vimeo.com/live/
   - **Stream Key**: abc123-def456-ghi789 (from API response)

2. **Start the live event**:
```bash
POST /api/vimeo/live-events/{liveEventId}/start
```

3. **The event status changes to "streaming"** and viewers can watch

### End Broadcasting

```bash
POST /api/vimeo/live-events/{liveEventId}/end
```

---

## Video Upload

### TUS Resumable Upload (Recommended for large files)

#### Step 1: Create Upload Session
```javascript
const response = await fetch('/api/vimeo/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fileSize: 123456789, // File size in bytes
    fileName: 'Rugby Match - South Africa vs England.mp4',
    description: 'Full match replay from Ellis Park Stadium'
  })
});

const { upload_link, video_id } = await response.json();
```

#### Step 2: Upload the Video File
```javascript
// Use TUS protocol for resumable uploads
const tus = require('tus-js-client');

const upload = new tus.Upload(file, {
  uploadUrl: upload_link,
  onError: function(error) {
    console.error('Upload failed:', error);
  },
  onProgress: function(bytesUploaded, bytesTotal) {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    console.log(percentage + '%');
  },
  onSuccess: function() {
    console.log('Upload complete! Video ID:', video_id);
  }
});

upload.start();
```

---

## Video Playback

### Get Playback Information
```bash
GET /api/vimeo/playback/{videoId}
```

#### Response:
```json
{
  "embed_url": "https://player.vimeo.com/video/123456789",
  "files": [
    {
      "quality": "hd",
      "width": 1920,
      "height": 1080,
      "link": "https://..."
    },
    {
      "quality": "sd",
      "width": 640,
      "height": 480,
      "link": "https://..."
    }
  ]
}
```

### Using the VideoPlayer Component

```jsx
import { VideoPlayer } from './components/VideoPlayer';

function App() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <button onClick={() => setShowPlayer(true)}>
        Watch Live Stream
      </button>

      {showPlayer && (
        <VideoPlayer
          vimeoVideoId="123456789"
          title="South Africa vs England - Rugby"
          isLive={true}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}
```

---

## API Endpoints

### Video Management
- `GET /api/vimeo/videos` - Get all videos
- `GET /api/vimeo/videos/:videoId` - Get specific video
- `POST /api/vimeo/upload` - Create upload session
- `GET /api/vimeo/playback/:videoId` - Get playback info

### Live Streaming
- `POST /api/vimeo/live-events` - Create live event
- `GET /api/vimeo/live-events/:liveEventId` - Get event details
- `POST /api/vimeo/live-events/:liveEventId/start` - Start broadcasting
- `POST /api/vimeo/live-events/:liveEventId/end` - End broadcasting

---

## Quality Tiers and Vimeo Plans

### Free Plan Limitations:
- 480p maximum quality
- 5GB storage per week
- No live streaming

### Pro Plan ($20/month):
- 1080p HD quality
- 20GB storage per week
- Live streaming available

### Premium Plan ($75/month):
- 4K quality
- 7TB storage per year
- Advanced live streaming features
- Simulcasting to multiple platforms

**Recommended for SEI Streaming**: Premium Plan for 4K streaming

---

## Testing

### Test Live Stream:
1. Create a live event via API
2. Configure OBS with RTMP URL and stream key
3. Start streaming from OBS
4. Start the event via API
5. Watch on the player at the embed URL

### Test VOD Upload:
1. Call `/api/vimeo/upload` with file details
2. Use TUS client to upload video file
3. Wait for Vimeo to transcode (check video status)
4. Play video using VideoPlayer component

---

## Troubleshooting

### "Invalid access token"
- Regenerate your access token on developer.vimeo.com
- Ensure all required scopes are selected
- Update `.env` file with new token

### "Upload failed"
- Check file size limits based on your Vimeo plan
- Ensure file format is supported (MP4, MOV, AVI, etc.)
- Verify TUS protocol is working correctly

### "Live stream not starting"
- Verify RTMP URL and stream key are correct
- Check OBS settings match Vimeo requirements
- Ensure you have a Pro or Premium Vimeo account

---

## Production Checklist

- [ ] Upgrade to Vimeo Premium plan for 4K streaming
- [ ] Set up proper error handling for API failures
- [ ] Implement upload progress tracking
- [ ] Add video thumbnail generation
- [ ] Set up webhook notifications for video status changes
- [ ] Implement CDN for better global delivery
- [ ] Add analytics tracking for video views
- [ ] Set up automated transcoding workflows

---

## Additional Resources

- [Vimeo API Documentation](https://developer.vimeo.com/api/reference)
- [TUS Resumable Upload Protocol](https://tus.io/)
- [Vimeo Player SDK](https://github.com/vimeo/player.js)
- [OBS Studio Setup Guide](https://obsproject.com/wiki/)
