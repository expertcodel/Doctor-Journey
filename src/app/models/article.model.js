import { DataTypes } from "sequelize";
import { connectTodb } from "../database/database";
import { format } from 'date-fns';



export const articleModel = async () => {

    const connection = await connectTodb();

    if (!connection) {
        return null;
    }

    const Article = connection.define('Article', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false

        },
        articleId: {

            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        userId: {

            type: DataTypes.STRING,

        },
        articleTitle: {

            type: DataTypes.STRING,
            allowNull: false
        },
        journalsId: {

            type: DataTypes.STRING

        },
        Abstract: {

            type: DataTypes.TEXT,
            allowNull: false

        },
        Keywords: {
            type: DataTypes.TEXT,


        },
        Introduction: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        Methods: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        Results: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        Discussion: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        Conclusion: {
            type: DataTypes.TEXT,


        },
        References: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        Abbreviations: {
            type: DataTypes.TEXT,


        },
        Copyright: {
            type: DataTypes.TEXT,


        },
        articleAuthor: {

            type: DataTypes.JSONB,
            allowNull: false
        },
        articleSummary: {

            type: DataTypes.STRING(1000)
        },
        publishedDate: {

            type: DataTypes.STRING,
            defaultValue: format(new Date(), 'dd MMMM yyyy')
        },
        DOI: {

            type: DataTypes.STRING,
            allowNull: false
        },
        price: {

            type: DataTypes.INTEGER
        },
        articleStatus: {

            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        volume: {

            type: DataTypes.INTEGER,

        },
        issue: {

            type: DataTypes.INTEGER,

        },
        remarks: {

            type: DataTypes.STRING(1000)
        },
        thumbnailImage: {

            type: DataTypes.STRING,
            allowNull: false
        }


    })




    await connection.sync();
    return Article;

}

