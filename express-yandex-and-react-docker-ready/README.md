# ГОТОВАЯ РЕАЛИЗАЦИЯ АУТЕНТИФИКАЦИИ ЧЕРЕЗ ЯНДЕКС

## стек

- client: React
- server: ExpressJs + JWT (в localStorage)
- docker для запуска

### Как запускать

Для продакшена

```bash
docker-compose up --build
```

Для разработки

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Для разработки без Docker - отдельно вручную:

- client: npm run dev
- server: npm run dev
