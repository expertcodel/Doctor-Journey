import { DataTypes } from 'sequelize';
import { connectTodb } from '../database/database'

const randomNumber = () => {

    return String(Math.floor(9000 * Math.random() + 1000));
}

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
            defaultValue: String(new Date().getMilliseconds()) + randomNumber(),
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
        rights: {

            type: DataTypes.STRING,
            allowNull: false

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
            type: DataTypes.INTEGER,
          
        },
        issue: {

            type: DataTypes.INTEGER,
          
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
        }



    })

    await connection.sync();
    return journalsModel;

}