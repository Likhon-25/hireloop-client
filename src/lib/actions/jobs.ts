import { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page"
import { json } from "better-auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJob = async(data: JobFormData) =>{
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST", 
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}