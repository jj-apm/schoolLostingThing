'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;

    const Clue = app.model.define("clue", {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cid: {
                type: INTEGER,
                allowNull: false
            },
            content: {
                type: TEXT,
                allowNull: false
            },
            date: {
                type: DATE,
                defaultValue: NOW
            },
            cuser_id: {
                type: INTEGER,
                allowNull: false,
            }
        }, {
            underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
            timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
            freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
                // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        })
        // Clue.associate = function() {
        //     // 与User存在多对一关系，所以是hasOne()
        //     app.model.Clue.belongsTo(app.model.User, { foreignKey: 'cuser_id', targetKey: 'id' });
        //     // 与Kind存在多对一关系，所以是hasOne()
        //     app.model.Clue.belongsTo(app.model.Lost, { foreignKey: 'cid', targetKey: 'id' });

    // }

    return Clue;
};