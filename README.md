# Logistic Complain Team - E-Commerce Management System

## প্রজেক্ট বিবরণ
এটি একটি সম্পূর্ণ ই-কমার্স এবং লজিস্টিক ম্যানেজমেন্ট সিস্টেম যেখানে:
- প্রোডাক্ট ম্যানেজমেন্ট (SKU সহ)
- ইউজার ম্যানেজমেন্ট
- অর্ডার ক্রিয়েশন এবং ম্যানেজমেন্ট
- স্ট্যাটাস ট্র্যাকিং
- ইনভয়েস জেনারেশন

## প্রযুক্তি স্ট্যাক
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Upload:** Multer
- **Authentication:** JWT

## ইনস্টলেশন এবং সেটআপ

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# .env ফাইলে MongoDB URI এবং JWT_SECRET যোগ করুন
npm run dev
```

### Frontend Setup
সরাসরি `frontend/` ফোল্ডার থেকে HTML ফাইল খুলুন অথবা live server ব্যবহার করুন।

## প্রধান ফিচার
✅ ল্যান্ডিং পেজ
✅ ইউজার রেজিস্ট্রেশন এবং লগইন
✅ প্রোডাক্ট ক্রিয়েশন (ইমেজ আপলোড সহ)
✅ অর্ডার ম্যানেজমেন্ট
✅ স্ট্যাটাস ট্র্যাকিং
✅ ইনভয়েস জেনারেশন
✅ অটোমেটিক প্রাইস ক্যালকুলেশন
