import { DataTypes } from "sequelize";
import { connectTodb } from "../database/database";

export const authorModel = async () => {

   const connection = await connectTodb();
   if (!connection) {
      return null;
   }

   const authormodel = connection.define('Author', {

      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true
      },
      authorId: {
         type: DataTypes.STRING,
         primaryKey: true,
         defaultValue: String(Date.now())
      },
      authorName: {

         type: DataTypes.STRING,
         allowNull: false
      },
      profileImage: {

         type: DataTypes.STRING,
         allowNull: false
      },
      videos: {

         type: DataTypes.JSONB,
        
      },
      specialization: {

         type: DataTypes.STRING,
         allowNull: false
      },
      shortDescription: {

         type: DataTypes.STRING,
         allowNull: false
      },
      views: {

         type: DataTypes.INTEGER,
         defaultValue: 0
      },
      publishedDate: {

         type: DataTypes.STRING,
         defaultValue: new Date().toLocaleDateString()
      },
      authorContent: {
         type: DataTypes.TEXT,

      },
      qualification: {
        
         type: DataTypes.STRING,
         allowNull: false
      },
      address: {
         type: DataTypes.STRING
      },
      location: {
         type: DataTypes.JSONB
      },
      status: {
         type: DataTypes.BOOLEAN,
         defaultValue: true
      },
      feedback: {
         type: DataTypes.JSONB
      },
      gallery: {
         type: DataTypes.JSONB
      },
      email: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
      },
      number: {
         type: DataTypes.STRING,
         allowNull:false
      },
      experience: {
         type: DataTypes.STRING
      },
      city: {
         type: DataTypes.STRING
      },
      country: {
         type: DataTypes.STRING
      },
      zip: {
         type: DataTypes.STRING
      },
      document: {
         type: DataTypes.JSONB
      },
      
      branchAddress: {
         type: DataTypes.STRING
      },
      branchName: {
         type: DataTypes.STRING
      },
      bankName : {
         type: DataTypes.STRING
      },
      ifsc: {
         type: DataTypes.STRING
      },
      accountNumber: {
         type: DataTypes.STRING
      },
      accountName: {
         type: DataTypes.STRING
      },
      accountType: {
         type: DataTypes.STRING
      },
      gstNumber: {
         type: DataTypes.STRING
      },



   })

   await connection.sync();
   return authormodel;
}




