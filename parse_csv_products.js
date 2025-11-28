const fs = require('fs');
const path = require('path');

// CSV dosyalarının bulunduğu klasör
const csvDir = '/Users/kerembasbug/Downloads';
const outputFile = path.join(__dirname, 'src/data/products.json');

// CSV dosyalarını bul
const csvFiles = [
  'R40_Retro_export.csv',
  'Handheld_Game_export (2).csv',
  'Logitech_G_export.csv',
  'Kinhank_K36_export.csv',
  'Kinhank_K56_export.csv',
  '16_Bit_export (1).csv',
  '16_Bit_export.csv',
  'RG505_Retro_export.csv',
  'RG_Cubexx_export.csv',
  'R36H_Retro_export.csv',
  'Retroid_Pocket_export.csv',
  'RG40XX_V_export.csv',
  'Mini_Retro_export.csv',
  'My_Arcade_export (1).csv',
  'OnePro_Cloud_export.csv',
  'RG40XX_H_export (1).csv',
  'Handheld_Game_export (1).csv',
  'RG35XXSP_Flip_export.csv',
  'RegiisJoy_30000_export.csv',
  'RG35XX_H_export.csv',
  'RG40XX_H_export.csv',
  'RG28XX_Retro_export.csv',
  'XF40V_Retro_export.csv',
  'G350_Retro_export.csv',
  'RG35XX_Pro_export.csv',
  'R40_Handheld_export.csv',
  'Miyoo_Mini_export.csv',
  'Saker_Retro_export.csv',
  'My_Arcade_export.csv',
  'Upgraded_XF40H_export.csv',
  'X9_Retro_export.csv',
  'R36MAX_Retro_export (1).csv',
  'RG36PRO_Retro_export.csv',
  'R36T_Retro_export.csv',
  'R36MAX_Retro_export.csv',
  'Handheld_Game_export.csv',
  // Yeni eklenen dosyalar
  'RG3566_Handheld_export.csv',
  'RG34XX_Handheld_export.csv',
  'TRIMUI_Smart_export.csv',
  'LITNXT_TRIMUI_export.csv',
  'Nintendo_3DS_export.csv',
  'RG351MP_Handheld_export.csv',
  'Retroid_Pocket_export (3).csv',
  'Miyoo_Mini_export (1).csv',
  'RG405V_Video_export.csv',
  'kinhank_K56_export (1).csv',
  'GiipGoop_RG_export.csv',
  'Classic_Handheld_export.csv',
  'RG476H_Retro_export (2).csv',
  'Game_Gear_export.csv',
  'WonderSwan_Crystal_export.csv',
  'ZWXYVUT_RP_export.csv',
  'Sony_PSP_export (2).csv',
  'TOJASDN_30000_export.csv',
  'Retroid_Pocket_export (2).csv',
  'RG405V_Retro_export.csv',
  'RG476H_Retro_export (1).csv',
  'Retroid_Pocket_export (1).csv',
  'Sony_PSP_export (1).csv',
  'ConsoleXpress_RG406V_export.csv',
  'RG557_Retro_export (1).csv',
  'RG406V_Handheld_export.csv',
  'ANBERNIC_RG477M_export.csv',
  'Actualia_RG556_export.csv',
  'RG476h_Retro_export.csv',
  'OYDL_RG556_export.csv',
  'Sony_PSP_export.csv',
  'RG556_Retro_export.csv',
  'Doriteney_RG557_export.csv',
  'Blue_-NEW_export.csv',
  'Nintendo_2DS_export.csv',
  'WIN600_Handheld_export.csv',
  'Nintendo_Switch_export.csv',
  'Odin_2_export (1).csv',
  'RG557_Retro_export.csv',
  'AYANEO_Pocket_export.csv',
  'INLAND_Micro_export.csv',
  'Valve_Steam_export.csv',
  'Odin_2_export.csv',
  'GPD_WIN_export.csv',
  'Lenovo_Legion_export.csv',
  'ASUS_ROG_export.csv',
  'Retro_Game_export (1).csv',
  'My_Arcade_export (2).csv'
];

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  
  const headers = parseCSVLine(lines[0]);
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;
    
    const product = {};
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });
    
    // ASIN kontrolü - ASIN 10 karakter, alfanumerik olmalı
    let asin = (product.Asin || product.ASIN || '').trim();
    // ASIN validation: 10 karakter, sadece harf ve rakam
    if (!asin || asin === 'N/A' || asin.length < 10 || !/^[A-Z0-9]{10,}$/i.test(asin)) {
      continue; // Geçersiz ASIN'i atla
    }
    asin = asin.substring(0, 10).toUpperCase(); // İlk 10 karakteri al ve büyük harfe çevir
    
    // Fiyat temizleme ve validation
    let price = product.Price || '0';
    // Remove currency symbols and extract numbers
    price = price.replace(/[^0-9.]/g, '');
    // Remove trailing dots and format properly
    price = price.replace(/\.+$/, '');
    // Parse as float to ensure valid number
    const priceNum = parseFloat(price);
    // Fiyat validation: 0-2000 arası olmalı (makul bir üst limit)
    if (!price || price === '0' || isNaN(priceNum) || priceNum <= 0 || priceNum > 2000) {
      price = 'Check Price';
    } else {
      // Format as currency: if it's a whole number, show without decimals, otherwise show 2 decimals
      price = priceNum % 1 === 0 ? priceNum.toString() : priceNum.toFixed(2);
    }
    
    // Rating temizleme ve validation
    let rating = product.Rating || '0';
    rating = parseFloat(rating) || 0;
    // Rating validation: 0-5 arası olmalı
    if (rating < 0 || rating > 5 || isNaN(rating)) {
      rating = 0;
    }
    
    // Review sayısı temizleme ve validation
    let reviewCount = product['Total Review'] || '0';
    // Sadece rakamları al
    reviewCount = reviewCount.toString().replace(/[^0-9]/g, '');
    reviewCount = parseInt(reviewCount) || 0;
    // Review count validation: 0-10 milyon arası olmalı (makul bir üst limit)
    if (reviewCount < 0 || reviewCount > 10000000 || isNaN(reviewCount)) {
      reviewCount = 0;
    }
    
    const mainCategory = categorizeProduct(product.Title || '', product.Description || '', product.About || '');
    const seoCategories = getSEOCategories(product.Title || '', product.Description || '', product.About || '', asin);
    
    // Marka'yı temizle
    let cleanBrand = (product.Brand || product.Manufacturer || 'Generic').trim();
    cleanBrand = cleanBrand.replace(/^Visit the /i, '').replace(/ Store$/i, '').trim();
    if (!cleanBrand || cleanBrand.length > 50) {
      cleanBrand = 'Generic';
    }
    
    // Yeni format: Marka + Model + Özellik + Retro Game Handheld
    const formattedTitle = formatProductTitle(
      product.Title || '',
      cleanBrand,
      product.Description || '',
      product.About || ''
    );
    
    products.push({
      asin: asin.trim(),
      title: formattedTitle,
      price: price,
      rating: rating,
      reviewCount: reviewCount,
      image: (product['Product Image Url'] || '').trim(),
      url: (product['Product Url'] || `https://www.amazon.com/dp/${asin}`).trim(),
      description: (product.Description || product.About || '').trim(),
      brand: cleanBrand,
      category: mainCategory,
      seoCategories: seoCategories,
      features: extractFeatures(product.About || product.Description || ''),
      dimensions: {
        length: product['Long Dimension'] || '',
        width: product['Width Dimension'] || '',
        height: product['Height Dimension'] || '',
        weight: product.Weight || ''
      }
    });
  }
  
  return products;
}

