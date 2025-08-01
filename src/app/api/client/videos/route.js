
import { videoModel } from "../../../models/video.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { doctorModel } from "../../../models/doctor.model";
import { connectTodb } from "../../../../app/database/database";
import { Op } from "sequelize";
import Sequelize from "sequelize";
export async function POST(request) {

    const { videoId } = await request.json();
    const videomodel = await videoModel();
    const doctormodel = await doctorModel();
    const connection = await connectTodb();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        const videodetail = await videomodel.findOne({
            where: { videoId }

        })

        const doctordetail = await doctormodel.findOne({
            where: { userId: videodetail.userId },
            attributes: ['profileImage', 'doctorName', 'shortDescription', 'doctorId', 'qualification', 'specialization']

        })


        const videolist = await videomodel.findAll({
            limit: 15,
            where: { videoStatus: true, userId: videodetail.userId },
            order: [['createdAt', 'DESC']],
            attributes: ['publishedDate', 'thumbnailImage', 'videoId', 'videoTitle', 'videoUrl']
        })

        const specialization = await connection.query(`SELECT public."Departments"."departmentName", public."Departments"."icon",COUNT(*) FROM public."Users" INNER JOIN public."Departments" ON public."Users"."department_id"=public."Departments"."id"  GROUP BY public."Users"."department_id",public."Departments"."departmentName",public."Departments"."icon"  ORDER BY  public."Departments"."departmentName" ASC`)


        return NextResponse.json({ status: true, videodetail, videolist, doctordetail, specialization });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const category = input.get('category');
    const sort = input.get('sort');
    const views = JSON.parse(input.get('value'));
    const specializations = JSON.parse(input.get('specialization'));
    // console.log(category, sort, views, specializations);


    const videomodel = await videoModel();
    const connection = await connectTodb();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {
        const specialization = await connection.query(`SELECT "Videos"."specialization", COUNT(*) FROM "Videos" WHERE "Videos"."videoStatus"=true GROUP BY "Videos"."specialization" `)

        const departmentlist = await connection.query(`SELECT 
    d."departmentName", 
    d."icon", 
    COUNT(v."userId") AS "count"
FROM 
    public."Videos" v
INNER JOIN 
    public."Users" u ON v."userId" = u."userId"
   
INNER JOIN 
    public."Departments" d ON u."department_id" = d."id"
WHERE v."videoStatus"=true
GROUP BY 
    d."departmentName", d."icon"
ORDER BY 
    d."departmentName" ASC;
`)

        if (category !== 'null') {

            let orderClause;

            if (sort === 'select') {
                orderClause = `ORDER BY "Videos"."views" DESC, "Videos"."createdAt" DESC`;
            } else if (sort === 'Newest') {
                orderClause = `ORDER BY "Videos"."createdAt" DESC`;
            } else if (sort === 'Oldest') {
                orderClause = `ORDER BY "Videos"."createdAt" ASC`;
            } else {
                orderClause = `ORDER BY "Videos"."views" DESC`;
            }

            const id = await connection.query(`SELECT * FROM "Departments" WHERE "Departments"."departmentName"='${category}'`)

            if (!id[0][0]) {
                return NextResponse.json({ status: true, videolist: [], totalItems: 0, specialization, departmentlist: specialization });
            }


            const specializationCondition = specializations.length > 0 ? `AND "Videos"."specialization" IN (:specialization)` : '';
            // const query = `SELECT "Departments"."departmentName", "Videos"."doctorName","Videos"."specialization","Videos"."thumbnailImage","Videos"."videoId","Videos"."videoTitle","Videos"."views" , "Videos"."publishedDate" FROM "Departments" INNER JOIN "Users" ON "Departments"."id"="Users"."department_id" INNER JOIN "Videos" ON "Users"."userId"="Videos"."userId" WHERE "Videos"."videoStatus"=true AND "Departments"."id"=:departmentId ${specializationCondition}  AND "Videos"."views" BETWEEN ${views[0]} AND ${views[1]} ${orderClause}  LIMIT 9 OFFSET :offset`

            let replacements = {

                departmentId: id[0][0].id,
                offset: (page - 1) * 9,

            }

            if (specializations.length > 0) {
                replacements.specialization = specializations;
            }


            const dataQuery = `
SELECT "Departments"."departmentName", "Videos"."doctorName", "Videos"."specialization", 
       "Videos"."thumbnailImage", "Videos"."videoId", "Videos"."videoTitle", 
       "Videos"."views", "Videos"."publishedDate"
FROM "Departments"
INNER JOIN "Users" ON "Departments"."id" = "Users"."department_id"
INNER JOIN "Videos" ON "Users"."userId" = "Videos"."userId"
WHERE "Videos"."videoStatus" = true
  AND "Departments"."id" = :departmentId
  ${specializationCondition}
  AND "Videos"."views" BETWEEN ${views[0]} AND ${views[1]}
  ${orderClause}
LIMIT 9 OFFSET :offset
`;

            const countQuery = `
SELECT COUNT(*) AS total
FROM "Departments"
INNER JOIN "Users" ON "Departments"."id" = "Users"."department_id"
INNER JOIN "Videos" ON "Users"."userId" = "Videos"."userId"
WHERE "Videos"."videoStatus" = true
  AND "Departments"."id" = :departmentId
  ${specializationCondition}
  AND "Videos"."views" BETWEEN ${views[0]} AND ${views[1]}
`;

            const [data] = await connection.query(dataQuery, { replacements });
            const [countResult] = await connection.query(countQuery, { replacements });
            const total = parseInt(countResult[0].total, 10);

            return NextResponse.json({ status: true, videolist: data, totalItems: total, specialization: specialization[0], departmentlist: departmentlist[0] });



        }

        else {

            if (specializations.length > 0) {
                const { rows, count } = await videomodel.findAndCountAll({

                    where: {
                        specialization: {
                            [Op.in]: [...new Set(specializations)]
                        }, videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views }
                    },
                    limit: 9,
                    offset: (page - 1) * 9,
                    order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']]
                })


                return NextResponse.json({ status: true, videolist: rows, totalItems: count, specialization });

            }
            else {

                const { rows, count } = await videomodel.findAndCountAll({

                    where: { videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views } },
                    limit: 9,
                    offset: (page - 1) * 9,
                    order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']]
                })



                return NextResponse.json({ status: true, videolist: rows, totalItems: count, specialization });

            }

        }




    } catch (error) {

        console.log(error);

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function PATCH(request) {
    const { videoId } = await request.json();
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const result = await videomodel.increment('views', {
            by: 1,
            where: { videoId },
            returning: true
        });


        return NextResponse.json({ status: true, views: result[0][0][0].views });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}