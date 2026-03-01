# Capstone Project - CLI

A CLI app to manage users with SQLite, YAML config, CSV import, and structured logging.

## Setup

- Download the code in zip format, extract the files and change the directory to "capstone/". Run the command mentioned below to install the node modules. Make sure that your machine has node v20 in use.
- For sqliite to run properly - kindly make sure that you already have build-essential package installed in case of linux 
- If not please install build-essential and try a rebuild
  
```bash
sudo apt update
sudo apt install -y build-essential
pnpm rebuild better-sqlite3
```

```bash
pnpm install
```
Run migrations:

```bash
pnpm drizzle-kit migrate
```

## Commands

```bash
# Validate config
npx tsx src/index.ts config:check

# Import users from CSV 
npx tsx src/index.ts users:import sample.csv

# List all users
npx tsx src/index.ts users:list

# Add a single user
npx tsx src/index.ts users:add --name "Ishika" --email "ishi@example.com"
```

## Sample Files

**`sample-users.csv`**
```csv
name,email
Harry Potter,hpotter@example.com
Ron Weasly,ronwon@example.com
Hermione Granger,thebrightestwizardofherage@example.com
```

**`config.yaml`**
```yaml
dbPath: ./sqlite.db
logLevel: debug
```
