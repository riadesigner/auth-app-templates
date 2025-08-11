# Этап 1: Установка зависимостей (максимальное кэширование)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Этап 2: Сборка приложения
FROM deps AS builder
COPY . .
RUN npm run build

# Этап 3: Production-образ
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
