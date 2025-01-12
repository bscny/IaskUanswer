# Kataohoot

一個互動式學習平台，結合遊戲化測驗來提升學習效果，靈感來自 Kahoot!

## 主要功能

- 使用者創建、管理資料夾
- 於資料夾內創建、管理問題集
- 每個問題集內可存放選擇題與是非題
- 遊玩他人創造出的公開問題集或自己的問題集
- 查看遊玩歷史紀錄與錯誤之題目

## ER Model

![kataohoot ER Model](https://github.com/bscny/Kataohoot/blob/hotfix_readme/project-assets/pdfs/kataohoo-ER-Model.pdf)

## Table Schema (含 Redis)

![kataohoot Table Schema](https://github.com/bscny/Kataohoot/blob/hotfix_readme/project-assets/pdfs/kataohoo-Schema.pdf)

## 檔案結構

```
project
├── backend
│   ├── src
│   │   ├── routes
│   │   │   ├── Account
│   │   │   ├── Library
│   │   │   └── Quizing
│   │   ├── controllers
│   │   │   ├── Account
│   │   │   ├── Library
│   │   │   └── Quizing
│   │   ├── db_services
│   │   │   ├── Account
│   │   │   ├── Library
│   │   │   └── Quizing
│   │   ├── redis_services
│   │   │   └── Quizing
│   │   ├── database.js
│   │   └── redis.js
│   └── app.js
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Home
│   │   │   ├── Quiz
│   │   │   ├── SignInUp
│   │   │   ├── TakeQuiz
│   │   │   └── Library
│   │   ├── router
│   │   │   └── index.js
│   │   ├── services
│   │   │   ├── AccountApi
│   │   │   ├── LibraryApi
│   │   │   └── QuizApi
│   │   ├── stores
│   │   │   └── LibraryStores
│   │   └── views
│   │       ├── Home
│   │       ├── Quiz
│   │       ├── SignInUp
│   │       └── Library
│   ├── App.vue
│   └── main.js
└── migrationDB
    ├── kataohootSchema.sql
    ├── seed.sql
    └── redis_schema.js
```

## Requirements

- `node` v20.17.0
- `mysql` Ver 8.0.40-0ubuntu0.22.04.1 for Linux on x86_64
- `redis` 6.0.16

## 使用說明

1. cd 到 `backend` 資料夾
2. `npm i`
3. `npm run dev`
4. cd 到 `frontend` 資料夾
5. `npm i`
6. `npm run dev`

Hint: 注意，redis 與 mysql service 都要跑起來才能作以上步驟

## Demo Video


