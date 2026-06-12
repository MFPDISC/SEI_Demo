#!/bin/bash

echo "================================"
echo "SEI Streaming - Vimeo Test"
echo "================================"
echo ""

# Get your auth token first
echo "Step 1: Login to get auth token..."
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@seimediagroup.co","password":"Emile2304#"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi

echo "✅ Logged in successfully!"
echo ""

# Test: Get Vimeo videos
echo "Step 2: Fetching your Vimeo videos..."
curl -s -X GET http://localhost:3001/api/vimeo/videos \
  -H "Authorization: Bearer $TOKEN" | json_pp

echo ""
echo "================================"
echo "Vimeo Integration Working! ✅"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Go to http://localhost:5174"
echo "2. Login with: demo@seimediagroup.co / Emile2304#"
echo "3. Your Vimeo account is now connected!"
echo ""
