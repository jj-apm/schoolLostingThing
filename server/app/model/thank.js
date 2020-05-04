'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATEONLY, NOW, BOOLEAN } = app.Sequelize;

    const Thank = app.model.define("thank", {
        id: {
            type: INTEGER(3),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: INTEGER(5),
            allowNull: false
        },
        date: {
            type: DATEONLY,
            allowNull: false,
            defaultValue: NOW
        },
        title: {
            type: STRING(50),
            allowNull: false
        },
        desc: {
            type: STRING(255),
            allowNull: false
        },
        is_delete: {
            type: BOOLEAN,
            defaultValue: true
        },
        status: {
            type: INTEGER(5),
            allowNull: false,
            defaultValue: 0,
            get() {
                switch (this.getDataValue('status')) {
                    case 0:
                        return '待审核'
                        break;
                    case 1:
                        return '已通过'
                        break;
                }
            }
        }
    }, {
        underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    })
    Thank.associate = function() {
        app.model.Thank.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' })
    }
    return Thank;
};