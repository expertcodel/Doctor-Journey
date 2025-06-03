import { NextResponse } from "next/server";
import { roleModel } from "../../../models/role.model";
import { connectTodb } from "../../../database/database";
export async function GET() {
  const roles = await roleModel();
  const allRoles = await roles.findAll({ order: [['id', 'ASC']] });
  return NextResponse.json({ status: true, allRoles })
}

export async function POST(request) {
  const { usertype } = await request.json();
  //const role = await roleModel();
  const connection = await connectTodb();
  if (!connection) {
    return NextResponse.json({ status: false, message: "database error occured!" });
  }
  // const menubar = await role.findOne({ where: { usertype } });
  // console.log(JSON.stringify(usertype).substr(0,usertype.length-1),'ragul');
  let str = "";
  usertype.forEach((type) => str += `'${type}'` + ',');
  console.log(str.substr(0, str.length - 1), 'rahul1');


  const menubar = await connection.query(`CREATE OR REPLACE FUNCTION merge_jsonb_access_recursive(input jsonb)
RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE
    result jsonb := '[]'::jsonb;
    item jsonb;
    role text;
    merged_items jsonb := '{}'::jsonb;
BEGIN
    FOR item IN
        SELECT * FROM jsonb_array_elements(input)
        WHERE (value->>'allowed')::boolean = true  
    LOOP
        role := item->>'role';

        IF merged_items ? role THEN
            DECLARE
                existing jsonb := merged_items -> role;
                merged_child jsonb := '[]'::jsonb;
                all_children jsonb := '[]'::jsonb;
                child jsonb;
            BEGIN
                FOR child IN
                    SELECT jsonb_array_elements(coalesce(existing->'child', '[]'::jsonb))
                    UNION ALL
                    SELECT jsonb_array_elements(coalesce(item->'child', '[]'::jsonb))
                LOOP
                    all_children := all_children || jsonb_build_array(child);
                END LOOP;

                IF jsonb_array_length(all_children) > 0 THEN
                    merged_child := merge_jsonb_access_recursive(all_children);
                    existing := (existing - 'child') || jsonb_build_object('child', merged_child);
                ELSE
                    existing := existing - 'child';
                END IF;

                merged_items := jsonb_set(merged_items, ARRAY[role], existing, true);
            END;
        ELSE
            IF item ? 'child' THEN
                item := (item - 'child') || jsonb_build_object(
                    'child',
                    merge_jsonb_access_recursive(item->'child')
                );
            END IF;
            merged_items := merged_items || jsonb_build_object(role, item);
        END IF;
    END LOOP;

    FOR role IN SELECT jsonb_object_keys(merged_items)
    LOOP
        result := result || jsonb_build_array(merged_items -> role);
    END LOOP;

    RETURN result;
END;
$$;

WITH all_access AS (
  SELECT jsonb_array_elements(access) AS role_item
  FROM public."Roles"
  WHERE usertype IN (${str.substr(0, str.length - 1)})
)
SELECT merge_jsonb_access_recursive(jsonb_agg(role_item)) AS merged_access
FROM all_access;



`)
  return NextResponse.json({ status: true, menubar: menubar[0][0].merged_access });

}