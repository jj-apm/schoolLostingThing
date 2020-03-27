'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATEONLY, NOW, BOOLEAN, TEXT } = app.Sequelize;

    const Lost = app.model.define("lost", {
        id: {
            type: INTEGER(3),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: STRING(20),
            allowNull: false
        },
        lphoto: {
            type: STRING(80),
            allowNull: true
        },
        place: {
            type: STRING(30),
            allowNull: false
        },
        desc: {
            type: TEXT,
            allowNull: false,
        },
        date: {
            type: DATEONLY,
            allowNull: false
        },
        user_id: {
            type: INTEGER(5),
            allowNull: false
        },
        kind_id: {
            type: INTEGER(5),
            allowNull: false
        },
        status: {
            type: INTEGER(5),
            allowNull: false,
            defaultValue: 1,
            get() {
                switch (this.getDataValue('status')) {
                    case 1:
                        return '发布中'
                        break;
                    case 2:
                        return '已找到'
                        break;
                }
            }
        },
        is_delete: {
            type: BOOLEAN,
            defaultValue: true
        },
        others: {
            type: TEXT,
            allowNull: true
        }
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为

    })
    Lost.associate = function() {
        app.model.Lost.belongsTo(app.model.Kind, { foreignKey: 'kind_id', targetKey: 'id' });
        app.model.Lost.hasMany(app.model.Clue, { foreignKey: 'lost_id', targetKey: 'id' });
        app.model.Lost.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' })
    }
    return Lost;
};