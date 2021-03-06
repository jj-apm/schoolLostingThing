'user strict'

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

    const Change = app.model.define("change", {
        id: {
            type: INTEGER(5),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: INTEGER(5),
            allowNull: false
        },
        goods_id: {
            type: INTEGER(5),
            allowNull: false
        },
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    })
    Change.associate = function() {
        app.model.Change.belongsTo(app.model.Goods, { foreignKey: 'goods_id', targetKey: 'id' });
        app.model.Change.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' });
    }
    return Change;
};