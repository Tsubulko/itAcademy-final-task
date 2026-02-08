import { postData } from "./script/server.js";
import { getData } from "./script/server.js";
import { updateData } from "./script/server.js";
import { renderLayout } from "./script/render.js";

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

    /** Profile stat */

    const profileUserName = profile.querySelector("#profile-username");
    const profileWins = profile.querySelector("#profile-wins");
    const profileBattles = profile.querySelector("#profile-battles");
    const profileWinrate = profile.querySelector("#profile-winrate");

    // function handleAppDataChange(){}

    function updateProfileStat(index) {
        profileUserName.innerText = appDataArray[index].userName;
        profileWins.innerText = appDataArray[index].wins;
        profileBattles.innerText = appDataArray[index].games;
        profileWinrate.innerText =
            appDataArray[index].games > 0
                ? (Number(appDataArray[index].wins) /
                  Number(appDataArray[index].games)) * 100
                : 0;
    }

    function hideAll() {
        // game.classList.add("hidden");
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
            alert(
                `Username should contains at least 3 symbols!!! \n\nPassword should contains at least 4 symbols or nubers!!!`,
            );
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (isUserExist(userNameInput.value) >= 0) {
            alert(`User already exist`);
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        appDataArray.push({
            userId: appDataArray.length,
            userName: userNameInput.value,
            password: userPasswordInput.value,
            games: 0,
            wins: 0,
        });

        alert("Success registration!!!");
        userNameInput.value = "";
        userPasswordInput.value = "";
        console.log(appDataArray);
        updateData(JSON.stringify(appDataArray));
        authorization.classList.add("hidden");
        navMenu.classList.remove("hidden");
    }

    function isUserExist(userNameInputValue) {
        for (let i = 0; i < appDataArray.length; i++) {
            if (appDataArray[i].userName === userNameInputValue) {
                return i;
            }
        }
        return -1;
    }

    function loginUser() {
        const userNameInput = document.querySelector(".userNameInput");
        const userPasswordInput = document.querySelector(".userPasswordInput");
        let index = isUserExist(userNameInput.value);
        console.log(index);

        if (
            userNameInput.value.length <= 3 ||
            userPasswordInput.value.length < 4
        ) {
            alert(
                `Username should contains at least 3 symbols!!! \n\nPassword should contains at least 4 symbols or nubers!!!`,
            );
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (index < 0) {
            alert(`User not found`);
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }

        if (userPasswordInput.value !== appDataArray[index].password) {
            alert("Incorrect password!");
            userNameInput.value = "";
            userPasswordInput.value = "";
            return;
        }
        userNameInput.value = "";
        userPasswordInput.value = "";
        alert("Success login!");
        authorization.classList.add("hidden");
        navMenu.classList.remove("hidden");

        updateProfileStat(index);
    }

    navItems[0].addEventListener("click", () => {
        showData();
        showBlock(game);
    });
    navItems[1].addEventListener("click", () => showBlock(profile));
    saveInfoBtn.addEventListener("click", registrationSubmit);
    loginBtn.addEventListener("click", loginUser);
    // navMenu.classList.add("hidden");

    hideAll();

    
}

getData().then((data) => {
    let appData = data;
    renderPage(appData);
});
