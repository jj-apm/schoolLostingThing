'user strict'

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const User = app.model.define("users", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: STRING(255),
            allowNull: false
        },
        userpassword: {
            type: STRING(255),
            allowNull: false
        },
        userphone: {
            type: STRING(255),
            allowNull: false,
        },
        stu_num: {
            type: STRING(255),
            allowNull: false,
        },
        score: {
            type: INTEGER,
            allowNull: true,
        },
        weixin: {
            type: STRING(255),
            allowNull: true,
        },
        level: {
            type: INTEGER,
            allowNull: true,
        },

    }, {
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    })
    return User;
};