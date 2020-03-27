'user strict'

module.exports = app => {
    const { STRING, INTEGER, TEXT, DATE, NOW } = app.Sequelize;

    const Reply = app.model.define("reply", {
        id: {
            type: INTEGER(3),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        info: {
            type: TEXT,
            allowNull: false
        },
        date: {
            type: DATE,
            allowNull: false,
            defaultValue: NOW
        },
        comment_id: {
            type: INTEGER(5),
            allowNull: false
        },
        user_id: {
            type: INTEGER(5),
            allowNull: true
        },
        username: {
            type: STRING(20),
            allowNull: false
        },
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为

    })
    Reply.associate = function() {
        app.model.Reply.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' })
        app.model.Reply.belongsTo(app.model.Clue, { foreignKey: 'comment_id', targetKey: 'id' })
    }
    return Reply;
};