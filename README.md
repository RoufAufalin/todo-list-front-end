# Todo Dashboard (React + Vite + Tailwind)

Frontend sederhana untuk API Todo Anda dengan fitur:

- Register: `POST /users/register`
- Login: `POST /users/login`
- Add todo: `POST /todos/add`
- Read semua todo: `GET /todos/`
- Update todo: `PUT /todos/:id`
- Delete todo: `DELETE /todo/delete/:id`

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 3

## Arsitektur

Struktur source sudah dimodularisasi agar scalable dan maintainable:

- `src/api/`: akses HTTP dan service API per domain (`authApi`, `todoApi`)
- `src/config/`: konstanta aplikasi (route, storage key, opsi UI)
- `src/hooks/`: business logic terpusat di `useTodoApp`
- `src/utils/`: helper murni (parser response, formatter, util todo, storage)
- `src/components/`: komponen UI kecil per domain (`layout`, `auth`, `status`, `todo`)
- `src/App.jsx`: komposisi halaman saja (tanpa logic bisnis berat)

## Jalankan Project

```bash
npm install
npm run dev
```

Buka URL dev server (default `http://localhost:5173`).

## Jalankan Dengan Docker

Pastikan Docker Desktop sudah aktif, lalu dari root project jalankan:

```bash
docker compose up --build
```

Setelah container jalan, buka:

`http://localhost:5173`

Untuk stop:

```bash
docker compose down
```

## Cara Pakai

1. Isi `Base URL API` (contoh: `http://localhost:3000`).
2. Register user (email + password).
3. Login untuk menyimpan token.
4. Kelola todo: tambah, update, hapus, dan refresh.

## Catatan Integrasi

- Token disimpan di `localStorage` dan dikirim sebagai header `Authorization: Bearer <token>`.
- Payload auth memakai `email` dan `password`.
- Payload todo mengikuti model: `task`, `isCompleted`, `createdAt`, `priority`.
- Jika format response backend berbeda, sesuaikan helper parsing di `src/utils/responseParsers.js`:
  - `extractToken`
  - `extractTodos`
  - util todo di `src/utils/todo.js`
