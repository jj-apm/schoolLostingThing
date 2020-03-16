'user strict'

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

    const TKind = app.model.define("tKind", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: STRING(255),
            allowNull: false
        }
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为

    })
    TKind.associate = function() {
        app.model.TKind.hasOne(app.model.Transaction, { foreignKey: 'tkind_id' });
    }
    return TKind;
};