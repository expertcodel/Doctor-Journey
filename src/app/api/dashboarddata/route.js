import { blogModel } from '../../models/blog.model'
import { videoModel } from '../../models/video.model'
import { UserModel } from '../../models/user.model'
import { Op } from 'sequelize';
import { NextResponse } from 'next/server';
export async function GET(request) {

  const models = await Promise.all([blogModel(), videoModel(), UserModel()]);

  try {


    const bloglist = await models[0].findAndCountAll({

      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: [
        'blogId', 'blogTitle', 'blogStatus', 'blogImage', 'blogUrl'
      ]

    })

    const videolist = await models[1].findAndCountAll({

      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: [
        'videoId', 'videoTitle', 'videoUrl', 'thumbnailImage', 'videoStatus', 'publishedDate'
      ]

    })

    const usertype=await Promise.all([models[2].findAndCountAll({where:{usertype:{[Op.contains]:['author']}}}),models[2].findAndCountAll({where:{usertype:{[Op.contains]:['doctor']}}}),models[2].findAndCountAll({where:{usertype:{[Op.contains]:['publisher']}}}),models[2].findAndCountAll({where:{usertype:{[Op.contains]:['organization']}}})]);

    return NextResponse.json({ status: true, blogdata: bloglist.rows, totalblogs: bloglist.count, videodata: videolist.rows, totalvideos: videolist.count,author:usertype[0].count,doctor:usertype[1].count,publisher:usertype[2].count,organization:usertype[3].count })



  } catch (error) {

    return NextResponse.json({ status: false, message: "some error occured!" })

  }
}

