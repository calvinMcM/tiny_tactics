
let cache: string[] = [];

/**
 * Produces 16-character UUID.
 * 
 * Space is 36^16. After that, will cause infinite loop.
 * @returns 
 */
export function uuid(){
    let uid: string = "";
    while(!uid || cache.includes(uid)){
        uid = Array.from({length: 16}, () => Math.floor(Math.random() * 36).toString(36)).join("")
    }
    return uid;
}

/**
 * Frees a uuid, allowing it to be adopted elsewhere.
 * @param uuid The uuid to free
 */
export function release_uuid(uuid: string){
    cache = cache.filter(u => u !== uuid);
}