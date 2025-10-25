# Contributing to Park INC

Thank you for your interest in contributing to Park INC!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/IND8137A.git`
3. Install dependencies: `npm run install:all`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Backend Development

```bash
cd backend
npm install
npm run dev  # Starts with nodemon for auto-reload
```

The backend runs on `http://localhost:5000`

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`

### Running Both Servers

You can use the convenience script:
```bash
./start.sh
```

Or use npm scripts from the root:
```bash
npm run start:backend  # Terminal 1
npm run start:frontend # Terminal 2
```

## Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns
- Keep components small and focused

## Making Changes

1. Make your changes in your feature branch
2. Test your changes locally
3. Ensure the code builds without errors
4. Commit with clear, descriptive messages
5. Push to your fork
6. Create a Pull Request

## Project Structure

```
Park INC/
├── backend/          # Node.js/Express API
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
└── README.md
```

## Feature Ideas

- User authentication
- Payment integration
- Reservation system
- Real sensor integration
- Push notifications
- Multi-city support
- Historical analytics

## Questions?

Feel free to open an issue for any questions or suggestions!
