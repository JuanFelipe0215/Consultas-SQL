import pool from "../db.js";


export async function exercise1(req, res) {
    const sql = `
        SELECT u.name, u.last_name, u.email, o.order_number
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE u.name = ? AND u.last_name = ?;
    `;

    const [rows] = await pool.query(sql, ["Jorge", "Piña"]);
    return res.json(rows);
}


export async function exercise2(req, res) {
    const sql = `
        SELECT o.order_number, o.order_date
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE u.email = ?
    `;

    const [rows] = await pool.query(sql, ['vcasarez@nieves.es']);
    return res.json(rows);
}

export async function exercise3(req, res) {
    const sql = `
    SELECT p.name AS product_name, c.name AS category_name
    FROM categories c
    INNER JOIN products p ON p.category_id = c.id;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise4(req, res) {
    const sql = `
        SELECT * 
        FROM users u 
        LEFT JOIN orders o ON o.user_id = u.id
        WHERE o.id IS NULL
    `

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise5(req, res) {
    const userId = Number(req.query.user_id) || 1;

    const sql = `
        SELECT 
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        COALESCE(SUM(o.total), 0) AS total_spent
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        WHERE u.id = ?
        GROUP BY u.id;
    `;

    const [rows] = await pool.query(sql, [userId]);
    return res.json(rows[0] ?? null);
}


export async function exercise6(req, res) {
    const sql = `
        SELECT status, COUNT(*) AS total_orders
        FROM orders
        GROUP BY status
        ORDER BY total_orders DESC;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise7(req, res) {
    const category = req.query.category ?? "Electrónica";

    const sql = `
        SELECT p.id, p.name, p.sale_price, c.name AS category_name
        FROM products p
        INNER JOIN categories c ON c.id = p.category_id
        WHERE c.name = ?
        ORDER BY p.sale_price DESC;
    `;

    const [rows] = await pool.query(sql, [category]);
    return res.json(rows);
}


export async function exercise8(req, res) {
    const orderNumber = req.query.order_number ?? "ORD-2026-6ZQYDZ";
    if (!orderNumber) return res.status(400).json({ message: "order_number requerido" });

    const sql = `
        SELECT op.product_id, op.quantity
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        WHERE o.order_number = ?
        ORDER BY op.product_id;
    `;

    const [rows] = await pool.query(sql, [orderNumber]);
    return res.json(rows);
}


export async function exercise9(req, res) {
    const city = req.query.city ?? "Monterrey";
    const sql = `
        SELECT DISTINCT u.id, u.name, u.last_name, u.city
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE u.city = ?
        ORDER BY u.last_name, u.name;
    `;

    const [rows] = await pool.query(sql, [city]);
    return res.json(rows);
}


export async function exercise10(req, res) {
    const sql = `
        SELECT 
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        AVG(o.total) AS avg_order_value
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        GROUP BY u.id
        ORDER BY avg_order_value DESC;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}