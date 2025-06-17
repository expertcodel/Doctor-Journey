import { connectTodb } from '../database/database.js'
import { DataTypes } from 'sequelize';


export const paymentModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const paymentmodel = connection.define('Payment', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        paymentId: {
            type: DataTypes.STRING,
            defaultValue: String(Date.now()),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentName: {

            type: DataTypes.STRING,
            allowNull: false
        },
        paymentPrice: {

            type: DataTypes.STRING,
            allowNull: false
        },
        status: {

            type: DataTypes.BOOLEAN,
            defaultValue: false

        },
        paymentDate: {

            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
        paymentDuration: {

            type: DataTypes.STRING,

        }


    })

    await connection.sync();
    return paymentmodel;
}