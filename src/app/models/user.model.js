"use server"
import { DataTypes } from "sequelize";
import { connectTodb } from "../database/database.js";

export const UserModel = async () => {


    const sequelize = await connectTodb();

    if (!sequelize) {
        return null;
    }

    const usermodelSchema = sequelize.define('User', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true

        },
        userId: {

            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,


        },
        name: {

            type: DataTypes.STRING,
            allowNull: false

        },
        email: {

            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {

            type: DataTypes.STRING,
            allowNull: false
        },
        usertype: {

            type: DataTypes.JSONB,
            defaultValue: ["readers"]
        },
        mobile_number: {

            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        api_key: {

            type: DataTypes.STRING,
            // allowNull:false
        },
        login_status: {

            type: DataTypes.BOOLEAN
        },
        status: {

            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userOtp: {
            type: DataTypes.INTEGER,
        },
        mobileOtp: {
            type: DataTypes.INTEGER,
        },
        country: {
            type: DataTypes.STRING
        },
        countryCode: {

            type: DataTypes.INTEGER
        },
        joining_date: {

            type: DataTypes.STRING,
            allowNull: false
        },
        profile_img: {

            type: DataTypes.STRING,
            defaultValue: '/images/profile-bg.jpg'
        }
    })

    await sequelize.sync();
    return usermodelSchema

}