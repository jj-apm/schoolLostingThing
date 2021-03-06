'user strict'

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

    const Claim = app.model.define("claim", {
        id: {
            type: INTEGER(3),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: STRING(10),
            allowNull: false
        },
        phone: {
            type: STRING(30),
            allowNull: false
        },
        found_id: {
            type: INTEGER(5),
            allowNull: false
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
    Claim.associate = function() {
        app.model.Claim.belongsTo(app.model.Found, { foreignKey: 'found_id', targetKey: 'id' });
    }
    return Claim;
};