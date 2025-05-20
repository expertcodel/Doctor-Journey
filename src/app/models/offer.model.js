import { connectTodb } from '../database/database.js'
import { DataTypes} from 'sequelize';


export const offerModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const offermodel = connection.define('Offer', {

        id: {
            
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        offerId: {
            type: DataTypes.STRING,
            defaultValue:String(Date.now()),
            primaryKey: true,
           
        },
    
        offerImage:{

            type:DataTypes.STRING,
            allowNull:false
        },
        offerContent:{

            type:DataTypes.TEXT,
            allowNull:false
        },
        status:{

            type:DataTypes.BOOLEAN,
            defaultValue:true

        },
        offerDiscount:{

            type:DataTypes.STRING,
            allowNull:false
        }


    })

    await connection.sync();
    return offermodel;
}