import {connectTodb} from '../database/database.js'
import { DataTypes } from 'sequelize';
export const activityModel=async()=>{

    const connection=await connectTodb();
    if(!connection)
    {
        return null;
    }

    const activitymodel=connection.define('Activity',{

        id:{

            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        orgId:{

            type:DataTypes.STRING,
        },
        userId:{

         type:DataTypes.STRING,
         

        },
        usertype:{

            type:DataTypes.STRING
        },
        name:{
            type:DataTypes.STRING
        },
        activity:{

            type:DataTypes.STRING,
            allowNull:false
        },
        time:{
            
            type:DataTypes.STRING,
            allowNull:false
        }


    })

    await connection.sync();
    return activitymodel;

}