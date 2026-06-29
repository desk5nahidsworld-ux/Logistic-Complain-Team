# Logistic Complain Team - E-Commerce Management System

## প্রজেক্ট বিবরণ
এটি একটি সম্পূর্ণ ই-কমার্স এবং লজিস্টিক ম্যানেজমেন্ট সিস্টেম যেখানে:
- ✅ প্রোডাক্ট ম্যানেজমেন্ট (SKU সহ)
- ✅ ইউজার ম্যানেজমেন্ট
- ✅ অর্ডার ক্রিয়েশন এবং ম্যানেজমেন্ট
- ✅ স্ট্যাটাস ট্র্যাকিং
- ✅ ইনভয়েস জেনারেশন
- ✅ অটোমেটিক প্রাইস ক্যালকুলেশন

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
npm run dev
```

### Frontend Setup
সরাসরি `frontend/` ফোল্ডার থেকে HTML ফাইল খুলুন।

## প্রধান ফিচার সম্পূর্ণ তালিকা

### 1. **ল্যান্ডিং পেজ** 
- প্রফেশনাল হোম পেজ
- ফিচার শোকেস

### 2. **ইউজার ম্যানেজমেন্ট**
- রেজিস্ট্রেশন
- লগইন/লগআউট
- প্রোফাইল আপডেট
- JWT অথেন্টিকেশন

### 3. **প্রোডাক্ট ম্যানেজমেন্ট**
- প্রোডাক্ট ক্রিয়েশন
- SKU ম্যানেজমেন্ট
- মাল্টিপল ইমেজ আপলোড
- ক্যাটাগরি ম্যানেজমেন্ট

### 4. **অর্ডার ম্যানেজমেন্ট**
- অর্ডার ক্রিয়েশন
- প্রোডাক্ট সিলেকশন
- অটোমেটিক প্রাইস ক্যালকুলেশন
- সিরিয়াল নম্বর জেনারেশন

### 5. **অর্ডার ট্র্যাকিং**
- স্ট্যাটাস আপডেট (pending → processing → shipped → delivered)
- স্ট্যাটাস হিস্টরি
- নোট্স যোগ করা

### 6. **ইনভয়েস সিস্টেম**
- অটোমেটিক ইনভয়েস জেনারেশন
- কাস্টমার ডিটেইলস
- আইটেম ব্রেকডাউন
- টোটাল ক্যালকুলেশন

## API এন্ডপয়েন্টস

- `POST /api/auth/register` - নতুন ইউজার রেজিস্টার করুন
- `POST /api/auth/login` - লগইন করুন
- `POST /api/products/create` - প্রোডাক্ট তৈরি করুন
- `GET /api/products/all` - সব প্রোডাক্ট দেখুন
- `POST /api/orders/create` - অর্ডার তৈরি করুন
- `GET /api/orders/all` - সব অর্ডার দেখুন
- `PUT /api/orders/:orderId/status` - অর্ডার স্ট্যাটাস আপডেট করুন
- `POST /api/invoices/create/:orderId` - ইনভয়েস তৈরি করুন
- `GET /api/invoices/:invoiceId` - ইনভয়েস দেখুন

## ডাটাবেস মডেলস

### User
- fullName, email, phone, password
- address (street, city, state, zipCode, country)
- role (customer, admin, manager)
- profileImage, isActive

### Product
- name, sku (unique), description
- price, quantity, category
- images (array with filename, url, uploadedAt)
- createdBy (reference to User)

### Order
- orderNumber (unique), customer (reference to User)
- items (array: product, quantity, price, subtotal)
- totalAmount, status
- shippingAddress, statusHistory

### Invoice
- invoiceNumber, order (reference to Order)
- customer details, items, totals
- paymentStatus, issuedAt, dueDate

## স্ট্যাটাস এবং অবস্থা
- **Order Status:** pending, processing, shipped, delivered, cancelled
- **Payment Status:** pending, paid, failed

## ডেভেলপমেন্ট গাইড

### ফোল্ডার স্ট্রাকচার
```
Logistic-Complain-Team/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   └── orders.html
└── README.md
```

## নোট
- MongoDB সংযোগের জন্য `.env` ফাইল কনফিগার করুন
- JWT_SECRET একটি শক্তিশালী কী নির্ধারণ করুন
- `uploads/` ফোল্ডার ম্যানুয়ালি তৈরি করুন

---

**প্রজেক্ট স্ট্যাটাস:** 🚀 প্রোডাকশন রেডি