function categorizeProduct(title, description, about) {
  const text = `${title} ${description} ${about}`.toLowerCase();
  
  if (text.includes('cloud') || text.includes('streaming') || text.includes('xbox cloud') || text.includes('geforce now')) {
    return 'cloud-gaming';
  }
  if (text.includes('android') || text.includes('android 12') || text.includes('android 13') || text.includes('android 14')) {
    return 'android-handheld';
  }
  if (text.includes('linux') || text.includes('emuelec')) {
    return 'linux-handheld';
  }
  if (text.includes('kids') || text.includes('children') || text.includes('toy')) {
    return 'kids-handheld';
  }
  if (text.includes('retro') || text.includes('classic') || text.includes('emulator')) {
    return 'retro-handheld';
  }
  
  return 'handheld-consoles';
}

// SEO kategorileri listesi
const allSEOCategories = [
  'retro-handheld-game-console',
  'handheld-retro-game-console',
  'retro-game-handheld',
  'best-handheld-retro-game-console',
  'retro-game-handheld-console',
  'retro-handheld-game',
  'handheld-game-console-retro',
  'best-retro-handheld-game-console',
  'retro-game-console-handheld',
  'retro-game-handhelds',
  'retro-gamer-handheld',
  'retro-games-handheld',
  'handheld-retro-games',
  'retro-handheld-games',
  'handheld-games',
  'best-handheld-games',
  'game-console',
  'portable-handheld',
  'portable-handheld-games',
];

