'user strict'

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

    const User = app.model.define("users", {
        id: {
            type: INTEGER(5),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: STRING(20),
            allowNull: false
        },
        password: {
            type: STRING(80),
            allowNull: false
        },
        phone: {
            type: STRING(30),
            allowNull: false,
        },
        stu_num: {
            type: STRING(30),
            allowNull: false,
        },
        status: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        score: {
            type: INTEGER(20),
            allowNull: false,
            defaultValue: 0
        },
        is_delete: {
            type: BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    })
    User.associate = function() {
        app.model.User.hasMany(app.model.Lost, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Found, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Clue, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Reply, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Transaction, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Change, { foreignKey: 'user_id', targetKey: 'id' });
        app.model.User.hasMany(app.model.Thank, { foreignKey: 'user_id', targetKey: 'id' });
    }
    return User;
};