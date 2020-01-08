module.exports = (app) => {
    app.beforeStart(async function() {
        await app.model.sync({ alter: true })
        app.database = await app.mysql.createInstance(app.config.mysql.client);
    })
}