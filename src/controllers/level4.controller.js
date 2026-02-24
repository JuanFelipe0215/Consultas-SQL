import pool from "../db.js";

export async function exercise31(req, res) {
    const sql = `
        WITH user_totals AS (
        SELECT
            u.id,
            CONCAT(u.name, ' ', u.last_name) AS user_name,
            COALESCE(SUM(o.total), 0) AS total_spent
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id AND o.status <> 'cancelled'
        GROUP BY u.id
        )
        SELECT *
        FROM user_totals
        WHERE total_spent > (SELECT AVG(total_spent) FROM user_totals)
        ORDER BY total_spent DESC;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise32(req, res) {
    const sql = `
        WITH product_income AS (
        SELECT
            p.id,
            p.name,
            SUM(op.quantity * (op.price_at_purchase - op.discount)) AS income
        FROM products p
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        WHERE o.status <> 'cancelled'
        GROUP BY p.id
        ),
        total_income AS (
        SELECT SUM(income) AS total FROM product_income
        )
        SELECT
        pi.id,
        pi.name,
        pi.income,
        (pi.income / ti.total) * 100 AS pct_of_total
        FROM product_income pi
        CROSS JOIN total_income ti
        WHERE pi.income > 0.02 * ti.total
        ORDER BY pi.income DESC;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise33(req, res) {
    const sql = `
        SELECT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        MAX(o.order_date) AS last_order_date
        FROM users u
        INNER JOIN orders o ON o.user_id = u.id
        WHERE o.status <> 'cancelled'
        GROUP BY u.id
        HAVING MAX(o.order_date) < DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        ORDER BY last_order_date;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}


export async function exercise34(req, res) {
    const sql = `
        SELECT
        u.id,
        CONCAT(u.name, ' ', u.last_name) AS user_name,
        COALESCE(SUM(o.total), 0) AS total_spent,
        CASE
            WHEN COALESCE(SUM(o.total), 0) > 5000 THEN 'VIP'
            WHEN COALESCE(SUM(o.total), 0) BETWEEN 1000 AND 5000 THEN 'Frecuente'
            ELSE 'Regular'
        END AS customer_level
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id AND o.status <> 'cancelled'
        GROUP BY u.id
        ORDER BY total_spent DESC;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise35(req, res) {
    const sql = `
        SELECT
        YEAR(o.order_date) AS year,
        MONTH(o.order_date) AS month,
        SUM(o.total) AS total_income
        FROM orders o
        WHERE o.status <> 'cancelled'
        GROUP BY YEAR(o.order_date), MONTH(o.order_date)
        ORDER BY total_income DESC
        LIMIT 1;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows[0] ?? null);
}

export async function exercise36(req, res) {
    const status = (req.query.status ?? "pending").trim();

    const sql = `
        SELECT DISTINCT
        o.order_number,
        o.order_date,
        p.id AS product_id,
        p.name AS product_name,
        p.stock
        FROM orders o
        INNER JOIN order_product op ON op.order_id = o.id
        INNER JOIN products p ON p.id = op.product_id
        WHERE o.status = ?
        AND p.stock < 5
        ORDER BY o.order_date DESC, o.order_number;
    `;
    const [rows] = await pool.query(sql, [status]);
    return res.json(rows);
}

export async function exercise37(req, res) {
    const sql = `
        WITH category_income AS (
        SELECT
            c.id,
            c.name AS category_name,
            SUM(op.quantity * (op.price_at_purchase - op.discount)) AS income
        FROM categories c
        INNER JOIN products p ON p.category_id = c.id
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        WHERE o.status <> 'cancelled'
        GROUP BY c.id
        ),
        total_income AS (
        SELECT SUM(income) AS total FROM category_income
        )
        SELECT
        ci.category_name,
        ci.income,
        (ci.income / ti.total) * 100 AS pct_of_total
        FROM category_income ci
        CROSS JOIN total_income ti
        ORDER BY ci.income DESC;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise38(req, res) {
    const sql = `
        WITH city_sales AS (
        SELECT
            u.city,
            SUM(o.total) AS total_sales
        FROM orders o
        INNER JOIN users u ON u.id = o.user_id
        WHERE o.status <> 'cancelled'
        GROUP BY u.city
        )
        SELECT
        cs.city,
        cs.total_sales,
        (SELECT AVG(total_sales) FROM city_sales) AS avg_city_sales,
        (cs.total_sales - (SELECT AVG(total_sales) FROM city_sales)) AS diff_vs_avg
        FROM city_sales cs
        ORDER BY cs.total_sales DESC;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise39(req, res) {
    const sql = `
        SELECT
        YEAR(order_date) AS year,
        MONTH(order_date) AS month,
        COUNT(*) AS total_orders,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
        (SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS cancel_rate_pct
        FROM orders
        GROUP BY YEAR(order_date), MONTH(order_date)
        ORDER BY year, month;
    `;
    const [rows] = await pool.query(sql);
    return res.json(rows);
}

export async function exercise40(req, res) {
    const limit = Number(req.query.limit) || 20;

    const sql = `
        SELECT
        p1.name AS product_a,
        p2.name AS product_b,
        COUNT(*) AS times_together
        FROM order_product op1
        INNER JOIN order_product op2
        ON op1.order_id = op2.order_id
        AND op1.product_id < op2.product_id
        INNER JOIN orders o ON o.id = op1.order_id
        INNER JOIN products p1 ON p1.id = op1.product_id
        INNER JOIN products p2 ON p2.id = op2.product_id
        WHERE o.status <> 'cancelled'
        GROUP BY op1.product_id, op2.product_id
        ORDER BY times_together DESC
        LIMIT ?;
    `;
    const [rows] = await pool.query(sql, [limit]);
    return res.json(rows);
}