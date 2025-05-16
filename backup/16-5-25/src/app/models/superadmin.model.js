import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";

export const superAdminmodel=async()=>
{
    const connection=await connectTodb();
    if(!connection)
    {
        return null;
    }

    const superadminmodel=connection.define('super_admin',{
      
        id:{

            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        menubar:{

            type:DataTypes.ARRAY(DataTypes.STRING)
        }


    })

    await connection.sync();
    return superadminmodel;

}