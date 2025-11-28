#!/bin/bash
# Zeabur Deploy Script

echo "🚀 Zeabur'a deploy başlatılıyor..."

# Zeabur CLI kontrolü
if ! command -v zeabur &> /dev/null; then
    echo "❌ Zeabur CLI bulunamadı. Lütfen önce kurun:"
    echo "   npm install -g zeabur"
    echo "   veya"
    echo "   brew install zeabur/tap/zeabur"
    exit 1
fi

# Zeabur authentication kontrolü
echo "🔐 Zeabur authentication kontrol ediliyor..."
zeabur whoami || {
    echo "❌ Zeabur'a giriş yapılmamış. Lütfen önce giriş yapın:"
    echo "   zeabur login"
    exit 1
}

# Proje link kontrolü
if [ ! -f ".zeabur/project.json" ]; then
    echo "📦 Proje Zeabur'a link ediliyor..."
    zeabur link
fi

# Build kontrolü
echo "🔨 Proje build ediliyor..."
npm run build || {
    echo "❌ Build başarısız!"
    exit 1
}

# Deploy
echo "🚀 Zeabur'a deploy ediliyor..."
zeabur deploy

echo "✅ Deploy tamamlandı!"
