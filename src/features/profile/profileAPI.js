export class profileAPI {
    static fetchProfileById(){
        const usersResp = firebaseDB.ref('users/' + id);
        const snapshot = await usersResp.once('value');
        const user = snapshot.val();

        return user;
    }
}