import { journalsModel } from '../../models/journals.model'
import { Op } from 'sequelize';
import { NextResponse } from 'next/server';
export async function POST(request) {

    const { checkedJournal } = await request.json();
    const journalsmodel = await journalsModel();
    if (!journalsmodel) {
        return NextResponse.json({ status: false, message: 'database error' });
    }

    try {

       
        await journalsmodel.update({ journalStatus: 'approved' }, { where: { journalsId: { [Op.in]: checkedJournal } } });
        return NextResponse.json({ status: true, message: 'journals approved successfully'});
        
    } catch (error) {
        
        console.log(error);
        
        return NextResponse.json({ status: false, message: 'some error occured'});
    }
   
}