#!/bin/bash
# dev.sh - Auto start/stop your stack

cd "$(dirname "$0")"  # Root project dir

case "$1" in
  "start")
    echo "🚀 Starting dev stack..."
    
    # 1. Start MongoDB Docker
    docker compose up -d mongo &  # Background
    
    # 2. Wait + Backend
    sleep 3
    echo "🐳 Backend..."
    cd backend && npm run dev &  # PID 1
    
    # 3. Frontend 
    sleep 3 
    cd frontend
    echo "⚛️ Frontend..."
    npm run dev &  # PID 2
    
    echo "✅ ALL RUNNING! Ctrl+C to stop gracefully"
    wait  # Wait for any child to die
    ;;
    
  "stop")
    echo "🛑 Graceful shutdown..."
    pkill -f "npm run dev"  # Kill npm dev processes
    docker compose down mongo
    echo "✅ CLEAN STOPPED"
    ;;
    
  "status")
    echo "📊 Status:"
    docker compose ps mongo
    pgrep -f "npm run dev" | xargs ps -p
    ;;
  *)
    echo "Usage: ./dev.sh [start|stop|status]"
    exit 1
    ;;
esac
