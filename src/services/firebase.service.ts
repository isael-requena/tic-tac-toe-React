import { ref, set } from "firebase/database"
import { db } from "../providers/firebase.config"
import { IUser, IRoom } from "../types/game.types";

export const writeUserData = async (user:IUser) => {
    try {
        console.log('user', user);
        const reference = ref(db, 'users/' + user.id)
        await set(reference, user);
    } catch (error) {
        console.error(error);
    }
}
export const createRoom = async (room:IRoom) => {
    try {
        const reference = ref(db, 'rooms/' + room.id);
        await set(reference, room)
    } catch (error) {
        console.error(error);
    }
}