import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import { sql } from "@vercel/postgres";

export async function POST(request: Request){
    try{
        const {email,password,name,phone} = await request.json();
        const hashedPassword = await hash(password,10);

        const response = await sql`INSERT into "user"(email,password,name,phone) VALUES (${email},${hashedPassword},${name},${phone})`
        console.log(response);
        if(response && response.rowCount > 0 &&  response.command== 'INSERT'){
            return NextResponse.json({ message: "Registration Successful" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Registration Error" }, { status: 500 });
        }
    }catch(e ){
        console.log("Error is" , e)
        return NextResponse.json({ message: e }, { status: 500 });
    }

}