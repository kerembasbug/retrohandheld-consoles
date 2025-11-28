const fs = require('fs');
const path = require('path');

// SEO-optimized açıklama oluşturma fonksiyonu
function generateSEODescription(product) {
  const { title, brand, price, rating, reviewCount, features, category, dimensions } = product;
  
  // Fiyat kontrolü
  const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  const isBudget = priceNum < 80;
  const isPremium = priceNum >= 200;
  const isMidRange = priceNum >= 80 && priceNum < 200;
  
  // Kategori bazlı hikaye başlangıçları
  const categoryStories = {
    'retro-handheld': 'Step back in time and relive the golden age of gaming',
    'linux-handheld': 'Experience the power of open-source gaming',
    'android-handheld': 'Modern Android gaming meets classic retro nostalgia',
    'cloud-gaming': 'Stream your favorite games anywhere, anytime',
    'kids-handheld': 'Perfect for young gamers discovering classic games',
    'handheld-consoles': 'Portable gaming at its finest'
  };
  
  const storyStart = categoryStories[category] || 'Discover the perfect retro gaming companion';
  
  // Özelliklerden ana özellikleri çıkar
  const screenSize = title.match(/(\d+\.?\d*)\s*inch/i)?.[1] || '';
  const gamesCount = features.join(' ').match(/(\d{3,})\+?\s*games?/i)?.[1] || '';
  const battery = features.join(' ').match(/(\d{4,})\s*mAh/i)?.[1] || '';
  
  // Hikaye paragrafları
  const paragraphs = [];
  
  // İlk paragraf: Hikaye + Ürün tanıtımı
  paragraphs.push(
    `${storyStart} with the ${title}. This ${brand} retro handheld game console brings together the best of classic gaming and modern technology, allowing you to enjoy thousands of beloved retro games wherever you go. Whether you're a seasoned gamer looking to revisit childhood favorites or a newcomer eager to experience gaming history, this portable console delivers an authentic retro gaming experience.`
  );
  
  // İkinci paragraf: Özellikler vurgusu
  let featuresText = '';
  if (screenSize) {
    featuresText += `The ${screenSize}-inch IPS screen provides crisp, vibrant visuals that bring classic games to life. `;
  }
  if (gamesCount) {
    featuresText += `With over ${gamesCount} preloaded games, you'll have access to an extensive library of retro classics from the 8-bit and 16-bit eras. `;
  }
  if (battery) {
    featuresText += `The powerful ${battery}mAh battery ensures hours of uninterrupted gaming sessions, perfect for long commutes or travel. `;
  }
  
  if (featuresText) {
    paragraphs.push(
      featuresText + `The console features ergonomic design and intuitive controls that make it easy to jump into your favorite games. Built with quality materials, this handheld device is designed to withstand regular use while maintaining its sleek, portable form factor.`
    );
  } else {
    paragraphs.push(
      `This handheld console features an intuitive design with responsive controls that make gaming enjoyable for players of all skill levels. The device is built with durability in mind, ensuring it can handle regular use while maintaining its compact, portable design.`
    );
  }
  
  // Üçüncü paragraf: Değer vurgusu + CTA
  let valueText = '';
  if (isBudget) {
    valueText = `At just $${priceNum}, this console offers exceptional value for retro gaming enthusiasts. `;
  } else if (isPremium) {
    valueText = `As a premium handheld console, this device represents the pinnacle of retro gaming technology. `;
  } else {
    valueText = `Priced at $${priceNum}, this console offers an excellent balance of features and affordability. `;
  }
  
  paragraphs.push(
    valueText + `With a ${rating.toFixed(1)}-star rating from ${reviewCount.toLocaleString()} satisfied customers, this ${brand} handheld console has proven itself as a reliable choice for retro gaming. Whether you're looking to relive classic arcade moments, explore retro RPG adventures, or enjoy timeless platformers, this console provides the perfect gateway to gaming nostalgia. Don't miss out on the opportunity to own a piece of gaming history - order your ${title} today and start your retro gaming journey!`
  );
  
  return paragraphs.join(' ').trim();
}

// Ana işlem
const productsFile = path.join(__dirname, 'src/data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));

console.log('📝 SEO açıklamaları oluşturuluyor...\n');

let updated = 0;
productsData.products.forEach((product, index) => {
  // Eğer description "N/A" veya çok kısa ise, yeni açıklama oluştur
  if (!product.description || product.description === 'N/A' || product.description.length < 100) {
    product.description = generateSEODescription(product);
    updated++;
    
    if (index < 5) {
      console.log(`✅ ${product.title.substring(0, 50)}...`);
      console.log(`   Açıklama: ${product.description.substring(0, 100)}...\n`);
    }
  }
});

// Dosyayı kaydet
fs.writeFileSync(productsFile, JSON.stringify(productsData, null, 2), 'utf-8');

console.log(`\n✅ Toplam ${updated} ürün için SEO açıklaması oluşturuldu!`);
console.log(`📁 Dosya güncellendi: ${productsFile}`);

