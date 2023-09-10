const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('user', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        address: {
			allowNull: false,
			type: DataTypes.CHAR(42),
			unique: false,
		},
        name: {
			allowNull: false,
			type: DataTypes.CHAR(45),
			unique: false,
		},
        data: {
			allowNull: true,
			type: DataTypes.BLOB,
			unique: false,
		},
		createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
	});
};