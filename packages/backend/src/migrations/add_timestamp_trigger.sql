-- First, add the trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedat = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Then, add the trigger to the users table
DROP TRIGGER IF EXISTS update_users_timestamp ON users;
CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Update the column to set a default value for new records
ALTER TABLE users 
    ALTER COLUMN updatedat SET DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN createdat SET DEFAULT CURRENT_TIMESTAMP;
