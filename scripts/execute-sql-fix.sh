#!/bin/bash

# This script will execute the SQL fixes using psql
# We'll construct the connection string from the Supabase URL

SUPABASE_URL="https://rvyzohkszljarrnyeanp.supabase.co"
PROJECT_REF="rvyzohkszljarrnyeanp"

# Extract host from URL
HOST="aws-0-us-east-1.pooler.supabase.com"
PORT="6543"
DATABASE="postgres"
USER="postgres.${PROJECT_REF}"

echo "🔧 Attempting to fix database using PostgreSQL client..."
echo ""
echo "This requires your database password."
echo "You can find it in Supabase Dashboard > Settings > Database"
echo ""
echo "Or press Ctrl+C to cancel and I'll give you the SQL to copy/paste."
echo ""

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "❌ psql is not installed on this system."
    echo ""
    echo "📋 ALTERNATIVE: Copy this SQL and run it in Supabase SQL Editor:"
    echo "https://supabase.com/dashboard/project/rvyzohkszljarrnyeanp/sql"
    echo ""
    cat ../supabase/migrations/005_fix_rls_policies.sql
    cat ../supabase/migrations/004_fix_quotes_bookings_schema.sql
    exit 1
fi

# Prompt for password
echo "Enter your Supabase database password:"
read -s DB_PASSWORD

# Construct connection string
CONN_STRING="postgresql://${USER}:${DB_PASSWORD}@${HOST}:${PORT}/${DATABASE}"

echo ""
echo "Connecting to database..."

# Execute the SQL files
psql "$CONN_STRING" <<EOF
-- Add missing columns
ALTER TABLE custom_quotes
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT;

-- Fix RLS policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can view their bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can insert quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can view their quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can insert customers" ON customers;
DROP POLICY IF EXISTS "Anyone can view customers" ON customers;

CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view their bookings" ON bookings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert quotes" ON custom_quotes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view their quotes" ON custom_quotes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert customers" ON customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view customers" ON customers FOR SELECT TO anon, authenticated USING (true);
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Database has been fixed!"
    echo "Your booking and quote forms should work now."
else
    echo ""
    echo "❌ Failed to connect or execute SQL."
    echo "Please run the SQL manually in Supabase SQL Editor."
fi