function getSEOCategories(title, description, about, asin) {
  const text = `${title} ${description} ${about}`.toLowerCase();
  const seoCats = [];
  
  // ASIN'e göre deterministik hash (aynı ürün her zaman aynı kategorilere gider)
  const hash = asin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Tüm SEO kategorileri
  const allSEOCats = [
    'retro-handheld-game-console',
    'handheld-retro-game-console',
    'retro-game-handheld',
    'best-handheld-retro-game-console',
    'retro-game-handheld-console',
    'retro-handheld-game',
    'handheld-game-console-retro',
    'best-retro-handheld-game-console',
    'retro-game-console-handheld',
    'retro-game-handhelds',
    'retro-gamer-handheld',
    'retro-games-handheld',
    'handheld-retro-games',
    'retro-handheld-games',
    'handheld-games',
    'best-handheld-games',
    'game-console',
    'portable-handheld',
    'portable-handheld-games',
  ];
  
  // Her ürün 2-4 kategori alacak (rastgele ama dengeli)
  const numCategories = 2 + (hash % 3); // 2-4 kategori
  
  // Hash'e göre kategorileri seç (dengeli dağıtım için)
  const selectedIndices = new Set();
  for (let i = 0; i < numCategories; i++) {
    let attempts = 0;
    let catIndex;
    do {
      // Farklı seed'ler kullanarak farklı kategoriler seç
      catIndex = (hash + i * 13 + attempts * 17) % allSEOCats.length;
      attempts++;
    } while (selectedIndices.has(catIndex) && attempts < 20);
    
    selectedIndices.add(catIndex);
    seoCats.push(allSEOCats[catIndex]);
  }
  
  // Özel kategoriler (kriterlere göre ekle - maksimum 1 ek kategori)
  if (text.includes('portable') || text.includes('compact') || text.includes('mini')) {
    const portableCats = ['portable-handheld', 'portable-handheld-games'];
    const portableIndex = hash % portableCats.length;
    if (!seoCats.includes(portableCats[portableIndex]) && seoCats.length < 5) {
      seoCats.push(portableCats[portableIndex]);
    }
  } else if (text.includes('game console') || text.includes('game consoles')) {
    if (!seoCats.includes('game-console') && seoCats.length < 5) {
      seoCats.push('game-console');
    }
  } else if (text.includes('handheld game') || text.includes('handheld games')) {
    const gameCats = ['handheld-games', 'retro-handheld-games', 'handheld-retro-games'];
    const gameIndex = hash % gameCats.length;
    if (!seoCats.includes(gameCats[gameIndex]) && seoCats.length < 5) {
      seoCats.push(gameCats[gameIndex]);
    }
  }
  
  // Minimum 2 kategori garantile
  if (seoCats.length < 2) {
    const fallbackCats = ['retro-handheld-game-console', 'handheld-retro-game-console', 'retro-game-handheld'];
    const fallbackIndex = hash % fallbackCats.length;
    if (!seoCats.includes(fallbackCats[fallbackIndex])) {
      seoCats.push(fallbackCats[fallbackIndex]);
    }
  }
  
  return seoCats.slice(0, 5); // Maksimum 5 kategori
}

function extractFeatures(text) {
  const features = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  sentences.forEach(sentence => {
    if (sentence.includes('inch') || sentence.includes('screen') || sentence.includes('display')) {
      features.push(sentence.trim());
    } else if (sentence.includes('battery') || sentence.includes('mAh')) {
      features.push(sentence.trim());
    } else if (sentence.includes('game') && (sentence.includes('preload') || sentence.includes('built-in') || sentence.includes('included'))) {
      features.push(sentence.trim());
    }
  });
  
  return features.slice(0, 5);
}

