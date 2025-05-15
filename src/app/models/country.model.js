"use server"
import { DataTypes } from 'sequelize';
import {connectTodb} from '../database/database.js'


export const countryCode=async()=>{

    
 const sequelize=await connectTodb();
 if(!sequelize)
 {
    return null;
 }

 const countryModelschema=sequelize.define("country",{

   id:{

      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false,
      
   },
   iso:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false

   },
   name:{
      
    type:DataTypes.STRING,
    allowNull:false

   },
   nicename:{
      
    type:DataTypes.STRING,
    allowNull:false

   },

    
   iso3:{

    type:DataTypes.STRING,
    unique:true, 
    
   
   },
   numcode:{

      type:DataTypes.INTEGER,
      unique:true,
      
   },
   phonecode:{

     type:DataTypes.INTEGER,
     allowNull:false
   },
 

 })

 await sequelize.sync();
 return countryModelschema;


}