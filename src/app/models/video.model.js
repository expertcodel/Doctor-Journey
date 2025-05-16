import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const videoModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const videomodel = connection.define('Video', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        videoUrl: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        videoId: {

            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: String(Date.now())
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        videoTitle: {

            type: DataTypes.STRING,
            allowNull: false
        },

        thumbnailImage: {

            type: DataTypes.STRING,
            allowNull: false

        },
        doctorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doctorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        videoContent: {

            type: DataTypes.TEXT,
            allowNull: false
        },
        publishedDate: {
            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
        videoStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },


    })

    await connection.sync();
    return videomodel;


}