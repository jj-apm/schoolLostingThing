'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATEONLY, NOW, BOOLEAN, TEXT } = app.Sequelize;

    const Transaction = app.model.define("transaction", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: STRING(255),
            allowNull: false
        },
        tphoto: {
            type: STRING(255),
            allowNull: false
        },
        desc: {
            type: STRING(255),
            allowNull: false,
        },
        price: {
            type: INTEGER,
            allowNull: false
        },
        user_id: {
            type: INTEGER,
            allowNull: false
        },
        date: {
            type: DATEONLY,
            defaultValue: NOW
        },
        kind_id: {
            type: INTEGER,
            allowNull: false
        },
        status: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
            get() {
                switch (this.getDataValue('status')) {
                    case 1:
                        return '发布中'
                        break;
                    case 2:
                        return '已下架'
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
    Transaction.associate = function() {
        app.model.Transaction.belongsTo(app.model.Transkind, { foreignKey: 'kind_id', targetKey: 'id' });
        app.model.Transaction.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' })
    }
    return Transaction;
};