import { firebaseDB } from './firebase';

export class SoulSourceService {

    static async saveUser(user){
        
        await firebaseDB.ref('users/' + user.id).set({
            id: user.id,
            name: user.name,
            email: user.email,
            profilePicPath: user.picture
        });
    }

    static async fetchProfileById(id) {
        const usersResp = firebaseDB.ref('users/' + id);
        const snapshot = await usersResp.once('value');
        const user = snapshot.val();

        return user;
    }

    static async addBookmark(profile, bookmarkObj) {
        if (profile.bookmarks) {
            if (!profile.bookmarks[bookmarkObj.id]) {
                const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarks');
                await bookmarkRef.update({
                    [bookmarkObj.id]: bookmarkObj
                });
            }
        } else {
            await firebaseDB.ref('users/' + profile.id + '/bookmarks').set({
                [bookmarkObj.id]: bookmarkObj
            });
        }
    }

    static async removeBookmark(profile, id) {
        if (profile.bookmarks) {
            if (profile.bookmarks[id]) {
                const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarks');
                await bookmarkRef.update({
                    [id]: null // delete from db
                });
            }
        }
    }

    static async removeBookmarkFromLists(profile, id) {
        if (profile.bookmarkLists) {
            //for each bk list, check if id is present in bklist.bookmarks
            // if so, remove it
            for (const listId in profile.bookmarkLists) {
                let bkList = profile.bookmarkLists[listId]
                if (bkList.bookmarks && bkList.bookmarks[id]) {
                    const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarkLists/' + listId + '/bookmarks');
                    await bookmarkRef.update({
                        [id]: null // delete from db
                    });
                }
            }
        }
    }

    static async createBookmarkList(bkList, profile) {
        //if bookmark list
        if (profile.bookmarkLists) {
            const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarkLists');
            await bookmarkRef.update({
                [bkList.id]: bkList // add new bookmark list to db
            });
        } else {
            await firebaseDB.ref('users/' + profile.id + '/bookmarkLists').set({
                [bkList.id]: bkList
            });
        }
    }

    static async removeBookmarkList(profile, id) {
        if (profile.bookmarks && profile.bookmarkLists[id]) {
            const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarkLists');
            await bookmarkRef.update({
                [id]: null // delete from db
            });
        }
    }

    static async updateBookmarkList(bkList, profile) {
        if (profile.bookmarkLists && profile.bookmarkLists[bkList.id]) {
            const bookmarkRef = firebaseDB.ref('users/' + profile.id + '/bookmarkLists');
            await bookmarkRef.update({
                [bkList.id]: bkList // add new bookmark list to db
            });
        }
    }
}