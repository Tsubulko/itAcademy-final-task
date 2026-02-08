import { postData } from "./script/server.js";
import { getData } from "./script/server.js";
import { updateData } from "./script/server.js";
import { renderLayout } from "./script/render.js";

function renderPage(appData) {
    renderLayout();

    let appDataArray = JSON.parse(appData);
    const game = document.querySelector(".game");
    const profile = document.querySelector(".profile");
    const authorization = document.querySelector(".authorization");
    const navItems = document.querySelectorAll(".navItemBtn");
    const saveInfoBtn = document.querySelector(".saveInfo");

    function hideAll() {
        game.classList.add("hidden");
        profile.classList.add("hidden");
    }

    function showBlock(block) {
        hideAll();
        block.classList.remove("hidden");
    }

    // let newUser = {
    //     userId: 1,
    //     userName: "Pavel",
    //     password: "12340",
    //     games: 10,
    //     wins: 3,
    // };
    // appDataArray.push(newUser);
    console.log(appDataArray);

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

        if (isUserExist(userNameInput.value)) {
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

        alert("Success!!!");
        userNameInput.value = "";
        userPasswordInput.value = "";
        console.log(appDataArray);
        updateData(JSON.stringify(appDataArray))
    }

    function isUserExist(userNameInputValue) {
        for (let i = 0; i < appDataArray.length; i++) {
            if (appDataArray[i].userName === userNameInputValue) {
                return true;
            }
        }
    }

    hideAll();

    navItems[0].addEventListener("click", () => {
        showData();
        showBlock(game);
    });
    navItems[1].addEventListener("click", () => showBlock(profile));
    saveInfoBtn.addEventListener("click", registrationSubmit);
}

getData().then((data) => {
    let appData = data;
    renderPage(appData);
});
