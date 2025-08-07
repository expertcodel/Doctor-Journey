import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const journal_registrationModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const journal_registrationmodel = connection.define('journalRegistration', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        journal_id: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.STRING,
        },

        coupon_uses_id: {
            type: DataTypes.INTEGER,
        },
        registration_number: {
            type: DataTypes.STRING(20),

        },
        name: {
            type: DataTypes.STRING,

        },
        number: {
            type: DataTypes.STRING(16),

        },
        email: {
            type: DataTypes.STRING,

        },

        address: {
            type: DataTypes.STRING(5000),

        },

        city: {
            type: DataTypes.STRING,

        },

        zip: {
            type: DataTypes.STRING(12),
        },
        country: {
            type: DataTypes.STRING,
        },

        is_paid: {
            type: DataTypes.BOOLEAN,

            defaultValue: false
        },

        status: {
            type: DataTypes.BOOLEAN,

            defaultValue: true
        },
        plans: {
            type: DataTypes.JSONB,

        },
        volume: {
            type: DataTypes.STRING(5000),
        },
        journal_name: {
            type: DataTypes.STRING(5000),
        },


    })

    connection.sync();
    return journal_registrationmodel;

}