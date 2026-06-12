import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import pool from './db.js';
import vimeoService from './vimeoService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const BCRYPT_ROUNDS = 10;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173']
}));
app.use(express.json({ limit: '50mb' }));

// Utility functions
const generateToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [decoded.userId]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = result.rows[0];
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = bcryptjs.hashSync(password, BCRYPT_ROUNDS);
    const userId = `user_${Date.now()}`;

    const result = await pool.query(
      'INSERT INTO users (user_id, email, password, name, plan, verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, email, name, plan',
      [userId, normalizedEmail, hashedPassword, name, 'free', false]
    );

    const newUser = result.rows[0];
    const token = generateToken(userId);
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.user_id, email: newUser.email, name: newUser.name, plan: newUser.plan },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const normalizedEmail = email.toLowerCase();
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.user_id);
    res.json({
      message: 'Login successful',
      user: { id: user.user_id, email: user.email, name: user.name, plan: user.plan },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/me', authenticateUser, (req, res) => {
  res.json({
    user: { id: req.user.user_id, email: req.user.email, name: req.user.name, plan: req.user.plan }
  });
});

app.get('/api/videos', authenticateUser, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos WHERE user_id = $1 ORDER BY uploaded_at DESC', [req.user.user_id]);
    res.json({ videos: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/subscriptions/upgrade', authenticateUser, async (req, res) => {
  try {
    const { plan } = req.body;
    const validPlans = ['free', 'pro', 'elite'];

    if (!plan || !validPlans.includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    await pool.query('UPDATE users SET plan = $1 WHERE user_id = $2', [plan, req.user.user_id]);

    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.user.user_id]);
    const user = result.rows[0];

    res.json({
      message: `Upgraded to ${plan} plan`,
      user: { id: user.user_id, email: user.email, name: user.name, plan: user.plan }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Homepage - Get featured events and content
app.get('/api/homepage', async (req, res) => {
  try {
    const featured = await pool.query(
      'SELECT * FROM events WHERE status IN ($1, $2) ORDER BY start_time DESC LIMIT 5',
      ['live', 'upcoming']
    );

    const byCategory = await pool.query(
      'SELECT DISTINCT sport_category FROM events WHERE sport_category IS NOT NULL'
    );

    const byRegion = await pool.query(
      'SELECT DISTINCT region FROM events WHERE region IS NOT NULL'
    );

    res.json({
      featured: featured.rows,
      categories: byCategory.rows.map(r => r.sport_category),
      regions: byRegion.rows.map(r => r.region)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get events by category
app.get('/api/events/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const result = await pool.query(
      'SELECT * FROM events WHERE sport_category = $1 ORDER BY start_time DESC LIMIT $2 OFFSET $3',
      [category, limit, offset]
    );

    const count = await pool.query(
      'SELECT COUNT(*) FROM events WHERE sport_category = $1',
      [category]
    );

    res.json({
      total: parseInt(count.rows[0].count),
      events: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get events by region
app.get('/api/events/region/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const result = await pool.query(
      'SELECT * FROM events WHERE region = $1 ORDER BY start_time DESC LIMIT $2 OFFSET $3',
      [region, limit, offset]
    );

    const count = await pool.query(
      'SELECT COUNT(*) FROM events WHERE region = $1',
      [region]
    );

    res.json({
      total: parseInt(count.rows[0].count),
      events: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get live events
app.get('/api/events/live', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE status = $1 ORDER BY start_time DESC',
      ['live']
    );

    res.json({ live_events: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get upcoming events
app.get('/api/events/upcoming', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE status = $1 ORDER BY start_time ASC LIMIT 10',
      ['upcoming']
    );

    res.json({ upcoming_events: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single event with details
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const event = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );

    if (event.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const videos = await pool.query(
      'SELECT * FROM videos WHERE event_id = $1',
      [id]
    );

    res.json({
      event: event.rows[0],
      videos: videos.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get video by ID
app.get('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM videos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ video: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search videos and events
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query too short' });
    }

    const searchTerm = `%${q}%`;

    const events = await pool.query(
      'SELECT * FROM events WHERE title ILIKE $1 OR description ILIKE $1 LIMIT 10',
      [searchTerm]
    );

    const videos = await pool.query(
      'SELECT * FROM videos WHERE title ILIKE $1 OR description ILIKE $1 LIMIT 10',
      [searchTerm]
    );

    res.json({
      events: events.rows,
      videos: videos.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get subscription plans
app.get('/api/subscription-plans', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, tier, monthly_price, max_resolution, allow_downloads, description FROM subscription_plans ORDER BY monthly_price ASC'
    );

    res.json({ plans: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's watch history
app.get('/api/user/watch-history', authenticateUser, async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const result = await pool.query(
      `SELECT wh.*, v.title, v.thumbnail_url FROM watch_history wh
       JOIN videos v ON wh.video_id = v.id
       WHERE wh.user_id = $1
       ORDER BY wh.watched_at DESC
       LIMIT $2`,
      [req.user.user_id, limit]
    );

    res.json({ watch_history: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to watch history
app.post('/api/user/watch-history', authenticateUser, async (req, res) => {
  try {
    const { video_id, duration_watched, resume_at } = req.body;

    const result = await pool.query(
      `INSERT INTO watch_history (user_id, video_id, duration_watched, resume_at)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.user_id, video_id, duration_watched, resume_at]
    );

    res.json({ success: true, record: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's favorites
app.get('/api/user/favorites', authenticateUser, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT f.*, v.title, v.thumbnail_url FROM favorites f
       JOIN videos v ON f.video_id = v.id
       WHERE f.user_id = $1
       ORDER BY f.added_at DESC`,
      [req.user.user_id]
    );

    res.json({ favorites: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to favorites
app.post('/api/user/favorites', authenticateUser, async (req, res) => {
  try {
    const { video_id } = req.body;

    const existing = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND video_id = $2',
      [req.user.user_id, video_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    const result = await pool.query(
      'INSERT INTO favorites (user_id, video_id) VALUES ($1, $2) RETURNING *',
      [req.user.user_id, video_id]
    );

    res.json({ success: true, favorite: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from favorites
app.delete('/api/user/favorites/:video_id', authenticateUser, async (req, res) => {
  try {
    const { video_id } = req.params;

    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND video_id = $2',
      [req.user.user_id, video_id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics for authenticated user
app.get('/api/user/analytics', authenticateUser, async (req, res) => {
  try {
    const totalWatched = await pool.query(
      'SELECT COUNT(*) FROM watch_history WHERE user_id = $1',
      [req.user.user_id]
    );

    const totalFavorites = await pool.query(
      'SELECT COUNT(*) FROM favorites WHERE user_id = $1',
      [req.user.user_id]
    );

    const topWatched = await pool.query(
      `SELECT v.title, COUNT(*) as view_count FROM watch_history wh
       JOIN videos v ON wh.video_id = v.id
       WHERE wh.user_id = $1
       GROUP BY v.id, v.title
       ORDER BY view_count DESC LIMIT 5`,
      [req.user.user_id]
    );

    res.json({
      total_watched: parseInt(totalWatched.rows[0].count),
      total_favorites: parseInt(totalFavorites.rows[0].count),
      top_watched: topWatched.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vimeo API Endpoints

// Get all Vimeo videos
app.get('/api/vimeo/videos', authenticateUser, async (req, res) => {
  try {
    const videos = await vimeoService.getVimeoVideos();
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific Vimeo video
app.get('/api/vimeo/videos/:videoId', authenticateUser, async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await vimeoService.getVimeoVideo(videoId);
    res.json({ video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create video upload
app.post('/api/vimeo/upload', authenticateUser, async (req, res) => {
  try {
    const { fileSize, fileName, description } = req.body;

    if (!fileSize || !fileName) {
      return res.status(400).json({ error: 'fileSize and fileName are required' });
    }

    const uploadInfo = await vimeoService.createVimeoUpload(fileSize, fileName, description);
    res.json(uploadInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get video playback info
app.get('/api/vimeo/playback/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const playbackInfo = await vimeoService.getVimeoPlaybackInfo(videoId);
    res.json(playbackInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create live event
app.post('/api/vimeo/live-events', authenticateUser, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const liveEvent = await vimeoService.createLiveEvent(title, description);

    // Save to database
    await pool.query(
      `INSERT INTO events (title, description, status, vimeo_live_event_id, stream_key, rtmp_url)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description, 'upcoming', liveEvent.live_event_id, liveEvent.stream_key, liveEvent.rtmp_url]
    );

    res.json(liveEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get live event details
app.get('/api/vimeo/live-events/:liveEventId', authenticateUser, async (req, res) => {
  try {
    const { liveEventId } = req.params;
    const liveEvent = await vimeoService.getLiveEvent(liveEventId);
    res.json({ live_event: liveEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start live event
app.post('/api/vimeo/live-events/:liveEventId/start', authenticateUser, async (req, res) => {
  try {
    const { liveEventId } = req.params;
    const liveEvent = await vimeoService.startLiveEvent(liveEventId);

    // Update database
    await pool.query(
      'UPDATE events SET status = $1 WHERE vimeo_live_event_id = $2',
      ['live', liveEventId]
    );

    res.json({ live_event: liveEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End live event
app.post('/api/vimeo/live-events/:liveEventId/end', authenticateUser, async (req, res) => {
  try {
    const { liveEventId } = req.params;
    const liveEvent = await vimeoService.endLiveEvent(liveEventId);

    // Update database
    await pool.query(
      'UPDATE events SET status = $1 WHERE vimeo_live_event_id = $2',
      ['completed', liveEventId]
    );

    res.json({ live_event: liveEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    version: '1.0.0',
    database: 'PostgreSQL'
  });
});

app.listen(PORT, () => {
  console.log(`\n🎬 SEI Streaming API running on port ${PORT}`);
  console.log(`📝 Demo account: demo@seimediagroup.co / Emile2304#`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`🗄️  Database: PostgreSQL (sei_streaming)`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health\n`);
});

export default app;
