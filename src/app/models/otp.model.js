
import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";

export const otpModel=async()=>{

const sequelize=await connectTodb();
if(!sequelize)
{
    return null;
}

const otpModelschema=sequelize.define("Otp",{
  
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{

        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    otp:{

        type:DataTypes.INTEGER,
        allowNull:false
    }

})

await sequelize.sync();
return otpModelschema;


}