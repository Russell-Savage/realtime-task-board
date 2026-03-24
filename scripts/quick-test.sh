#!/bin/bash
echo "Testing MongoDB connection..."
node test-mongo.mjs && echo "✅ Backend MongoDB ready!" || echo "❌ Fix MongoDB first"
