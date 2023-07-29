import { NextResponse } from "next/server"

export async function GET() {
    const { BASE_URL } = process.env

    return NextResponse.json(BASE_URL, { status: 200 })

}