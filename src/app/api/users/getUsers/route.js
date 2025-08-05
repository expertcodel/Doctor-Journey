import { NextResponse } from 'next/server';
import { UserModel } from '../../../models/user.model'
import { extractErrorMessage } from '../../../../utils/errorMessage';
import { Op } from 'sequelize';
export async function POST(request) {

    const usermodel = await UserModel();
    if (!usermodel) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }


    const api_key = new Headers(request.headers).get('api_key');
    if (api_key !== process.env.NEXT_PUBLIC_SECRET_KEY) {
        return NextResponse.json({ status: false, message: "Unauthorized access" });
    }

    const getAllusers = await usermodel.findAll();
    return NextResponse.json({ status: true, getAllusers });


}


export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const usermodel = await UserModel();

    if (!usermodel) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }


    try {

        const { rows, count } = await usermodel.findAndCountAll({

            limit: 10,
            where: {

                status: true,
                [Op.or]: { userId: { [Op.iLike]: `%${name}%` }, name: { [Op.iLike]: `%${name}%` } }
            },


        })

        return NextResponse.json({ status: true, userlist: rows });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }





}