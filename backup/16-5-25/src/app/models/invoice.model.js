import { defaultValueSchemable } from "sequelize/lib/utils";
import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";


export const invoiceModel=async()=>{

    const connection=await connectTodb();
    if(!connection)
    {
        return null;
    }

    const invoicemodel=connection.define('Invoice',{

        id:{

            type:DataTypes.INTEGER,
            autoIncrement:true
        },
        invoiceNumber:{

            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        customerName:{

            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowedNull:false
        },
        date:{
            type:DataTypes.STRING,
            defaultValue:new Date().toLocaleDateString()
        },
        buyerId:{
            type:DataTypes.STRING,
            allowedNull:false
        },
        sellerId:{
           
            type:DataTypes.STRING,
            allowedNull:false
        },
        itemDetails:{
            type:DataTypes.JSONB
        }

    })

    await connection.sync();
    return invoicemodel;
}