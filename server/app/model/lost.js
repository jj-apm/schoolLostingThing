'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Lost = app.model.define("lost", {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            lkind_id: {
                type: INTEGER,
                allowNull: false
            },
            lname: {
                type: STRING(255),
                allowNull: false
            },
            lplace: {
                type: STRING(255),
                allowNull: false,
            },
            ltime: {
                type: STRING(255),
                allowNull: false,
            },
            ldesc: {
                type: STRING(255),
                allowNull: false,
            },
            lphoto: {
                type: STRING(255),
                allowNull: true,
            },
            luid: {
                type: INTEGER,
                allowNull: false,
            },
            linfo_time: {
                type: DATE,
                defaultValue: NOW
            },
            lstatus: {
                type: STRING(255),
                allowNull: false
            }

        }, {
            underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
            timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
            freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
                // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        })
        // Lost.associate = function() {
        //     // 与User存在多对一关系，所以是hasOne()
        //     app.model.Lost.belongsTo(app.model.User, { foreignKey: 'luid', targetKey: 'id' });
        //     // 与Kind存在多对一关系，所以是hasOne()
        //     app.model.Lost.belongsTo(app.model.Kind, { foreignKey: 'lkind_id', targetKey: 'id' });
        //     // 与Clue存在多对一关系，所以是hasOne()
        //     app.model.Lost.belongsTo(app.model.Clue, { foreignKey: 'cid', targetKey: 'id' });


    // }
    return Lost;
};