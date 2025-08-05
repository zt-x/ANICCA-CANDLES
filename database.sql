-- Create the purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL UNIQUE,
    buyer_id VARCHAR(255) NOT NULL,
    purchase_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    product_type VARCHAR(50)
);

-- Insert some sample data
INSERT INTO purchases (product_id, buyer_id, product_type) VALUES
('PROD001', 'USER123', 'type_A'),
('PROD002', 'USER456', 'type_B'),
('PROD003', 'USER789', 'type_A');