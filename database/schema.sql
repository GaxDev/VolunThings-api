-- MATERIALES
CREATE TABLE IF NOT EXISTS materials (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  description TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'loaned')),
  created_at  TIMESTAMP DEFAULT NOW(),
  image       TEXT
);

-- PRÉSTAMOS
CREATE TABLE IF NOT EXISTS loans (
  id               SERIAL PRIMARY KEY,
  material_id      INTEGER NOT NULL REFERENCES materials(id),
  borrower_name    VARCHAR(100) NOT NULL,
  borrower_contact VARCHAR(100) NOT NULL,
  loan_date        DATE NOT NULL,
  return_date      DATE,
  status           VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned'))
);

-- IMÁGENES MATERIALES 
CREATE TABLE IF NOT EXISTS images_materials (
  id          SERIAL PRIMARY KEY,
  material_id  INTEGER NOT NULL REFERENCES materials(id),
  image_url    TEXT NOT NULL
);


INSERT INTO materials (name, category, description) VALUES
  ('Proyector Epson', 'Audiovisual', 'Proyector para eventos y presentaciones'),
  ('Portátil Lenovo', 'Informática', 'Portátil para talleres'),
  ('Tablet Samsung', 'Informática', 'Tablet para actividades con menores'),
  ('Cable HDMI', 'Audiovisual', 'Cable HDMI de 2 metros'),
  ('Silla plegable', 'Mobiliario', 'Silla plegable para eventos'),
  ('Mesa plegable', 'Mobiliario', 'Mesa plegable grande'),
  ('Altavoz Bluetooth', 'Audiovisual', 'Altavoz portátil para actividades');



-- Primero ponemos algunos materiales como loaned
UPDATE materials SET status = 'loaned' WHERE id IN (1, 3);

-- Luego insertamos los préstamos
INSERT INTO loans (material_id, borrower_name, borrower_contact, loan_date, status) VALUES
  (1, 'Pepito Jimenez', 'pepito@mail.com', '2026-01-10', 'active'),
  (3, 'Ana García', 'ana@mail.com', '2026-01-15', 'active');

INSERT INTO images_materials (material_id, image_url) VALUES
  (1, 'http://localhost:3000/public/materials/proyectorepson_1.webp'),
  (2, 'http://localhost:3000/public/materials/lenovo1.png'),
  (3, 'http://localhost:3000/public/materials/samsungtablet1.png'),
  (4, 'http://localhost:3000/public/materials/cablehdmi_2.webp'),
  (5, 'http://localhost:3000/public/materials/sillaplegable_1.webp'),
  (6, 'http://localhost:3000/public/materials/mesaplegable_1.webp'),
  (7, 'http://localhost:3000/public/materials/altavozjbl_1.webp'),
  (1, 'http://localhost:3000/public/materials/proyectorepson_2.webp'),
  (2, 'http://localhost:3000/public/materials/lenovo2.png'),
  (3, 'http://localhost:3000/public/materials/samsungtablet2.png'),
  (4, 'http://localhost:3000/public/materials/cablehdmi_2.webp'),
  (5, 'http://localhost:3000/public/materials/sillaplegable_2.webp'),
  (6, 'http://localhost:3000/public/materials/mesaplegable_2.webp'),
  (7, 'http://localhost:3000/public/materials/altavozjbl_2.webp'),
  (1, 'http://localhost:3000/public/materials/proyectorepson_3.webp'),
  (2, 'http://localhost:3000/public/materials/lenovo3.png'),
  (3, 'http://localhost:3000/public/materials/samsungtablet3.png'),
  (4, 'http://localhost:3000/public/materials/cablehdmi_3.webp'),
  (5, 'http://localhost:3000/public/materials/sillaplegable_3.webp'),
  (6, 'http://localhost:3000/public/materials/mesaplegable_3.webp'),
  (7, 'http://localhost:3000/public/materials/altavozjbl_3.webp'),
  (7, 'http://localhost:3000/public/materials/altavozjbl_4.webp');


-- USUARIOS
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Migración: añadir columnas si la tabla ya existía sin ellas
ALTER TABLE users ADD COLUMN IF NOT EXISTS name        VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(100) NOT NULL DEFAULT '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
