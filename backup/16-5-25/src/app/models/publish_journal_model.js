import { DataTypes } from "sequelize";
import {connectTodb} from '../database/database'
import { articleModel } from "./article.model";

export const publishJournalmodel=async()=>{
const connection= await connectTodb();
const article=await articleModel();

if(!connection)
{
    return null;
}

const Publishjournal=connection.define('Publishjournal',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    journalsId:{

        type:DataTypes.STRING,
        allowNull:false
    },
    journalTitle:{
        
        type:DataTypes.STRING,
        allowNull:false
    },
    volume:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    issue:{

        type:DataTypes.INTEGER,
        allowNull:false
    },
    publishDate:{

        type:DataTypes.STRING,
        allowNull:false
    },
    imageUrl:{

        type:DataTypes.STRING
    },
    price:{

        type:DataTypes.STRING
    },
    coverSummary:{
        type:DataTypes.JSONB
    },
    editorialDetails:{
        type:DataTypes.JSONB
    },
    subscription:{
        type:DataTypes.JSONB
    }

})
    
   
   
   await connection.sync();
   return Publishjournal;



}