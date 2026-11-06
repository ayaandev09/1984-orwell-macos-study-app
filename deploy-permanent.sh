#!/usr/bin/env bash
# ==============================================================================
# MINITRUE // 1984 Permanent Cloud Deployment Script
# Deploys your 1984 Liquid Glass Study Database to a permanent 24/7 cloud URL
# that stays live even when your Mac is sleeping or turned off.
# ==============================================================================

set -e

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "========================================================"
echo "  MINITRUE // 1984 Permanent Cloud Deployment"
echo "========================================================"
echo "Select how you want to deploy your permanent link:"
echo ""
echo "  1) Deploy to Vercel (Recommended - gives you a permanent https://*.vercel.app URL)"
echo "  2) Open Netlify Drop in Browser (Drag-and-drop the 'out' folder in 5 seconds)"
echo "  3) Open local 'out' folder in Finder"
echo "========================================================"
read -p "Enter choice [1-3] (default: 1): " choice
choice=${choice:-1}

case $choice in
  1)
    echo "Running Next.js production build..."
    npm run build
    echo "Deploying to Vercel..."
    npx vercel --prod
    ;;
  2)
    echo "Opening Netlify Drop in your browser..."
    open "https://app.netlify.com/drop"
    open "$DIR/out"
    echo "Done! Simply drag the opened 'out' folder onto the Netlify Drop page."
    ;;
  3)
    open "$DIR/out"
    ;;
  *)
    echo "Invalid option."
    exit 1
    ;;
esac
