-- MATERIALES
CREATE TABLE IF NOT EXISTS materials (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  description TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'loaned')),
  created_at  TIMESTAMP DEFAULT NOW()
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

