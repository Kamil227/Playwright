# Demo Bank Playwright + TypeScript

Projekt startowy do nauki automatyzacji na stronie:
`https://demo-bank.vercel.app/index.html`

## Struktura

- `tests/` - tutaj dodajesz testy
- `pages/` - Page Object Model
- `test_data/` - dane testowe
- `playwright.config.ts` - konfiguracja Playwright

## Komendy

- `npm test` - uruchom testy
- `npm run test:headed` - uruchom testy z oknem przeglądarki
- `npm run test:ui` - Playwright UI mode
- `npm run test:debug` - debug krok po kroku
- `npm run report` - otwórz raport HTML
- `npm run codegen` - generator kroków Playwright
- `npm run typecheck` - sprawdzenie typów TypeScript

## Pierwszy krok

1. Utwórz plik `tests/login.spec.ts`.
2. Użyj `LoginPage` z `pages/login.page.ts`.
3. Uzupełnij `test_data/login.data.ts` poprawnymi danymi.
