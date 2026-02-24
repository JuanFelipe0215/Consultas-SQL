import pool from "../db.js";

export async function exercise11(req, res) {
    const orderNumber = req.query.order_number ?? "ORD-2026-791GLM";
    if (!orderNumber) return res.status(400).json({ message: "order_number requerido" });

    const sql = `
        SELECT
        o.order_number,
        o.order_date,
        p.name AS product_name,
        op.price_at_purchase AS sold_price
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE o.order_number = ?
        ORDER BY p.name;
    `;

    const [rows] = await pool.query(sql, [orderNumber]);
    return res.json(rows);
}


export async function exercise12(req, res) {
    const sql = `
        SELECT
        c.id,
        c.name AS category_name,
        COALESCE(SUM(op.quantity * (op.price_at_purchase - op.discount)), 0) AS total_income
        FROM categories c
        INNER JOIN products p ON p.category_id = c.id
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        WHERE o.status <> 'cancelled'
        GROUP BY c.id
        ORDER BY total_income DESC;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}



export async function exercise13(req, res) {
    const name = req.query.name ?? "Jorge";
    const lastName = req.query.last_name ?? "Piña";

    if (!name || !lastName) {
        return res.status(400).json({ message: "name y last_name requeridos" });
    }

    const sql = `
        SELECT DISTINCT p.name AS product_name
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE u.name = ? AND u.last_name = ?
        AND o.status <> 'cancelled'
        ORDER BY product_name;
    `;

    const [rows] = await pool.query(sql, [name, lastName]);
    return res.json(rows);
}


export async function exercise14(req, res) {
    const sql = `
        SELECT
        p.id,
        p.name,
        SUM(op.quantity) AS units_sold
        FROM products p
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        WHERE o.status <> 'cancelled'
        GROUP BY p.id
        ORDER BY units_sold DESC
        LIMIT 5;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}



export async function exercise15(req, res) {
    const sql = `
        SELECT
        p.id,
        p.name,
        MAX(o.order_date) AS last_sold_at
        FROM products p
        LEFT JOIN order_product op ON op.product_id = p.id
        LEFT JOIN orders o ON o.id = op.order_id AND o.status <> 'cancelled'
        GROUP BY p.id
        ORDER BY last_sold_at DESC;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise16(req, res) {
    const word = req.query.word ?? "Gamer";

    const sql = `
        SELECT DISTINCT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE o.status <> 'cancelled'
        AND p.name LIKE CONCAT('%', ?, '%')
        ORDER BY user_name;
    `;

    const [rows] = await pool.query(sql, [word]);
    return res.json(rows);
}

export async function exercise17(req, res) {
    const sql = `
        SELECT
        DATE(o.order_date) AS day,
        SUM(o.total) AS total_income
        FROM orders o
        WHERE o.status <> 'cancelled'
        GROUP BY DATE(o.order_date)
        ORDER BY day;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise18(req, res) {
    const sql = `
        SELECT
        c.id,
        c.name AS category_name
        FROM categories c
        INNER JOIN products p ON p.category_id = c.id
        LEFT JOIN order_product op ON op.product_id = p.id
        LEFT JOIN orders o ON o.id = op.order_id AND o.status <> 'cancelled'
        GROUP BY c.id
        HAVING COUNT(o.id) = 0
        ORDER BY category_name;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise19(req, res) {
    const sql = `
        SELECT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        AVG(o.total) AS avg_ticket
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE o.status <> 'cancelled'
        GROUP BY u.id
        ORDER BY avg_ticket DESC;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise20(req, res) {
    const sql = `
        SELECT DISTINCT p.name AS product_name
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE o.status = 'cancelled'
        ORDER BY product_name;
    `;

    const [rows] = await pool.query(sql);
    return res.json(rows);
}