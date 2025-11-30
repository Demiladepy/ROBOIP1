# ROBOIP 🤖

**AI-Powered Motion Capture IP Platform**

Transform your videos into valuable IP assets. ROBOIP uses advanced AI to extract professional motion capture data, registers it as IP-NFTs on Story Protocol, and enables you to earn revenue through automated licensing and royalties.

Built for the Surreal World Buildathon.

## Architecture

This project follows a modular architecture optimized for AI agent development:

```
/project
├── motion-extraction-backend/    # Python FastAPI server
├── metadata-engine/              # Metadata extraction
├── ipfs-uploader/               # IPFS integration
├── smart-contract/              # Solidity contracts
├── app/                         # Next.js frontend
├── components/                  # React components
└── integration-tests/           # E2E tests
```

## Stack

- **Backend**: Python + FastAPI + EasyMocap
- **Frontend**: Next.js 13 + React + TypeScript
- **3D Rendering**: Three.js + React Three Fiber
- **Storage**: IPFS (Web3.Storage)
- **Database**: Supabase (PostgreSQL)
- **Blockchain**: Solidity smart contracts
- **UI**: Tailwind CSS + shadcn/ui

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd project
npm install
```

### 2. Setup Environment

Copy `.env.template` to `.env` and fill in your credentials:

```bash
cp .env.template .env
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `WEB3_STORAGE_TOKEN` - Web3.Storage API token
- `NEXT_PUBLIC_BLOCKCHAIN_RPC_URL` - Blockchain RPC endpoint
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Deployed contract address

### 3. Setup Backend

```bash
cd motion-extraction-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Install EasyMocap

```bash
git clone https://github.com/zju3dv/EasyMocap.git
cd EasyMocap
pip install -e .
```

### 5. Run Backend

```bash
cd motion-extraction-backend
uvicorn main:app --reload --port 8000
```

### 6. Run Frontend

```bash
npm run dev
```

Visit `http://localhost:3000`

## Features

### Video Processing
- Upload videos through web interface
- Automatic motion extraction using EasyMocap
- Real-time processing status updates

### IPFS Storage
- Decentralized storage for videos and motion data
- Permanent, content-addressed storage
- Web3.Storage integration

### On-Chain Registry
- Blockchain-verified ownership
- Immutable provenance records
- Smart contract asset registry

### 3D Visualization
- Interactive skeleton viewer
- Real-time 3D rendering
- Motion playback controls

## Database Schema

### Tables

- `motion_jobs` - Processing job tracking
- `motion_metadata` - Extracted metadata
- `user_assets` - User's asset library

All tables use Row Level Security (RLS) for data protection.

## Smart Contract

### MotionRegistry.sol

Manages on-chain registration of motion capture assets.

**Key Functions:**
- `registerMotion(videoCID, dataCID, metadataCID)` - Register new asset
- `getMotion(assetId)` - Retrieve asset details
- `getOwnerAssets(address)` - List user's assets
- `transferOwnership(assetId, newOwner)` - Transfer asset

### Deploy Contract

```bash
cd smart-contract
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network <network>
```

## API Documentation

### Backend API

**POST /upload**
Upload video file

**POST /process/{job_id}**
Start motion processing

**GET /status/{job_id}**
Check processing status

**GET /health**
Health check

### Frontend Routes

- `/` - Home page
- `/upload` - Upload interface
- `/assets` - Asset library
- `/view/[id]` - Asset viewer

## Development

### Project Structure

Each module has:
- Clear single responsibility
- Dedicated README
- Independent deployment
- Isolated dependencies

### Testing

```bash
cd integration-tests
npm test
```

## Agent Development Guidelines

This project is structured for AI agent development:

1. **Modular Design** - Each component is self-contained
2. **Clear Boundaries** - No cross-module dependencies
3. **Documented APIs** - Every module has usage examples
4. **Test Coverage** - Integration tests verify flows

### Constraints

- DO NOT modify EasyMocap core code
- DO NOT move folders outside defined structure
- ALWAYS log steps to `/logs/agent.log`
- USE `.env.template` for secrets

## Deployment

### Frontend (Vercel)

```bash
npm run build
vercel deploy
```

### Backend

Deploy FastAPI to your preferred platform:
- Railway
- Render
- Fly.io
- AWS Lambda

### Smart Contract

Deploy to testnet or mainnet using Hardhat.

## Contributing

This is a buildathon project. Contributions welcome!

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
