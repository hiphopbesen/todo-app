
import pb from '@/lib/pocketbase'
export default function getLink (collectionid: string, recordid: string, filename: string): string {
    const baseurl = pb.baseUrl
    let str = baseurl+"/api/files/"+ collectionid +"/"+ recordid +"/"+ filename +""
    return str
}