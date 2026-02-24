function requireEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`Falta la variable de entorno requerida ${name}`);
    return value
}

const config = {
    port: Number(process.env.PORT || 3000),

    db: {
        host: requireEnv("DB_HOST"),
        user: requireEnv("DB_USER"),
        password: requireEnv("DB_PASSWORD"),
        name: requireEnv("DB_NAME"),
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10)
    }
};


export default config;