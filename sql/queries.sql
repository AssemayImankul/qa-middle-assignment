-- ============================================================
-- Схема 
-- Users    (id, name, email, created_at)
-- Rooms    (id, type, price_per_night)
-- Bookings (id, user_id, room_id, checkin, checkout, status, created_at)
-- status: 'pending' | 'confirmed' | 'cancelled'
-- ============================================================


-- 1. Наблюдение: поиск "мёртвых" аккаунтов
SELECT u.*
FROM users u
LEFT JOIN bookings b ON b.user_id = u.id
WHERE b.id IS NULL;


-- 2. Наблюдение: критичный баг, при котором комнату продали двум гостям одновременно
SELECT b1.room_id, b1.id, b2.id
FROM bookings b1
JOIN bookings b2
  ON b1.room_id = b2.room_id
 AND b1.id < b2.id
 AND b1.checkin < b2.checkout
 AND b2.checkin < b1.checkout
WHERE b1.status <> 'cancelled'
  AND b2.status <> 'cancelled';


-- 3. Наблюдение: топ-3 самых востребованных комнаты за период 
SELECT room_id, COUNT(*) AS cnt
FROM bookings
WHERE status = 'confirmed'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY room_id
ORDER BY cnt DESC
LIMIT 3;


-- 4. Наблюдение: ищем "зависшие" брони, которые подтвердились давно и дата заезда прошла,
-- но статус не поменялся 
SELECT *
FROM bookings
WHERE status = 'confirmed'
  AND created_at < NOW() - INTERVAL '7 days'
  AND checkin < NOW();


-- 5. Наблюдение: считаем, подтверждённые брони на каждый тип комнаты
SELECT r.type, COUNT(*) AS cnt
FROM bookings b
JOIN rooms r ON r.id = b.room_id
WHERE b.status = 'confirmed'
GROUP BY r.type;
