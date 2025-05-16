import { DataTypes } from "sequelize";
import { connectTodb } from "../database/database";


export const articleModel = async () => {

     const connection = await connectTodb();
    
     if (!connection) {
        return null;
     }

    const Article = connection.define('Article', {
        
        id:{
            
            type:DataTypes.INTEGER,
            autoIncrement:true
        },
        articleId: {

            type: DataTypes.STRING,
            primaryKey: true,
            allowedNull: false
        },
        userId: {

            type: DataTypes.STRING,

        },
        articleTitle: {

            type: DataTypes.STRING,
            allowedNull: false
        },
        journalsId:{
            
            type:DataTypes.STRING

        },
        Abstract:{

            type: DataTypes.TEXT,
            allowedNull: false

        },
        Keywords: {
            type: DataTypes.TEXT,


        },
        Introduction: {
            type: DataTypes.TEXT,
            allowedNull: false

        },
        Methods: {
            type: DataTypes.TEXT,
            allowedNull: false

        },
        Results: {
            type: DataTypes.TEXT,
            allowedNull: false

        },
        Discussion: {
            type: DataTypes.TEXT,
            allowedNull: false

        },
        Conclusion: {
            type: DataTypes.TEXT,


        },
        References: {
            type: DataTypes.TEXT,
            allowedNull: false

        },
        Abbreviations: {
            type: DataTypes.TEXT,


        },
        Copyright: {
            type: DataTypes.TEXT,


        },
        articleAuthor: {

            type: DataTypes.JSONB,
            allowedNull: false
        },
        articleSummary: {

            type: DataTypes.STRING(1000)
        },
        publishedDate: {

            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
        DOI: {

            type: DataTypes.STRING,
            allowedNull: false
        },
        price: {

            type: DataTypes.INTEGER
        },
        articleStatus: {

            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        volume:{
           
            type:DataTypes.INTEGER,
           
        },
        issue:{
    
            type:DataTypes.INTEGER,
            
        },
        remarks: {

            type: DataTypes.STRING(1000)
        }


    })
    
   await connection.sync();
   return Article;

}

