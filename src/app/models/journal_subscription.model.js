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
            allowNull: false
        },
        journal_id: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
       
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        
        coupon_uses_id: {
            type: DataTypes.INTEGER,
        },
        registration_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
        address: {
            type: DataTypes.STRING(5000),
            allowNull: false
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false
        },

        zip: {
            type: DataTypes.STRING(12),
        },
        country: {
            type: DataTypes.STRING,
        },
      
        is_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
       
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        plans:{
           type: DataTypes.JSONB,
           allowNull: false
        }
       

    })

    connection.sync();
    return journal_registrationmodel;

}