import { DataTypes } from 'sequelize';
import { connectTodb } from '../database/database'



export const journalsModel = async () => {


    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const journalsModel = connection.define('Journal', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        journalsId: {

            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,

        },
        journalsName: {

            type: DataTypes.STRING,
            allowNull: false
        },
        journalsIsbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        publisherName: {

            type: DataTypes.STRING,
            allowNull: false

        },
        description: {

            type: DataTypes.TEXT
        },
        status: {

            type: DataTypes.BOOLEAN,
            defaultValue: true

        },
        journalStatus: {

            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        frequency: {

            type: DataTypes.STRING
        },
        journalsUrl: {

            type: DataTypes.STRING,

        },
        volume: {
            type: DataTypes.STRING,

        },
        video_id: {

            type: DataTypes.STRING(5000)

        },
        publishDate: {

            type: DataTypes.STRING,

        },
        imageUrl: {

            type: DataTypes.STRING
        },
        price: {

            type: DataTypes.STRING
        },
        coverSummary: {
            type: DataTypes.JSONB
        },
        editorialDetails: {
            type: DataTypes.JSONB
        },
        subscription: {
            type: DataTypes.JSONB
        },
        journalsAuthor: {
            type: DataTypes.JSONB,
        },
        journal_slider: {
            type: DataTypes.JSONB
        },
        faqs: {
            type: DataTypes.JSONB
        },
        price_level_1: {
            type: DataTypes.STRING
        },
        price_level_2: {
            type: DataTypes.STRING
        },
        price_level_3: {
            type: DataTypes.STRING
        },
        assistance_call: {
            type: DataTypes.STRING
        },
        parent_journal: {
            type: DataTypes.STRING
        },
        subscription_plan: {
            type: DataTypes.JSONB
        }

    })

    await connection.sync();
    return journalsModel;

}