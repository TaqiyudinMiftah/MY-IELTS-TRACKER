# Ì∫Ä Deployment Guide - Deploy ke Vercel

## Kenapa Vercel?
- ‚úÖ Gratis untuk personal projects
- ‚úÖ Otomatis optimize Next.js
- ‚úÖ Deploy dalam hitungan menit
- ‚úÖ Automatic HTTPS
- ‚úÖ Global CDN

---

## Ì≥ã Checklist Sebelum Deploy

```markdown
- [x] Project sudah build tanpa error (`npm run build`)
- [x] Database Supabase sudah setup
- [x] File .env.local sudah ada
- [ ] Git repository sudah dibuat
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel
```

---

## Ì¥ß Step-by-Step Deployment

### Step 1: Setup Git Repository

```bash
# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - IELTS Tracker Phase 2 complete"
```

### Step 2: Push ke GitHub

1. **Buka GitHub** (https://github.com)
2. **Login** ke akun Anda
3. Klik tombol **"New"** atau **"+"** ‚Üí **"New repository"**
4. Isi:
   - Repository name: `my-ielts-tracker`
   - Description: `Gamified IELTS study tracker with XP system`
   - Public atau Private: **Pilih sesuai keinginan**
   - **JANGAN** centang "Initialize with README"
5. Klik **"Create repository"**

6. **Copy perintah** yang muncul dan jalankan di terminal:

```bash
git remote add origin https://github.com/USERNAME/my-ielts-tracker.git
git branch -M main
git push -u origin main
```

*(Ganti `USERNAME` dengan username GitHub Anda)*

---

### Step 3: Deploy ke Vercel

#### A. Via Website (Cara Termudah)

1. **Buka** https://vercel.com
2. **Sign up** atau **Login** (bisa pakai GitHub account)
3. Klik **"Add New..."** ‚Üí **"Project"**
4. Klik **"Import Git Repository"**
5. Pilih repository **`my-ielts-tracker`**
6. Klik **"Import"**

#### B. Configure Project

Vercel akan auto-detect Next.js. Pastikan:
- **Framework Preset**: Next.js ‚úÖ
- **Build Command**: `next build` ‚úÖ
- **Output Directory**: `.next` ‚úÖ
- **Install Command**: `npm install` ‚úÖ

#### C. Add Environment Variables

**PENTING!** Tambahkan environment variables:

1. Scroll ke **"Environment Variables"**
2. Tambahkan 2 variables ini:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://czugargoawrpnofidffe.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dWdhcmdvYXdycG5vZmlkZmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTM3NTgsImV4cCI6MjA4MDkyOTc1OH0.if1iB2c3gcFR9B_1INooknEkBNrTLOz6gj73LaQGvs8
```

3. Klik **"Deploy"**

---

### Step 4: Tunggu Deploy Selesai

- Proses deploy ¬±2-3 menit
- Anda akan melihat progress build
- Setelah selesai, muncul **"Congratulations!"** Ìæâ

---

## Ìºê Akses Aplikasi Anda

Setelah deploy berhasil, Anda akan dapat:

**URL Production**: `https://my-ielts-tracker.vercel.app`

*(URL bisa berbeda tergantung availability)*

---

## ‚úÖ Verifikasi Deployment

1. **Buka URL** yang diberikan Vercel
2. **Test Signup** dengan email baru
3. **Test Login**
4. **Test semua fitur**:
   - Add task
   - Complete task (dapat XP)
   - Add vocabulary
   - Add mock test
   - Check badges

---

## Ì¥Ñ Update Deployment

Setiap kali Anda push changes ke GitHub, Vercel **otomatis deploy ulang**!

```bash
# Setelah edit code
git add .
git commit -m "Add new feature"
git push

# Vercel auto-deploy dalam 2-3 menit
```

---

## Ìæ® Custom Domain (Optional)

Jika Anda punya domain sendiri:

1. Buka Vercel dashboard
2. Pilih project **my-ielts-tracker**
3. Klik **"Settings"** ‚Üí **"Domains"**
4. Tambah domain Anda
5. Update DNS records sesuai instruksi Vercel

---

## Ì∞õ Troubleshooting

### Build Error

**Error**: `Module not found` atau `Type error`

**Solution**:
```bash
# Test build locally dulu
npm run build

# Jika ada error, fix dulu sebelum push
```

### Environment Variables Not Working

**Error**: Aplikasi tidak bisa connect ke Supabase

**Solution**:
1. Buka Vercel dashboard ‚Üí Project ‚Üí **Settings** ‚Üí **Environment Variables**
2. Cek kedua env vars sudah ada
3. Klik **"Redeploy"**

### 404 Error on Routes

**Error**: Halaman tidak ditemukan

**Solution**: 
- Pastikan file structure benar
- Redeploy dari Vercel dashboard

---

## Ì≥± Share Aplikasi

Sekarang Anda bisa share URL ke siapa saja:
- Teman
- Family
- Study partner

Mereka bisa signup dan pakai aplikasi dari device apapun!

---

## Ì¥í Security Tips

1. **Jangan commit .env.local** ke Git (sudah di .gitignore)
2. **Supabase RLS policies** sudah aktif (data user aman)
3. **HTTPS otomatis** dari Vercel

---

## Ì≤° Next Steps

Setelah deploy:
1. ‚úÖ Test semua fitur di production
2. ‚úÖ Share dengan teman untuk testing
3. ‚úÖ Monitor Vercel analytics
4. ‚úÖ Continue ke Phase 3 development

---

**Deployment Time**: ~5-10 menit
**Cost**: FREE (Vercel free tier)
**Status**: Production ready! Ì∫Ä
