#!/bin/bash
# Zeabur Environment Variables Ekleme Script

echo "🔐 Zeabur environment variables ekleniyor..."

# CSV'den credentials oku
ACCESS_KEY=$(node -e "
const fs = require('fs');
const csv = fs.readFileSync('/Users/kerembasbug/Downloads/PAAPICredentials.csv', 'utf-8');
const lines = csv.trim().split('\n');
const data = lines[1].split(',');
console.log(data[0].trim());
")

SECRET_KEY=$(node -e "
const fs = require('fs');
const csv = fs.readFileSync('/Users/kerembasbug/Downloads/PAAPICredentials.csv', 'utf-8');
const lines = csv.trim().split('\n');
const data = lines[1].split(',');
console.log(data[1].trim());
")

# Partner Tag (varsayılan veya kullanıcıdan alınabilir)
PARTNER_TAG="your-tag-20"

echo "📝 Environment variables:"
echo "   AMAZON_ACCESS_KEY: ${ACCESS_KEY:0:10}..."
echo "   AMAZON_SECRET_KEY: ${SECRET_KEY:0:10}..."
echo "   AMAZON_PARTNER_TAG: $PARTNER_TAG"

# Zeabur'a ekle
echo ""
echo "🚀 Zeabur'a ekleniyor..."

zeabur env add AMAZON_ACCESS_KEY="$ACCESS_KEY" || echo "⚠️  AMAZON_ACCESS_KEY eklenemedi"
zeabur env add AMAZON_SECRET_KEY="$SECRET_KEY" || echo "⚠️  AMAZON_SECRET_KEY eklenemedi"
zeabur env add AMAZON_PARTNER_TAG="$PARTNER_TAG" || echo "⚠️  AMAZON_PARTNER_TAG eklenemedi"

echo ""
echo "✅ Environment variables eklendi!"
echo "💡 Partner Tag'i değiştirmek için: zeabur env add AMAZON_PARTNER_TAG=yeni-tag"
