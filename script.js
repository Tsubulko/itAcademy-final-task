import { postData } from "./script/server.js";
import { getData } from "./script/server.js";
import { updateData } from "./script/server.js";
import { renderLayout } from "./script/render.js";
import { fightField } from "./script/fight.js";

function renderPage(appData) {
    renderLayout();

    let appDataArray = JSON.parse(appData);
    console.log(appDataArray);

    const game = document.querySelector(".game");
    const profile = document.querySelector(".profile");
    const authorization = document.querySelector(".authorization");
    const navMenu = document.querySelector(".navigation");
    const navItems = document.querySelectorAll(".navItemBtn");
    const saveInfoBtn = document.querySelector(".saveInfo");
    const loginBtn = document.querySelector(".loginBtn");

    const profileUserName = profile.querySelector("#profile-username");
    const profileWins = profile.querySelector("#profile-wins");
    const profileBattles = profile.querySelector("#profile-battles");
    const profileWinrate = profile.querySelector("#profile-winrate");

    const userState = {
        userId: -1,
        userName: "",
        password: "",
        games: -1,
        wins: -1,
    };

    function updateUserState(userId, userName, password, games, wins) {
        userState.userId = userId;
        userState.userName = userName;
        userState.password = password;
        userState.games = games;
        userState.wins = wins;
    }

    function updateProfileStat(index) {
        profileUserName.innerText = appDataArray[index].userName;
        profileWins.innerText = appDataArray[index].wins;
        profileBattles.innerText = appDataArray[index].games;
        profileWinrate.innerText =
            appDataArray[index].games > 0
                ? ((Number(appDataArray[index].wins) /
                      Number(appDataArray[index].games)) *
                  100).toFixed(2)
                : 0;
    }

    function hideAll() {
        game.classList.add("hidden");
        profile.classList.add("hidden");
    }

    function showBlock(block) {
        hideAll();
        block.classList.remove("hidden");
    }

    function registrationSubmit() {
        const userNameInput = document.querySelector(".userNameInput");
        const userPasswordInput = document.querySelector(".userPasswordInput");

        if (
            userNameInput.value.length <= 3 ||
            userPasswordInput.value.length < 4
        ) {
            showMsg('Username should contains at least 3 symbols!!! Password should contains at least 4 symbols or nubers!!!', 'error');
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (isUserExist(userNameInput.value) >= 0) {
            showMsg('User exists', 'error');
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        updateUserState(
            appDataArray.length,
            userNameInput.value,
            userPasswordInput.value,
            0,
            0,
        );

        appDataArray.push({
            userId: appDataArray.length,
            userName: userNameInput.value,
            password: userPasswordInput.value,
            games: 0,
            wins: 0,
        });

        showMsg('Registration ok', 'success');
        userNameInput.value = "";
        userPasswordInput.value = "";
        updateData(JSON.stringify(appDataArray));
        authorization.classList.add("hidden");
        navMenu.classList.remove("hidden");
        game.classList.remove("hidden");
        updateProfileStat(appDataArray.length - 1);
    }

    function isUserExist(userNameInputValue) {
        for (let i = 0; i < appDataArray.length; i++) {
            if (appDataArray[i].userName === userNameInputValue) {
                return i;
            }
        }
        return -1;
    }

    function save() {
        let i = userState.userId;

        appDataArray[i].userId = userState.userId;
        appDataArray[i].userName = userState.userName;
        appDataArray[i].password = userState.password;
        appDataArray[i].games = userState.games;
        appDataArray[i].wins = userState.wins;

        updateData(JSON.stringify(appDataArray));
    }

    function loginUser() {
        const userNameInput = document.querySelector(".userNameInput");
        const userPasswordInput = document.querySelector(".userPasswordInput");
        let index = isUserExist(userNameInput.value);

        if (
            userNameInput.value.length <= 3 ||
            userPasswordInput.value.length < 4
        ) {
            showMsg('Username should contains at least 3 symbols!!! Password should contains at least 4 symbols or nubers!!!', 'error');
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (index < 0) {
            showMsg('User not found', 'error');
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (userPasswordInput.value !== appDataArray[index].password) {
            showMsg('Wrong password', 'error');
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        updateUserState(
            appDataArray[index].userId,
            appDataArray[index].userName,
            appDataArray[index].password,
            appDataArray[index].games,
            appDataArray[index].wins,
        );

        userNameInput.value = "";
        userPasswordInput.value = "";
        showMsg('Success login!', 'success');
        authorization.classList.add("hidden");
        navMenu.classList.remove("hidden");

        updateProfileStat(index);
        game.classList.remove("hidden");
    }

    // ___________________________FIGHT_______________________________________

    fightField(userState);

    navItems[0].addEventListener("click", () => {
        showBlock(game);
    });
    navItems[1].addEventListener("click", () => showBlock(profile));
    navItems[2].addEventListener("click", () => {
    game.classList.add("hidden");
    profile.classList.add("hidden");
    navMenu.classList.add("hidden");
    authorization.classList.remove("hidden");
    
    userState.userId = -1;
    userState.userName = "";
    userState.password = "";
    userState.games = -1;
    userState.wins = -1;
    
    const userNameInput = document.querySelector(".userNameInput");
    const userPasswordInput = document.querySelector(".userPasswordInput");
    if (userNameInput) userNameInput.value = "";
    if (userPasswordInput) userPasswordInput.value = "";
    
    showMsg("Logged out", 'info');
});
    navItems[3].addEventListener("click", () => save());
    saveInfoBtn.addEventListener("click", registrationSubmit);
    loginBtn.addEventListener("click", loginUser);
    navMenu.classList.add("hidden");

    hideAll();
}

getData().then((data) => {
    let appData = data;
    renderPage(appData);
});

export function showMsg(text, type = 'info') {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.style.cssText = `
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 8px 12px;
        margin: 4px;
        border-radius: 4px;
        font-size: 14px;
    `;
    
    const container = document.getElementById('messages');
    container.appendChild(msgDiv);
    
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.parentNode.removeChild(msgDiv);
        }
    }, 3000);
}