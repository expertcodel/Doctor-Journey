import { NextResponse } from "next/server";
import { roleModel } from "../../../models/role.model";
import { activityModel } from '../../../models/activity.model'
// import { UserModel } from "../../../models/user.model";


export async function POST(request) {
  const {
    usertype } = await request.json();
  const activitymodel = await activityModel();
  const role = await roleModel();
  if (!role) {
    return NextResponse.json({ status: 0, message: "some error occured!" })
  }

  const isExistedrole = await role.findOne({ where: { usertype } });
  if (isExistedrole) {
    return NextResponse.json({ status: 0, message: "Role already exist!" })
  }

  await role.create({

    usertype,
    access: [{

      role: 'Basic',
      allowed: true,
      path: 'scroll',
      child: [{ role: 'Email', allowed: true, path: 'scroll', child: [{ role: 'Mail to admin', allowed: true, path: `/dashboard/basic/email/toadmin` }] }, { role: 'Profile', allowed: true, path: `/dashboard/basic/profile` }, { role: 'theme', allowed: true, path: `/dashboard/basic/theme` }]
    },
    {
      role: 'Manage Users',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'User Management',
        allowed: true,
        path: `/dashboard/user`,

      },
      {

        role: 'Role Management',
        allowed: true,
        path: `/dashboard/role`


      },
      {
        role: 'Users',
        allowed: true,
        path: `/dashboard/users`
      }]

    },
    {

      role: 'Manage Articles',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Articles',
        allowed: true,
        path: `/dashboard/createarticle`,

      },
      {

        role: 'Articles List',
        allowed: true,
        path: `/dashboard/articlelist`
      },
      {

        role: 'Approved Articles',
        allowed: true,
        path: `/dashboard/approved-articles`
      },
      {

        role: 'Published Articles',
        allowed: true,
        path: `/dashboard/publishedarticles`
      }
      ]

    },
    {

      role: 'Manage Journals',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Journals',
        allowed: true,
        path: `/dashboard/journal/createjournals`,

      },
      {

        role: 'Journals List',
        allowed: true,
        path: `/dashboard/journal/journalslist`
      },
      {

        role: 'Approved Journals',
        allowed: true,
        path: `/dashboard/journal/approvedjournals`
      },
      {

        role: 'Published Journals',
        allowed: true,
        path: `/dashboard/journal/publishedjournals`
      },
      { role: 'Journals Slider', allowed: true, path: 'scroll', child: [{ role: 'Create Slider', allowed: true, path: `/dashboard/journal/slider/create` }, { role: 'Slider List', allowed: true, path: `/dashboard/journal/slider/list` }] }, { role: 'Journals Offer', allowed: true, path: 'scroll', child: [{ role: 'Create Offer', allowed: true, path: `/dashboard/journal/offer/create` }, { role: 'Offer List', allowed: true, path: `/dashboard/journal/offer/list` }] }
      ]

    },
    {

      role: 'Setting',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Profile',
        allowed: true,
        path: `/dashboard/profile`,

      },
      {

        role: 'Users & Team',
        allowed: true,
        path: `/dashboard/user`
      },
      {

        role: 'Billing & Payments',
        allowed: true,
        path: `/dashboard/billing`
      },
      {

        role: 'System Activity Logs',
        allowed: true,
        path: `/dashboard/activity`
      }
      ]

    },
    {

      role: 'Manage Doctors',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Doctors',
        allowed: true,
        path: `/dashboard/doctors/create`,

      },
      {

        role: 'Doctors List',
        allowed: true,
        path: `/dashboard/doctors/list`
      },
      {

        role: 'Upload Videos',
        allowed: true,
        path: `/dashboard/doctors/videos/create`,

      },
      {

        role: 'Videos List',
        allowed: true,
        path: `/dashboard/doctors/videos/list`
      },

      ]

    },
    {

      role: 'Manage Authors',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Authors',
        allowed: true,
        path: `/dashboard/authors/create`,

      },
      {

        role: 'Authors List',
        allowed: true,
        path: `/dashboard/authors/list`
      },

      ]

    },

     {

        role:'Manage Publishers',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Publishers',
          allowed:true,
          path:`/dashboard/publisher/create`,
          
        },
        {
          
          role:'Publishers List',
          allowed:true,
          path:`/dashboard/publisher/list`
        },
       
      ]

      },

        {

        role:'Manage Organizations',
        allowed:true,
        path:'scroll',
        child:[{

          role:'Create Organizations',
          allowed:true,
          path:`/dashboard/organization/create`,
          
        },
        {
          
          role:'Publishers List',
          allowed:true,
          path:`/dashboard/organization/list`
        },
       
      ]

      },

    {

      role: 'Manage Blogs',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Blog',
        allowed: true,
        path: `/dashboard/blog/create`,

      },
      {

        role: 'Blogs List',
        allowed: true,
        path: `/dashboard/blog`
      },

      ]

    },
    {

      role: 'Manage Testimonials',
      allowed: true,
      path: 'scroll',
      child: [{

        role: 'Create Testimonial',
        allowed: true,
        path: `/dashboard/testimonial/create`,

      },
      {

        role: 'Testimonials List',
        allowed: true,
        path: `/dashboard/testimonial/list`
      },

      ]

    }


    ]
  })

  //   await activitymodel.create({

  //     userId,
  //     name,
  //     usertype,
  //     activity:'role created',
  //     time:new Date().toLocaleString()

  //  })





  return NextResponse.json({ status: 1, message: "saved successfully" })
}



