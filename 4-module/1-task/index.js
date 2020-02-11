/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
    let friendsList = document.createElement("ul");
    
    if (friends) {
        for(let item of friends) {
            let friend = document.createElement("li");
            friend.textContent = `${item.firstName} ${item.lastName}`;
            friendsList.append(friend);
        }
    }

    return friendsList;
}
