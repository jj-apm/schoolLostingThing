'user strict'

module.exports = app => {
    const { STRING, INTEGER, TEXT, DATE, NOW } = app.Sequelize;

    const Notice = app.model.define("notice", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        info: {
            type: STRING,
            allowNull: false
        },
        date: {
            type: DATE,
            allowNull: false,
            defaultValue: NOW
        },
        from_id: {
            type: INTEGER,
            allowNull: false
        },
        to_id: {
            type: INTEGER,
            allowNull: true
        },
        username: {
            type: STRING,
            allowNull: false
        },
        type: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        comment_id: {
            type: INTEGER,
            allowNull: false
        }
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    })
    Notice.associate = function() {
        app.model.Notice.belongsTo(app.model.Clue, { foreignKey: 'comment_id', targetKey: 'id' })
    }

    return Notice;
};