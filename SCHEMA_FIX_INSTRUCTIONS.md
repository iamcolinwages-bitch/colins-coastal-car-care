# Schema Fix Instructions

## Required SQL Migration

The booking and quote system needs these columns added to the `custom_quotes` table.

### Run this in Supabase SQL Editor:

```sql
ALTER TABLE custom_quotes
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT;
```

### How to Run:

1. Go to your Supabase project: https://supabase.com/dashboard/project/rvyzohkszljarrnyeanp
2. Click "SQL Editor" in the left sidebar
3. Click "+ New Query"
4. Paste the SQL above
5. Click "Run" or press Cmd+Enter

### What This Fixes:

- Allows quotes to store customer address and city information
- Fixes the "Could not find the 'address' column" error when submitting quotes
- Enables the full booking flow from quote → schedule booking

### After Running:

The website will immediately start working for:
- Creating quotes with full customer info
- Scheduling bookings from approved quotes
- All customer data will be properly stored