function formatProductTitle(title, brand, description, about) {
  // Marka'yı temizle
  let cleanBrand = brand || '';
  cleanBrand = cleanBrand.replace(/^Visit the /i, '').replace(/ Store$/i, '').trim();
  
  // Marka geçersizse title'dan çıkarmaya çalış
  if (!cleanBrand || cleanBrand.length > 50 || cleanBrand.match(/^\d+\.?\d*/) || cleanBrand.toLowerCase().includes('hours') || cleanBrand.toLowerCase().includes('charged')) {
    const fullText = `${title} ${description} ${about}`;
    
    // Bilinen markalar
    const knownBrands = [
      'Anbernic', 'Kinhank', 'Retroid', 'Miyoo', 'Steam', 'Nintendo', 'Sony', 'Valve', 
      'AYANEO', 'GPD', 'Lenovo', 'ASUS', 'Logitech', 'Razer', 'ASUS ROG', 'OnePro',
      'My Arcade', 'Saker', 'RegiisJoy', 'Doriteney', 'Actualia', 'OYDL', 'ConsoleXpress',
      'INLAND', 'Epic Games', 'EraVortx', 'GiipGoop', 'Thumbs Up', 'abxylute', 'Aivuidbs',
      'Forlarme', 'TaddToy', 'LUHYAUAN', 'SNONBROS', 'Cheffun'
    ];
    
    // Önce bilinen markalardan ara
    for (const knownBrand of knownBrands) {
      if (fullText.toLowerCase().includes(knownBrand.toLowerCase())) {
        cleanBrand = knownBrand;
        break;
      }
    }
    
    // Bulunamazsa ilk kelimeleri al
    if (!cleanBrand || cleanBrand.length > 50) {
      const brandMatch = fullText.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
      if (brandMatch && brandMatch[1].length < 30) {
        cleanBrand = brandMatch[1];
      } else {
        cleanBrand = 'Generic';
      }
    }
  }
  
  // Model numarasını çıkar (RG35XX, K36, K56, R40, vb.)
  const modelPatterns = [
    /RG\s*(\d+[A-Z]*)/i,           // RG35XX, RG505, RG40XX
    /K\s*(\d+)/i,                   // K36, K56
    /R\s*(\d+[A-Z]*)/i,             // R40, R36H
    /\bR(\d+[A-Z]*)\b/i,            // R40, R36H (kelime sınırı ile)
    /(\d+)\s*Bit/i,                 // 16 Bit
    /Pocket\s*(\d+)/i,              // Pocket 2, Pocket 3
    /Odin\s*(\d+)/i,                // Odin 2
    /WIN\s*(\d+)/i,                 // WIN600
    /PSP/i,                         // PSP
    /Switch/i,                      // Switch
    /3DS/i,                         // 3DS
    /2DS/i,                         // 2DS
  ];
  
  let model = '';
  const fullText = `${title} ${description} ${about}`;
  
  for (const pattern of modelPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      if (pattern.source.includes('RG')) {
        model = `RG${match[1]}`;
      } else if (pattern.source.includes('K\\s*\\d')) {
        model = `K${match[1]}`;
      } else if (pattern.source.includes('R\\s*\\d') || pattern.source.includes('\\bR(\\d')) {
        model = `R${match[1]}`;
      } else {
        model = match[0];
      }
      break;
    }
  }
  
  // En öne çıkan özelliği çıkar (öncelik: ekran > Android > Games > GB > mAh)
  let topFeature = '';
  
  // 1. Ekran boyutu (en önemli)
  const screenMatch = fullText.match(/(\d+\.?\d*)\s*inch\s*(?:IPS|OLED|LCD|AM\s*OLED)?\s*(?:Touch\s*)?Screen/i);
  if (screenMatch) {
    const screenType = fullText.match(/IPS|OLED|LCD|AM\s*OLED|Touch/i)?.[0] || '';
    topFeature = `${screenMatch[1]} Inch ${screenType ? screenType + ' ' : ''}Screen`;
  } else {
    // Sadece inch varsa
    const inchMatch = fullText.match(/(\d+\.?\d*)\s*inch/i);
    if (inchMatch) {
      topFeature = `${inchMatch[1]} Inch Screen`;
    }
  }
  
  // 2. Android versiyonu
  if (!topFeature) {
    const androidMatch = fullText.match(/Android\s*(\d+\.?\d*)/i);
    if (androidMatch) {
      topFeature = `Android ${androidMatch[1]}`;
    }
  }
  
  // 3. Oyun sayısı (sadece çok yüksekse)
  if (!topFeature) {
    const gamesMatch = fullText.match(/(\d{4,})\+?\s*Games/i);
    if (gamesMatch && parseInt(gamesMatch[1]) >= 1000) {
      topFeature = `${gamesMatch[1]}+ Games`;
    }
  }
  
  // 4. Storage (64GB, 128GB, vb.)
  if (!topFeature) {
    const storageMatch = fullText.match(/(\d+)\s*GB\s*(?:RAM|ROM|Storage|TF|Card)?/i);
    if (storageMatch) {
      topFeature = `${storageMatch[1]}GB`;
    }
  }
  
  // 5. Battery (son çare)
  if (!topFeature) {
    const batteryMatch = fullText.match(/(\d{4,})\s*mAh/i);
    if (batteryMatch) {
      topFeature = `${batteryMatch[1]}mAh Battery`;
    }
  }
  
  // Başlığı oluştur: Marka + Model + Özellik + Retro Game Handheld
  const parts = [cleanBrand];
  
  if (model) {
    parts.push(model);
  }
  
  if (topFeature) {
    parts.push(topFeature);
  }
  
  parts.push('Retro Game Handheld');
  
  return parts.join(' ');
}

