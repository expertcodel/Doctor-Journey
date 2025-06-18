import { connectTodb } from '../database/database.js'
import { DataTypes } from 'sequelize';


export const subscriptionModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const subscriptionmodel = connection.define('Subscription', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        subscriptionId: {
            type: DataTypes.STRING,
            defaultValue: String(Date.now()),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subscriptionsId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        subscriptionName: {

            type: DataTypes.STRING,
            allowNull: false
        },
        subscriptionPrice: {

            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {

            type: DataTypes.BOOLEAN,
            defaultValue: false

        },
        startDate: {

            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
        endDate: {

            type: DataTypes.STRING,
            allowNull: false
        },
        subscriptionDuration: {

            type: DataTypes.STRING,

        },
        subscriptionType: {

            type: DataTypes.STRING,

        }


    })

    await connection.sync();
    return subscriptionmodel;
}