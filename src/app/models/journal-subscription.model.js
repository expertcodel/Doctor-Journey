import { connectTodb } from '../database/database.js'
import { DataTypes } from 'sequelize';


export const journalSubscriptionModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const subscriptionmodel = connection.define('Journal_Subscription', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        subscriptionId: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subscriptionName: {

            type: DataTypes.STRING,
            allowNull: false
        },
        status: {

            type: DataTypes.BOOLEAN,
            defaultValue: false

        },
        startDate: {

            type: DataTypes.DATE,
            allowNull:false
        },
        endDate: {

            type: DataTypes.DATE,
            allowNull: false
        },
        duration_type: {

            type: DataTypes.STRING,

        },
        duration_value: {

            type: DataTypes.INTEGER,

        },
      
        journal_id: {

            type: DataTypes.STRING,

        },
        journal_name: {

            type: DataTypes.STRING,

        },
        amount: {

            type: DataTypes.STRING,

        }


    })

    await connection.sync();
    return subscriptionmodel;
}