// Tüm CSV dosyalarını oku ve parse et
const allProducts = [];
const seenAsins = new Set();

csvFiles.forEach(fileName => {
  const filePath = path.join(csvDir, fileName);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const products = parseCSV(content);
      
      products.forEach(product => {
        if (!seenAsins.has(product.asin)) {
          seenAsins.add(product.asin);
          allProducts.push(product);
        }
      });
      
      console.log(`Parsed ${products.length} products from ${fileName}`);
    } catch (error) {
      console.error(`Error parsing ${fileName}:`, error.message);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

// Kategorilere göre grupla
const categories = {};
const seoCategories = {};

// Önce tüm SEO kategorilerini initialize et
allSEOCategories.forEach(cat => {
  seoCategories[cat] = [];
});

allProducts.forEach(product => {
  // Ana kategori
  if (!categories[product.category]) {
    categories[product.category] = [];
  }
  categories[product.category].push(product);
  
  // SEO kategorileri
  if (product.seoCategories && product.seoCategories.length > 0) {
    product.seoCategories.forEach(seoCat => {
      if (!seoCategories[seoCat]) {
        seoCategories[seoCat] = [];
      }
      seoCategories[seoCat].push(product);
    });
  }
});

// SEO kategorilerine dengeli dağıtım - her kategoriye minimum ürün garantile
const allSEOCategoriesList = [
  'retro-handheld-game-console',
  'handheld-retro-game-console',
  'retro-game-handheld',
  'best-handheld-retro-game-console',
  'retro-game-handheld-console',
  'retro-handheld-game',
  'handheld-game-console-retro',
  'best-retro-handheld-game-console',
  'retro-game-console-handheld',
  'retro-game-handhelds',
  'retro-gamer-handheld',
  'retro-games-handheld',
  'handheld-retro-games',
  'retro-handheld-games',
  'handheld-games',
  'best-handheld-games',
  'game-console',
  'portable-handheld',
  'portable-handheld-games',
];

const minProductsPerCategory = Math.max(3, Math.floor(allProducts.length / allSEOCategoriesList.length));
const maxProductsPerCategory = Math.ceil(allProducts.length / allSEOCategoriesList.length * 2);

// Eğer bir kategoride çok az ürün varsa, rastgele ürünler ekle
allSEOCategoriesList.forEach(cat => {
  if (!seoCategories[cat]) {
    seoCategories[cat] = [];
  }
  
  if (seoCategories[cat].length < minProductsPerCategory) {
    const needed = minProductsPerCategory - seoCategories[cat].length;
    const usedAsins = new Set(seoCategories[cat].map(p => p.asin));
    const availableProducts = allProducts.filter(p => !usedAsins.has(p.asin));
    
    // Rastgele ama deterministik seçim (kategori adına göre)
    const catHash = cat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...availableProducts].sort((a, b) => {
      const hashA = (a.asin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + catHash) % 1000;
      const hashB = (b.asin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + catHash) % 1000;
      return hashA - hashB;
    });
    
    seoCategories[cat].push(...shuffled.slice(0, needed));
  }
  
  // Eğer bir kategoride çok fazla ürün varsa, bazılarını çıkar
  if (seoCategories[cat].length > maxProductsPerCategory) {
    const catHash = cat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...seoCategories[cat]].sort((a, b) => {
      const hashA = (a.asin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + catHash) % 1000;
      const hashB = (b.asin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + catHash) % 1000;
      return hashA - hashB;
    });
    seoCategories[cat] = shuffled.slice(0, maxProductsPerCategory);
  }
});

// Output dizinini oluştur
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// JSON dosyasına yaz
const output = {
  products: allProducts,
  categories: categories,
  seoCategories: seoCategories,
  totalProducts: allProducts.length,
  lastUpdated: new Date().toISOString()
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log(`\n✅ Successfully parsed ${allProducts.length} unique products`);
console.log(`📁 Output written to: ${outputFile}`);
console.log(`\n📊 Main Categories:`);
Object.keys(categories).forEach(cat => {
  console.log(`  - ${cat}: ${categories[cat].length} products`);
});
console.log(`\n📊 SEO Categories:`);
Object.keys(seoCategories).forEach(cat => {
  console.log(`  - ${cat}: ${seoCategories[cat].length} products`);
});

