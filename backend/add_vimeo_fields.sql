-- Add Vimeo live streaming fields to events table

ALTER TABLE events
ADD COLUMN IF NOT EXISTS vimeo_live_event_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS stream_key VARCHAR(255),
ADD COLUMN IF NOT EXISTS rtmp_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS vimeo_video_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS embed_url TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_events_vimeo_live_event_id ON events(vimeo_live_event_id);
CREATE INDEX IF NOT EXISTS idx_events_vimeo_video_id ON events(vimeo_video_id);

-- Update videos table to include Vimeo video ID
ALTER TABLE videos
ADD COLUMN IF NOT EXISTS vimeo_video_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS vimeo_upload_link TEXT,
ADD COLUMN IF NOT EXISTS embed_url TEXT;

CREATE INDEX IF NOT EXISTS idx_videos_vimeo_video_id ON videos(vimeo_video_id);
