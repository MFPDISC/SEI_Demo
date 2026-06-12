import { Vimeo } from '@vimeo/vimeo';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Vimeo client with your credentials
const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

/**
 * Get all videos from authenticated user's Vimeo account
 */
export const getVimeoVideos = async () => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: '/me/videos'
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error fetching Vimeo videos:', error);
        reject(error);
      } else {
        resolve(body.data);
      }
    });
  });
};

/**
 * Get a specific video by Vimeo video ID
 */
export const getVimeoVideo = async (videoId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: `/videos/${videoId}`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error fetching Vimeo video:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/**
 * Create a new video upload using TUS resumable upload protocol
 * This returns an upload link for the frontend to upload the video file
 */
export const createVimeoUpload = async (fileSize, fileName, description) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'POST',
      path: '/me/videos',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        upload: {
          approach: 'tus',
          size: fileSize
        },
        name: fileName,
        description: description,
        privacy: {
          view: 'unlisted' // Can be 'anybody', 'unlisted', 'password', 'disable'
        }
      }
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error creating Vimeo upload:', error);
        reject(error);
      } else {
        resolve({
          upload_link: body.upload.upload_link,
          video_uri: body.uri,
          video_id: body.uri.split('/').pop()
        });
      }
    });
  });
};

/**
 * Update video metadata (title, description, privacy, etc.)
 */
export const updateVimeoVideo = async (videoId, metadata) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'PATCH',
      path: `/videos/${videoId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: metadata
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error updating Vimeo video:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/**
 * Delete a video from Vimeo
 */
export const deleteVimeoVideo = async (videoId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'DELETE',
      path: `/videos/${videoId}`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error deleting Vimeo video:', error);
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
};

/**
 * Get video playback information (player embed URL, HLS stream, etc.)
 */
export const getVimeoPlaybackInfo = async (videoId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: `/videos/${videoId}?fields=player_embed_url,files,download`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error fetching Vimeo playback info:', error);
        reject(error);
      } else {
        resolve({
          embed_url: body.player_embed_url,
          files: body.files,
          download: body.download
        });
      }
    });
  });
};

/**
 * Create a live event on Vimeo for live streaming
 */
export const createLiveEvent = async (title, description) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'POST',
      path: '/me/live_events',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        title: title,
        description: description,
        privacy: {
          view: 'unlisted'
        },
        schedule: {
          type: 'single'
        }
      }
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error creating Vimeo live event:', error);
        reject(error);
      } else {
        resolve({
          live_event_id: body.live_event_id,
          stream_key: body.stream_key,
          rtmp_url: body.rtmp_link,
          embed_url: body.embed.html,
          status: body.status
        });
      }
    });
  });
};

/**
 * Get live event details and status
 */
export const getLiveEvent = async (liveEventId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: `/live_events/${liveEventId}`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error fetching live event:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/**
 * Start a live event
 */
export const startLiveEvent = async (liveEventId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'PATCH',
      path: `/live_events/${liveEventId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        status: 'streaming'
      }
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error starting live event:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/**
 * End a live event
 */
export const endLiveEvent = async (liveEventId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'PATCH',
      path: `/live_events/${liveEventId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        status: 'done'
      }
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error ending live event:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/**
 * Get thumbnail images for a video
 */
export const getVideoThumbnails = async (videoId) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: `/videos/${videoId}/pictures`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error fetching thumbnails:', error);
        reject(error);
      } else {
        resolve(body.data);
      }
    });
  });
};

/**
 * Upload custom thumbnail for a video
 */
export const uploadThumbnail = async (videoId, thumbnailUrl) => {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'POST',
      path: `/videos/${videoId}/pictures`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        link: thumbnailUrl,
        active: true
      }
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error('Error uploading thumbnail:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

export default {
  getVimeoVideos,
  getVimeoVideo,
  createVimeoUpload,
  updateVimeoVideo,
  deleteVimeoVideo,
  getVimeoPlaybackInfo,
  createLiveEvent,
  getLiveEvent,
  startLiveEvent,
  endLiveEvent,
  getVideoThumbnails,
  uploadThumbnail
};
