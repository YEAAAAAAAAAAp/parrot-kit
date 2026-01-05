-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_category VARCHAR(50),
  event_label VARCHAR(200),
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  page_path VARCHAR(500),
  referrer VARCHAR(500),
  device_type VARCHAR(50),
  browser VARCHAR(50),
  country VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB
);

-- Page Views Table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  session_id VARCHAR(100),
  user_id VARCHAR(100),
  referrer VARCHAR(500),
  device_type VARCHAR(50),
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversion Funnel Table
CREATE TABLE IF NOT EXISTS conversion_funnel (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  step VARCHAR(50) NOT NULL,
  step_order INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_session ON conversion_funnel(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_step ON conversion_funnel(step);

-- Add admin column to users table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
  END IF;
END $$;
