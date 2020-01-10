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
            auser_id: {
                type: INTEGER,
                allowNull: false
            }

        }, {
            underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
            timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
            freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
                // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为

        })
        // User.associate = function() {
        //     // 与Admin存在多对一关系，所以是hasOne()
        //     app.model.User.belongsTo(app.model.Admin, { foreignKey: 'auser_id', targetKey: 'id' });
        //     // 与Lost存在一对多关系，所以使用hasMany()
        //     app.model.User.hasMany(app.model.Lost, { foreignKey: 'luid', targetKey: 'id' });
        //     // 与Found存在一对多关系，所以使用hasMany()
        //     app.model.User.hasMany(app.model.Found, { foreignKey: 'fuid', targetKey: 'id' });
        //     // 与Argument存在一对多关系，所以使用hasMany()
        //     app.model.User.hasMany(app.model.Argument, { foreignKey: 'uid', targetKey: 'id' });
        //     // 与Clue存在一对多关系，所以使用hasMany()
        //     app.model.User.hasMany(app.model.Clue, { foreignKey: 'cuser_id', targetKey: 'id' });
        // }
    return User;
};