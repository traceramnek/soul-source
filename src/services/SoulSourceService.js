import { firebaseDB } from './firebase';

export class SoulSourceService {

    static async fetchProfileById(id){
        const usersResp = firebaseDB.ref('users/' + id);
        const snapshot = await usersResp.once('value');
        const user = snapshot.val();

        return user;
    }

    static async addBookmark(profile, bookmarkObj){
        if (profile.bookmarks) {
            if (!profile.bookmarks[bookmarkObj.id]) {
                const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarks');
                const snapshot = await bookmarkRef.update({
                    [bookmarkObj.id]: bookmarkObj
                });
            }
        } else {
            const result = await firebaseDB.ref('users/' + profile.id + '/bookmarks').set({
                [bookmarkObj.id]: bookmarkObj
            });
        }
    }

    static async removeBookmark(profile, id){
        if (profile.bookmarks) {
            if (profile.bookmarks[id]) {
                const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarks');
                const snapshot = await bookmarkRef.update({
                    [id]: null // delete from db
                });
            }
        }
    }
}