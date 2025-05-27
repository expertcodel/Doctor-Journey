import { extractErrorMessage } from '../../../../../utils/errorMessage'
import { NextResponse } from 'next/server'
import { publishJournalmodel } from '../../../../models/publish_journal_model'
import { Op } from 'sequelize';
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const journalmodel = await publishJournalmodel();
    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await journalmodel.findAndCountAll({

            limit: 9,
            offset: (page - 1) * 9,
            where: { [Op.or]: { journalsId: { [Op.iLike]: `%${name}%` }, journalsUrl: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

//      ` SELECT
//         public."Publishjournals"."journalsId",
//             public."Publishjournals"."journalsUrl",
//                 public."Journals"."journalsName",
//                     public."Publishjournals"."price",
//                         public."Publishjournals"."imageUrl",
//                             public."Publishjournals"."publishDate",
//                                 public."Publishjournals"."coverSummary",
//                                     public."Journals"."publisherName"
//         FROM
//         public."Publishjournals"
// INNER JOIN
//         public."Journals"
//         ON
//         public."Publishjournals"."journalsId" = public."Journals"."journalsId"
//         WHERE
//         public."Publishjournals"."name" ILIKE '%searchTerm%' 
// ORDER BY
//         public."Publishjournals"."createdAt" DESC
// LIMIT 10 OFFSET 20;`


        return NextResponse.json({ status: true, journallist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}