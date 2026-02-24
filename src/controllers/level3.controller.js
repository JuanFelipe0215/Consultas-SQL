import pool from "../db.js";

export async function exercise21(req, res) {
    const sql = `
        SELECT
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        u.city,
        o.order_number,
        p.name AS product_name,
        c.name AS category_name,
        op.quantity,
        (op.quantity * (op.price_at_purchase - op.discount)) AS item_subtotal
        FROM orders o
        INNER JOIN users u ON u.id = o.user_id
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        INNER JOIN categories c ON c.id = p.category_id
        ORDER BY o.order_date DESC, o.order_number, product_name;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise22(req, res) {
    const city = (req.query.city ?? "Las Armas").trim();
    const category = (req.query.category ?? "Ropa y Moda").trim();

    const sql = `
        SELECT
        c.name AS category_name,
        u.city,
        COALESCE(SUM(op.quantity * (op.price_at_purchase - op.discount)), 0) AS total_income
        FROM orders o
        INNER JOIN users u ON u.id = o.user_id
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        INNER JOIN categories c ON c.id = p.category_id
        WHERE o.status <> 'cancelled'
        AND u.city = ?
        AND c.name = ?
        GROUP BY c.name, u.city;
    `;
    const [rows] = await pool.query(sql, [city, category]);
    return res.json(rows[0] ?? null);
}


export async function exercise23(req, res) {
    const sql = `
        SELECT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        u.city,
        COALESCE(SUM(o.total), 0) AS total_spent
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE o.status <> 'cancelled'
        GROUP BY u.id
        ORDER BY total_spent DESC
        LIMIT 1;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows[0] ?? null);
}


export async function exercise24(req, res) {
    const sql = `
        SELECT
        p.id,
        p.name,
        p.sale_price,
        p.stock
        FROM products p
        LEFT JOIN order_product op ON op.product_id = p.id
        LEFT JOIN orders o ON o.id = op.order_id AND o.status <> 'cancelled'
        GROUP BY p.id
        HAVING COUNT(o.id) = 0
        ORDER BY p.name;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise25(req, res) {
    const sql = `
        SELECT
        COALESCE(SUM( (op.price_at_purchase - op.discount - p.purchase_price) * op.quantity ), 0) AS total_profit
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE o.status <> 'cancelled';
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows[0] ?? null);
}

export async function exercise26(req, res) {
    const catYes = (req.query.yes ?? "Videojuegos").trim();
    const catNo = (req.query.no ?? "Hogar").trim();

    const sql = `
        SELECT DISTINCT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        u.city
        FROM users u
        WHERE EXISTS (
        SELECT 1
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        INNER JOIN categories c ON c.id = p.category_id
        WHERE o.user_id = u.id
            AND o.status <> 'cancelled'
            AND c.name = ?
        )
        AND NOT EXISTS (
        SELECT 1
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        INNER JOIN categories c ON c.id = p.category_id
        WHERE o.user_id = u.id
            AND o.status <> 'cancelled'
            AND c.name = ?
        )
        ORDER BY user_name;
    `;
    const [rows] = await pool.query(sql, [catYes, catNo]);
    return res.json(rows);
}

export async function exercise27(req, res) {
    const sql = `
        SELECT
        u.city,
        COALESCE(SUM(o.total), 0) AS total_income
        FROM orders o
        INNER JOIN users u ON u.id = o.user_id
        WHERE o.status <> 'cancelled'
        GROUP BY u.city
        ORDER BY total_income DESC
        LIMIT 3;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise28(req, res) {
    const sql = `
        SELECT
        o.id,
        o.order_number,
        o.order_date,
        COUNT(DISTINCT op.product_id) AS unique_products
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        GROUP BY o.id
        ORDER BY unique_products DESC
        LIMIT 1;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows[0] ?? null);
}

export async function exercise29(req, res) {
    const sql = `
        SELECT DISTINCT
        p.id,
        p.name,
        p.sale_price AS current_sale_price,
        op.price_at_purchase AS historical_price
        FROM products p
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        WHERE o.status <> 'cancelled'
        AND op.price_at_purchase < p.sale_price
        ORDER BY p.name;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise30(req, res) {
    const productId = Number(req.query.product_id) || 1;

    const sql = `
        SELECT
        p.id AS product_id,
        p.name AS product_name,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        o.order_date,
        o.order_number,
        op.price_at_purchase,
        op.discount,
        op.quantity
        FROM order_product op
        INNER JOIN orders o ON o.id = op.order_id
        INNER JOIN users u ON u.id = o.user_id
        INNER JOIN products p ON p.id = op.product_id
        WHERE p.id = ?
        AND o.status <> 'cancelled'
        ORDER BY o.order_date DESC;
    `;
    const [rows] = await pool.query(sql, [productId]);
    return res.json(rows);
}