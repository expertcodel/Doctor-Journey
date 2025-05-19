import { connectTodb } from '../database/database.js'
import { DataTypes} from 'sequelize';


export const testimonialModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const testimonialmodel = connection.define('Testimonial', {

        id: {
            
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        testimonialId: {
            type: DataTypes.STRING,
            defaultValue:String(Date.now()),
            primaryKey: true,
           
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
      
        },
        image:{

            type:DataTypes.STRING,
            defaultValue:'/assets1/images/users/profile.png'
        },
        designation:{

            type:DataTypes.STRING,
            allowNull:false
        },
        status:{

            type:DataTypes.BOOLEAN,
            defaultValue:true

        },
        description:{

            type:DataTypes.TEXT,
            allowNull:false
        }


    })

    await connection.sync();
    return testimonialmodel;
}