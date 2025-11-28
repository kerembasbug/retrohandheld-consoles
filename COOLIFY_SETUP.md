# Coolify Deployment Setup

## Environment Variables

Coolify'a aşağıdaki environment variables'ları ekleyin:

### 1. Coolify Panel'e Gidin
- Hata veren projenin içine girin
- Menüden **"Environment Variables"** sekmesine tıklayın

### 2. Environment Variables Ekle

Aşağıdaki değişkenleri ekleyin:

```
AMAZON_PARTNER_TAG=your-tag-20
AMAZON_ACCESS_KEY=AKPADGRLO31764065866
AMAZON_SECRET_KEY=/JcoCfU6YsxnCV6WwRb0nIZhPN71kd7kscnFPUIl
```

### 3. Next.js için Önemli!

- Eklediğiniz değişkenlerin yanında **"Build Variable"** kutucuğunu işaretleyin
- Next.js build alırken bu verileri görmek ister

### 4. Bulk Edit (Toplu Ekleme)

Tüm değişkenleri tek tek eklemek yerine:
- **"Bulk Edit"** butonuna tıklayın
- Aşağıdaki formatı kullanın:

```
AMAZON_PARTNER_TAG=your-tag-20
AMAZON_ACCESS_KEY=AKPADGRLO31764065866
AMAZON_SECRET_KEY=/JcoCfU6YsxnCV6WwRb0nIZhPN71kd7kscnFPUIl
```

### 5. Kaydet ve Deploy

1. **"Save"** butonuna basın
2. Sağ üstten tekrar **"Deploy"** butonuna basın

## Build Komutu Kontrolü

Eğer hala hata alıyorsanız, `package.json` dosyasındaki build komutunu kontrol edin:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

## Hata Mesajı

Eğer hata mesajını paylaşırsanız, daha spesifik yardım edebilirim.
