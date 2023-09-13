const { DataTypes, Sequelize } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	return sequelize.define('certification', {
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
        status: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
            unique: false,
        },
		created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updated_at: {
			allowNull: false,
            type: Sequelize.DATE,
			defaultValue: sequelize.fn('NOW'),
        },
	}, {
		timestamps: false,
	});
};