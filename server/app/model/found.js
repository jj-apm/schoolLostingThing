'user strict'

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Found = app.model.define("found", {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            fkind_id: {
                type: INTEGER,
                allowNull: false
            },
            fname: {
                type: STRING(255),
                allowNull: false
            },
            fplace: {
                type: STRING(255),
                allowNull: false,
            },
            ftime: {
                type: STRING(255),
                allowNull: false,
            },
            fdesc: {
                type: STRING(255),
                allowNull: false,
            },
            fphoto: {
                type: STRING(255),
                allowNull: true,
            },
            fuid: {
                type: INTEGER,
                allowNull: false,
            },
            finfo_time: {
                type: DATE,
                defaultValue: NOW
            },
            fstatus: {
                type: STRING(255),
                allowNull: false
            }

        }, {
            underscored: true, //使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则
            timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
            freezeTableName: true // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
                // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        })
        // Found.associate = function() {
        //     // 与User存在多对一关系，所以是hasOne()
        //     app.model.Found.belongsTo(app.model.User, { foreignKey: 'fuid', targetKey: 'id' });
        //     // 与Kind存在多对一关系，所以是hasOne()
        //     app.model.Found.belongsTo(app.model.Kind, { foreignKey: 'fkind_id', targetKey: 'id' });
        //     // 与Kind存在多对一关系，所以是hasOne()
        //     app.model.Found.hasMany(app.model.Argument, { foreignKey: 'fid', targetKey: 'id' });

    // }
    return Found;
};