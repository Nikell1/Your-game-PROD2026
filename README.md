# Архитектура приложения:

Проект построен на основе Feature-Sliced Design (FSD) — методологии архитектуры фронтенд-приложений. Это обеспечивает четкое разделение ответственности, масштабируемость и поддерживаемость кода.

---

## Полная структура проекта:

├───public_original
│   ├───avatars
│   ├───data
│   └───sounds
├───scripts
├───src
│   ├───app
│   │   └───game
│   │       ├───ending
│   │       ├───round
│   │       │   ├───final
│   │       │   └───[id]
│   │       ├───setup
│   │       └───[questionId]
│   ├───app-pages
│   │   ├───final-round
│   │   │   └───ui
│   │   ├───game-ending
│   │   │   └───ui
│   │   ├───game-round
│   │   │   └───ui
│   │   ├───main-menu
│   │   │   └───ui
│   │   ├───question-page
│   │   └───setup-game
│   │       ├───lib
│   │       ├───model
│   │       └───ui
│   ├───entities
│   │   ├───game
│   │   │   ├───lib
│   │   │   └───model
│   │   │       └───slices
│   │   ├───host
│   │   │   ├───lib
│   │   │   ├───model
│   │   │   └───ui
│   │   └───player
│   │       ├───lib
│   │       └───ui
│   ├───features
│   │   ├───answer-question
│   │   │   ├───lib
│   │   │   ├───model
│   │   │   └───ui
│   │   ├───auction
│   │   │   ├───lib
│   │   │   ├───model
│   │   │   └───ui
│   │   ├───cat-in-bag
│   │   │   ├───lib
│   │   │   └───ui
│   │   ├───end-game
│   │   │   └───lib
│   │   ├───exit-game
│   │   │   └───lib
│   │   ├───final-question
│   │   │   └───lib
│   │   ├───final-round
│   │   │   └───lib
│   │   ├───keys-click
│   │   │   └───lib
│   │   ├───manage-user-score
│   │   │   ├───lib
│   │   │   └───ui
│   │   ├───new-round
│   │   │   └───lib
│   │   ├───player-avatar
│   │   │   └───lib
│   │   ├───question-click
│   │   │   └───lib
│   │   ├───return-to-table
│   │   │   └───lib
│   │   ├───sounds
│   │   │   ├───lib
│   │   │   └───model
│   │   └───timer
│   │       └───lib
│   ├───providers
│   ├───shared
│   │   ├───config
│   │   ├───constants
│   │   ├───lib
│   │   ├───model
│   │   └───ui
│   │       ├───backgrounds
│   │       └───vectors
│   └───widgets
│       ├───auction
│       │   └───ui
│       │   └───ui
│       ├───modal
│       │   └───ui
│       │       └───modals
│       │   └───ui
│       ├───modal
│       │   └───ui
│       │       └───modals
│       ├───players-list
│       │   └───ui
│       └───questions-table
│           └───ui

---

# Детальное описание взаимодействия слоев:

app-pages → widgets → features → entities → shared
↑ ↑ ↑ ↑ ↑
└──────────┴─────────┴──────────┴─────────┘

### 1. Слой `app` (Next.js App Router)

**Ответственность:**
- Определение маршрутов
- Получение параметров URL
- Рендеринг соответствующей страницы из `app-pages`

### 2. Слой `app-pages` (композиция страниц)

**Ответственность:**
- Композиция виджетов для конкретной страницы
- Оркестрация данных между виджетами
- Обработка событий страницы

### 3. Слой `widgets` (композиционные блоки)

**Ответственность:**
- Композиция фич в готовые блоки
- Минимальная логика presentation layer
- Передача событий в фичи

### 4. Слой `features` (пользовательские сценарии)

**Ответственность:**
- Реализация конкретного пользовательского сценария
- Взаимодействие с `entities`
- Навигация
- Бизнес-логика сценария

### 5. Слой `entities` (бизнес-сущности)

**Ответственность:**
- Бизнес-логика предметной области
- Типы и интерфейсы
- Store для состояния сущности

### 6. Слой `shared` (переиспользуемый код)

**Ответственность:**
- Переиспользуемые UI компоненты
- Утилиты и хелперы
- Константы, конфиги

### 7. Слой `providers` (провайдеры)

**Ответственность:**
- Глобальные провайдеры состояния
- Контексты (аудио, тема)

---

# Потоки данных в игре

### 1. Начало игры

[app] /game/setup
↓
[app-pages] SetupGamePage
↓
[widgets] PlayerSetupList
↓
[features] usePlayerAvatar, useValidatePlayers
↓
[entities] player/validate-players.ts
↓
[shared] ui/input.tsx, ui/button.tsx
↓
[app] /game/round/1 (редирект после валидации)

### 2. Выбор вопроса

[widgets] QuestionsTable
↓ (клик)
[features] useQuestionClick
↓
[entities] game/question-slice (setCurrentQuestion)

### 3. Ответ на вопрос

[app] /game/[questionId]
↓
[app-pages] QuestionPage
↓
[widgets] CurrentQuestionWidget
↓
[features]
├─→ [features] useKeysClick (захват права ответа)
├─→ [features] useTimer
├─→ [features] useHandleCorrect / useHandleIncorrect
└─→ [entities] game/players-slice (updateScore)
↓
[features] useReturnToTable
↓
[app] /game/round/[id]

### 4. Финальный раунд

[app] /game/round/final
↓
[widgets] FinalRoundWidget
↓
[features] useStartFinal (фильтрация игроков)
↓
[widgets] PlayersBets (секретные ставки)
↓
[features/final-question] useFinalQuestionClick
↓
[widgets] ProcessTable (поочередные ответы)
↓
[features] useEndFinal (подсчет результатов)
↓
[app] /game/ending

## Ключевые паттерны и принципы

1. Композиция через хуки

2. Изоляция бизнес-логики

3. Публичное API через index.ts

4. Строгие правила импортов