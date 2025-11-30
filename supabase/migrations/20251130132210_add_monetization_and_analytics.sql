/*
  # Add Monetization and Analytics Features for ROBOIP

  ## New Tables
  
  1. **ip_assets**
     - `id` (uuid, primary key) - Unique asset identifier
     - `job_id` (uuid, foreign key) - Links to motion_jobs
     - `user_id` (uuid, foreign key) - Asset owner
     - `ip_id` (text) - Story Protocol IP ID
     - `nft_token_id` (bigint) - NFT token ID
     - `story_tx_hash` (text) - Story Protocol transaction
     - `license_terms_id` (bigint) - License configuration
     - `commercial_use` (boolean) - Commercial licensing enabled
     - `commercial_rev_share` (numeric) - Revenue share percentage
     - `minting_fee` (numeric) - Fee to mint license
     - `total_licenses_issued` (integer) - Count of licenses
     - `total_revenue` (numeric) - Total earnings
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  2. **license_sales**
     - `id` (uuid, primary key)
     - `ip_asset_id` (uuid, foreign key)
     - `buyer_address` (text) - Licensee wallet
     - `license_tx_hash` (text) - Purchase transaction
     - `amount_paid` (numeric) - Payment amount
     - `currency` (text) - Payment currency
     - `license_type` (text) - Type of license
     - `created_at` (timestamptz)
  
  3. **royalty_payments**
     - `id` (uuid, primary key)
     - `ip_asset_id` (uuid, foreign key)
     - `user_id` (uuid, foreign key) - Recipient
     - `amount` (numeric) - Payment amount
     - `currency` (text) - Payment currency
     - `source_tx_hash` (text) - Source transaction
     - `claimed` (boolean) - Payment claimed
     - `claimed_at` (timestamptz)
     - `created_at` (timestamptz)
  
  4. **asset_analytics**
     - `id` (uuid, primary key)
     - `ip_asset_id` (uuid, foreign key)
     - `view_count` (integer) - Total views
     - `download_count` (integer) - Downloads
     - `license_request_count` (integer) - License inquiries
     - `quality_score` (numeric) - AI quality assessment
     - `popularity_score` (numeric) - Trending score
     - `tags` (jsonb) - Auto-generated tags
     - `ai_metadata` (jsonb) - AI-extracted features
     - `updated_at` (timestamptz)

  ## Security
  
  - Enable RLS on all new tables
  - Users can read their own data
  - Users can update their own assets
  - Public read access to non-sensitive analytics

  ## Indexes
  
  - Index on user_id for fast user queries
  - Index on ip_id for Story Protocol lookups
  - Index on quality_score for rankings
*/

CREATE TABLE IF NOT EXISTS ip_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES motion_jobs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_id text UNIQUE,
  nft_token_id bigint,
  story_tx_hash text,
  license_terms_id bigint,
  commercial_use boolean DEFAULT false,
  commercial_rev_share numeric DEFAULT 0,
  minting_fee numeric DEFAULT 0,
  total_licenses_issued integer DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS license_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_asset_id uuid REFERENCES ip_assets(id) ON DELETE CASCADE,
  buyer_address text NOT NULL,
  license_tx_hash text NOT NULL,
  amount_paid numeric NOT NULL,
  currency text DEFAULT 'ETH',
  license_type text DEFAULT 'commercial',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS royalty_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_asset_id uuid REFERENCES ip_assets(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  currency text DEFAULT 'ETH',
  source_tx_hash text,
  claimed boolean DEFAULT false,
  claimed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS asset_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_asset_id uuid REFERENCES ip_assets(id) ON DELETE CASCADE,
  view_count integer DEFAULT 0,
  download_count integer DEFAULT 0,
  license_request_count integer DEFAULT 0,
  quality_score numeric DEFAULT 0,
  popularity_score numeric DEFAULT 0,
  tags jsonb DEFAULT '[]'::jsonb,
  ai_metadata jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ip_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE royalty_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own IP assets"
  ON ip_assets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own IP assets"
  ON ip_assets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own IP assets"
  ON ip_assets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own license sales"
  ON license_sales FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ip_assets
      WHERE ip_assets.id = license_sales.ip_asset_id
      AND ip_assets.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert license sales"
  ON license_sales FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own royalty payments"
  ON royalty_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own royalty payments"
  ON royalty_payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view analytics"
  ON asset_analytics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can update analytics"
  ON asset_analytics FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ip_assets
      WHERE ip_assets.id = asset_analytics.ip_asset_id
      AND ip_assets.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_ip_assets_user_id ON ip_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_ip_assets_ip_id ON ip_assets(ip_id);
CREATE INDEX IF NOT EXISTS idx_license_sales_ip_asset_id ON license_sales(ip_asset_id);
CREATE INDEX IF NOT EXISTS idx_royalty_payments_user_id ON royalty_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_asset_analytics_quality_score ON asset_analytics(quality_score DESC);
CREATE INDEX IF NOT EXISTS idx_asset_analytics_popularity_score ON asset_analytics(popularity_score DESC);

CREATE OR REPLACE FUNCTION update_ip_asset_revenue()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ip_assets
  SET 
    total_revenue = total_revenue + NEW.amount_paid,
    total_licenses_issued = total_licenses_issued + 1,
    updated_at = now()
  WHERE id = NEW.ip_asset_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_license_sale
  AFTER INSERT ON license_sales
  FOR EACH ROW
  EXECUTE FUNCTION update_ip_asset_revenue();
