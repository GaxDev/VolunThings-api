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


