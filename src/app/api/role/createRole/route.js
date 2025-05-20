import { NextResponse } from "next/server";
import { roleModel } from "../../../models/role.model";
import {activityModel} from '../../../models/activity.model'
// import { UserModel } from "../../../models/user.model";


export async function POST(request)
{
    const{ 
      usertype}=await request.json();
    const activitymodel=await activityModel();
    const role=await roleModel();
    if(!role)
    {
        return NextResponse.json({status:0,message:"some error occured!"})
    }

    const isExistedrole=await role.findOne({where:{usertype}});
    if(isExistedrole)
    {
        return NextResponse.json({status:0,message:"Role already exist!"})
    }

    await role.create({

      usertype,
      access:[{

        role:'Basic',
        allowed:true,
        path:'scroll',
        child:[{role:'Email',allowed:true,path:'scroll',child:[{role:'Mail to admin',allowed:true,path:`/${usertype}/basic/email/toadmin`}]},{role:'Profile',allowed:true,path:`/${usertype}/basic/profile`},{role:'theme',allowed:true,path:`/${usertype}/basic/theme`}]
      },
      {
        role:'Manage Users',
        allowed:true,
        path:'scroll',
        child:[{

          role:'User Management',
          allowed:true,
          path:`/${usertype}/user`,
          
        },
        {
          
          role:'Role Management',
          allowed:true,
          path:`/${usertype}/role`
          
  
      },
      {
          role:'Users',
          allowed:true,
          path:`/${usertype}/users`
        }]

      },
      {

        role:'Manage Articles',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Articles',
          allowed:true,
          path:`/${usertype}/createarticle`,
          
        },
        {
          
          role:'Articles List',
          allowed:true,
          path:`/${usertype}/articlelist`
        },
        {
          
          role:'Approved Articles',
          allowed:true,
          path:`/${usertype}/articlelist`
        },
        {
          
          role:'Published Articles',
          allowed:true,
          path:`/${usertype}/publishedarticles`
        }
      ]

      },
      {

        role:'Manage Journals',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Journals',
          allowed:true,
          path:`/${usertype}/journal/createjournals`,
          
        },
        {
          
          role:'Journals List',
          allowed:true,
          path:`/${usertype}/journal/journalslist`
        },
        {
          
          role:'Approved Journals',
          allowed:true,
          path:`/${usertype}/journal/approvedjournals`
        },
        {
          
          role:'Published Journals',
          allowed:true,
          path:`/${usertype}/journal/publishedjournals`
        },
        {role:'Journals Slider',allowed:true,path:'scroll',child:[{role:'Create Slider',allowed:true,path:`/${usertype}/journal/slider/create`},{role:'Slider List',allowed:true,path:`/${usertype}/journal/slider/list`}]},{role:'Journals Offer',allowed:true,path:'scroll',child:[{role:'Create Offer',allowed:true,path:`/${usertype}/journal/offer/create`},{role:'Offer List',allowed:true,path:`/${usertype}/journal/offer/list`}]}
      ]

      },
      {

        role:'Setting',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Profile',
          allowed:true,
          path:`/${usertype}/profile`,
          
        },
        {
          
          role:'Users & Team',
          allowed:true,
          path:`/${usertype}/user`
        },
        {
          
          role:'Billing & Payments',
          allowed:true,
          path:`/${usertype}/billing`
        },
        {
          
          role:'System Activity Logs',
          allowed:true,
          path:`/${usertype}/activity`
        }
      ]

      },
      {

        role:'Manage Doctors',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Doctors',
          allowed:true,
          path:`/${usertype}/doctors/create`,
          
        },
        {
          
          role:'Doctors List',
          allowed:true,
          path:`/${usertype}/doctors/list`
        },
        {

          role:'Upload Videos',
          allowed:true,
          path:`/${usertype}/doctors/videos/create`,
          
        },
        {
          
          role:'Videos List',
          allowed:true,
          path:`/${usertype}/doctors/videos/list`
        },
       
      ]

      },
       {

        role:'Manage Authors',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Authors',
          allowed:true,
          path:`/${usertype}/authors/create`,
          
        },
        {
          
          role:'Authors List',
          allowed:true,
          path:`/${usertype}/authors/list`
        },
       
      ]

      },
      // {

      //   role:'Manage Videos',
      //   allowed:true,
      //   path:'scroll',
      //   child:[{

      //     role:'Upload Videos',
      //     allowed:true,
      //     path:`/${usertype}/videos/upload`,
          
      //   },
      //   {
          
      //     role:'Videos List',
      //     allowed:true,
      //     path:`/${usertype}/videos/list`
      //   },
       
      // ]

      // },
       {

        role:'Manage Blogs',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Blog',
          allowed:true,
          path:`/${usertype}/blog/create`,
          
        },
        {
          
          role:'Blogs List',
          allowed:true,
          path:`/${usertype}/blog`
        },
       
      ]

      },
       {

        role:'Manage Testimonials',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Testimonial',
          allowed:true,
          path:`/${usertype}/testimonial/create`,
          
        },
        {
          
          role:'Testimonials List',
          allowed:true,
          path:`/${usertype}/testimonial/list`
        },
       
      ]

      }
      
      
    ]})

  //   await activitymodel.create({

  //     userId,
  //     name,
  //     usertype,
  //     activity:'role created',
  //     time:new Date().toLocaleString()

  //  })

    

    

    return NextResponse.json({status:1,message:"saved successfully"})
}

