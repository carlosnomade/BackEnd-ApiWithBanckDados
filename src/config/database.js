module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'burguer',
    database: 'contburguer',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        // createdAt: 'created_at',
        // updatedAt: 'updateed_at',
    },
};
