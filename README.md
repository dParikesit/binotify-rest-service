# BINOTIFY REST SERVICE

Aplikasi ini dibuat untuk pemenuhan Tugas Besar 2 IF3110 Web Based Development tahun 2022/2023.
Aplikasi ini digunakan sebagai REST API endpoint untuk Premium App.

## Requirement
- Docker-compose 3.9
- NPM / Yarn

## Installation
1. Install docker dan docker-compose pada komputer. Panduan instalasi docker dan docker compose pada repo binotify-config
2. Clone repository dan masuk ke folder
```
git clone https://gitlab.informatika.org/if3110-2022-k01-02-20/binotify-rest-service.git
cd binotify-rest-service
```

#### Development
```
# create .env file based on .env.example
yarn install
yarn dev
# endpoint started in http://localhost:3002
```

#### Database
```
"Users"
id SERIAL PK
email VARCHAR(256) NOT NULL UNIQUE
password VARCHAR(256) NOT NULL
username VARCHAR(256) NOT NULL UNIQUE
name VARCHAR(256) NOT NULL
isAdmin BOOLEAN NOT NULL DEFAULT FALSE

"Songs"
song_id UUID PK NOT NULL DEFAULT uuid_generate_v4()
judul VARCHAR(64) NOT NULL
penyanyi_id INTEGER NOT NULL REFERENCES "Users" (id) ON UPDATE CASCADE on DELETE SET NULL
audio_path VARCHAR(256)
```

## Endpoint
```
URL : `http://localhost:3002/`
# User
POST /api/register
POST /api/login
GET /api/listpenyanyi

# Song
POST /api/song/create
GET /api/songs
GET /api/song/:song_id
PUT /api/song/update/:song_id
POST /api/song/delete/:song_id
GET /api/songs/penyanyi/:penyanyi_id
GET /api/song/:song_id/penyanyi/:penyanyi_id

# Subscription
POST /api/subs/new
GET /api/subs/get/:creator_id/:subscriber_id
GET /api/subs/get/:creator_id/:subscriber_id
GET /api/subs/getbatch/:subscriber_id
GET /api/subs/pending
PUT /api/subs/accept
PUT /api/subs/reject
```

## Pembagian Kerja

### Backend Binotify Premium
Feature | NIM
--- | ---
Database ORM | 13520058
Authentikasi | 13520058
JWT | 13520058
Routes | 13520058
CRUD Lagu Premium & Upload | 13520058 13520057
List Penyanyi | 13520058, 13520057
List Lagu Penyanyi | 13520058
Subscription | 13520087
```
P.S : NIM Pertama pada tabel merupakan penanggung jawab serta pembuat fitur utama
```

## Bagian Bonus
- Caching (13520058, 13520057)
- Docker (13520087)

## Author
NIM | NAMA
--- | ---
13520057 | Marcellus Michael Herman Kahari
13520058 | Kristo Abdi Wiguna
13520087 | Dimas Shidqi Parikesit