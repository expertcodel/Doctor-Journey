import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../models/doctor.model.js";
import { Op } from "sequelize";
import { connectTodb } from "../../../database/database.js";
import { articleModel } from "../../../models/article.model";
import Sequelize from "sequelize";

export async function POST(request) {

    const { doctorId } = await request.json();
    const doctormodel = await doctorModel();
    const Article = await articleModel();
    const connection = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const doctordetail = await connection.query(`SELECT "Doctors"."doctorId", "Doctors"."userId","Doctors"."doctorName", "Doctors"."email", "Doctors"."number", "Doctors"."address", "Doctors"."specialization",  "Doctors"."qualification", "Doctors"."profileImage", "Doctors"."experience", "Doctors"."gallery","Doctors"."city",ARRAY_AGG(jsonb_build_object('thumbnailImage',"Videos"."thumbnailImage",'specialization',"Videos"."specialization", 'videoId', "Videos"."videoId",'doctorName', "Videos"."doctorName",'views',"Videos"."views",'videoTitle',"Videos"."videoTitle",'publishedDate',"Videos"."publishedDate")) AS videoList FROM "Doctors" LEFT JOIN "Videos" ON "Doctors"."userId"="Videos"."userId" WHERE "Doctors"."doctorId"=${doctorId}::text GROUP BY "Doctors"."doctorId"`)

        const doctorlist = await doctormodel.findAll({
            limit: 10,
            where: { status: true },
            order: [['createdAt', 'DESC']],
            attributes: ['qualification', 'profileImage', 'doctorId', 'doctorName', 'specialization']
        })


        const articlelist = await Article.findAll({
            where: {
                articleAuthor: {
                    [Op.contains]: [{ userId: doctordetail[0][0].userId }],

                }
            },
            attributes: ['articleId', 'articleTitle', 'publishedDate', 'thumbnailImage', 'articleSummary']
        })
        return NextResponse.json({ status: true, doctordetail: doctordetail[0][0], doctorlist, articlelist });


    } catch (error) {

        console.log(error);

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
    const location = JSON.parse(input.get('location'));
    // console.log(category, sort, views, specializations);

    const doctormodel = await doctorModel();
    const connection = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        const specialization = await connection.query(`SELECT "Doctors"."specialization", COUNT(*) FROM "Doctors" GROUP BY "Doctors"."specialization" ORDER BY  "Doctors"."specialization" ASC`)

        const departmentlist = await connection.query(`SELECT "Departments"."icon","Departments"."departmentName", COUNT(*) FROM "Users" INNER JOIN "Departments" ON "Users"."department_id"="Departments"."id" INNER JOIN "Doctors" ON  "Users"."userId"="Doctors"."userId" GROUP BY "Users"."department_id","Departments"."icon","Departments"."departmentName"`)

        if (category !== 'null') {

            let orderClause;

            if (sort === 'select') {
                orderClause = `ORDER BY "Doctors"."views" DESC, "Doctors"."createdAt" DESC`;
            } else if (sort === 'Newest') {
                orderClause = `ORDER BY "Doctors"."createdAt" DESC`;
            } else if (sort === 'Oldest') {
                orderClause = `ORDER BY "Doctors"."createdAt" ASC`;
            } else {
                orderClause = `ORDER BY "Doctors"."views" DESC`;
            }

            const id = await connection.query(`SELECT * FROM "Departments" WHERE "Departments"."departmentName"='${category}'`)

            if (!id[0][0]) {
                return NextResponse.json({ status: true, doctorlist: [], totalItems: 0, specialization, departmentlist: departmentlist[0] });
            }


            const cityCondition = location.length > 0 ? `AND "Doctors"."city" IN (:cities)` : '';
            const specializationCondition = specializations.length > 0 ? `AND "Doctors"."specialization" IN (:specialization)` : '';
            // const query = `SELECT "Departments"."departmentName", "Doctors"."doctorName","Doctors"."qualification","Doctors"."profileImage","Doctors"."doctorId","Doctors"."zip" FROM "Doctors" INNER JOIN "Users" ON "Doctors"."userId"="Users"."userId" INNER JOIN "Departments" ON "Users"."department_id"="Departments"."id" WHERE "Doctors"."status"=true AND "Users"."department_id"=:departmentId ${specializationCondition} ${cityCondition} AND "Doctors"."views" BETWEEN ${views[0]} AND ${views[1]} ${orderClause}  LIMIT 10 OFFSET :offset`

             let replacements = {
                departmentId: id[0][0].id,
                offset: (page - 1) * 10,
                minViews: views[0],
                maxViews: views[1],

            };


            if (location.length > 0) {
                replacements.cities = location;
            }

            if (specializations.length > 0) {
                replacements.specialization = specializations;
            }

            const baseQuery = `
FROM "Doctors"
INNER JOIN "Users" ON "Doctors"."userId" = "Users"."userId"
INNER JOIN "Departments" ON "Users"."department_id" = "Departments"."id"
WHERE "Doctors"."status" = true
AND "Users"."department_id" = :departmentId
${specializationCondition}
${cityCondition}
AND "Doctors"."views" BETWEEN :minViews AND :maxViews
`;


            const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
            const countResult = await connection.query(countQuery, {
                replacements,
                type: Sequelize.QueryTypes.SELECT,
            });
            const total = parseInt(countResult[0].total);


            const dataQuery = `
SELECT "Departments"."departmentName", "Doctors"."doctorName", "Doctors"."qualification", "Doctors"."specialization",
       "Doctors"."profileImage", "Doctors"."doctorId", "Doctors"."zip"
${baseQuery}
${orderClause}
LIMIT 10 OFFSET :offset
`;

          

            const doctorlist = await connection.query(dataQuery, {
                replacements,
                type: Sequelize.QueryTypes.SELECT,
            });


            return NextResponse.json({ status: true, doctorlist: doctorlist, totalItems: total, specialization, departmentlist: departmentlist[0] });

        }
        else {

            let where = {
                status: true, [Op.or]: { doctorName: { [Op.iLike]: `%${name}%` }, doctorId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views }
            };

            if (specializations.length > 0) {

                where.specialization = {
                    [Op.in]: [...new Set(specializations)]
                };

            }

            if (location.length > 0) {
                where.city = { [Op.in]: location }
            }


            const { rows, count } = await doctormodel.findAndCountAll({

                where: where,
                limit: 10,
                offset: (page - 1) * 10,
                order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']],
                attributes: ['shortDescription', 'profileImage', 'doctorId', 'doctorName', 'specialization', 'zip','qualification']
            })



            return NextResponse.json({ status: true, doctorlist: rows, totalItems: count, specialization, departmentlist: departmentlist[0] });
        }

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}