'user strict'

module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;

    const Argument = app.model.define("argument", {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            uid: {
                type: INTEGER,
                allowNull: false
            },
            reason: {
                type: TEXT,
                allowNull: false
            },
            aid: {
                type: INTEGER,
                allowNull: false,
            },
            fid: {
                type: INTEGER,
                allowNull: false,
            }
        }, {
            underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
            timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
            freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
                // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        })
        // Argument.associate = function() {
        //     // 与User存在多对一关系，所以是hasOne()
        //     app.model.Argument.belongsTo(app.model.User, { foreignKey: 'uid', targetKey: 'id' });
        //     // 与Argument存在多对一关系，所以是hasOne()
        //     app.model.Argument.belongsTo(app.model.Found, { foreignKey: 'fid', targetKey: 'id' });
        //     // 与Admin存在多对一关系，所以是hasOne()
        //     app.model.Argument.belongsTo(app.model.Admin, { foreignKey: 'aid', targetKey: 'id' });
        // }
    return Argument;
};