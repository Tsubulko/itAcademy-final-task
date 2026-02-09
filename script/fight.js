import { showMsg } from "../script.js";

export function fightField(userState) {
    const zoneNames = ["Head", "Neck", "Body", "Belly", "Legs"];
    const damage = 10;

    const game = document.querySelector(".game");

    const player = game.querySelector(".player");
    const playerName = player.querySelector("#playerName");
    const playerHealth = player.querySelector(".playerHealth");
    const playerHealthBar = player.querySelector(".healthBar");
    const playerHealthFill = playerHealthBar.querySelector(".healthFill");
    let playerHP = 150;

    const enemy = game.querySelector(".enemy");
    const enemyName = enemy.querySelector("#enemyName");
    const enemyHealth = enemy.querySelector(".enemyHealth");
    const enemyHealthBar = enemy.querySelector(".healthBar");
    const enemyHealthFill = enemyHealthBar.querySelector(".healthFill");
    let enemyHP = 150;
    const attackZonesBox = game.querySelector("#attackZones");
    const attackCheckBoxes = attackZonesBox.querySelectorAll(".zoneCheckbox");
    const defenseZonesBox = game.querySelector("#defenseZones");
    const defenseCheckBoxes = defenseZonesBox.querySelectorAll(".zoneCheckbox");
    const attackBtn = game.querySelector(".attackBtn");
    let attackSelected = null;
    let defenseSelected = [];
    const battleLog = game.querySelector("#battleLogContent");

    function updateProfileStat(index) {
        const profile = document.querySelector(".profile");
        const profileUserName = profile.querySelector("#profile-username");
        const profileWins = profile.querySelector("#profile-wins");
        const profileBattles = profile.querySelector("#profile-battles");
        const profileWinrate = profile.querySelector("#profile-winrate");

        profileUserName.innerText = userState.userName;
        profileWins.innerText = userState.wins;
        profileBattles.innerText = userState.games;
        profileWinrate.innerText =
            userState.games > 0
                ? (
                      (Number(userState.wins) / Number(userState.games)) *
                      100
                  ).toFixed(2)
                : 0;
    }

    function findSelectedCheckboxes(checkboxesArray) {
        const res = [];

        checkboxesArray.forEach((el, i) => {
            el.checked ? res.push(i) : 0;
        });

        return res;
    }

    function getRandomDir() {
        return Math.floor(Math.random() * 4);
    }

    function getTwoUniqueNum(min, max) {
        const first = Math.floor(Math.random() * (max - min + 1)) + min;
        let second;

        do {
            second = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (second === first);

        return [first, second];
    }

    function calcDamage(atk, def) {
        if (def.includes(atk)) {
            return 0;
        }
        return Math.floor(Math.random() * 5) + damage;
    }

    function updateHpValue(newHpValue, hpText, hpFillbar) {
        hpText.innerText = newHpValue;
        hpFillbar.style.width = `${(newHpValue / 150) * 100}%`;
    }

    function clearAllValues() {
        playerHP = 150;
        enemyHP = 150;
        updateHpValue(enemyHP, enemyHealth, enemyHealthFill);
        updateHpValue(playerHP, playerHealth, playerHealthFill);
    }

    function gameEnd(winner) {
        if (winner === "player") {
            userState.wins = +userState.wins + 1;
            showMsg("Victory", 'success');
        } else {
            showMsg("Lose", 'error');
        }
        userState.games = userState.games + 1;

        updateProfileStat(userState.userId);
        clearAllValues();
    }

    function checkButton() {
        const isAttackSelected = attackSelected !== null;
        const isDefenseSelected = defenseSelected.length === 2;
        
        if (isAttackSelected && isDefenseSelected) {
            attackBtn.disabled = false;
        } else {
            attackBtn.disabled = true;
        }
    }

    function calcAction() {
        let selectedAttacCheckbox = findSelectedCheckboxes(attackCheckBoxes)[0];
        let selectedDefenseCheckbox = findSelectedCheckboxes(defenseCheckBoxes);
        let enemyAttackZone = getRandomDir();
        let enemyDefenseZones = getTwoUniqueNum(0, 4);
        let myDamage = calcDamage(selectedAttacCheckbox, enemyDefenseZones);
        enemyHP = enemyHP - myDamage;
        updateHpValue(enemyHP, enemyHealth, enemyHealthFill);
        if (enemyHP <= 0) {
            gameEnd("player");
            return;
        }

        let enemyDamage = calcDamage(enemyAttackZone, selectedDefenseCheckbox);
        playerHP = playerHP - enemyDamage;
        updateHpValue(playerHP, playerHealth, playerHealthFill);
        if (playerHP <= 0) {
            gameEnd("enemy");
            return;
        }
    }
}
    
    attackBtn.addEventListener("click", calcAction);
    attackCheckBoxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                attackCheckBoxes.forEach((cb) => {
                    if (cb !== e.target) {
                        cb.checked = false;
                    }
                });
                attackSelected = index; 
            } else {
                attackSelected = null; 
            }
            checkButton();
        });
    });
    
    defenseCheckBoxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", (e) => {
            const zone = index; 
            if (e.target.checked) {
                if (!defenseSelected.includes(zone)) {
                    defenseSelected.push(zone);
                }
                if (defenseSelected.length > 2) {
                    const firstZone = defenseSelected[0];
                    defenseCheckBoxes[firstZone].checked = false;
                    defenseSelected.shift();
                }
            } else {
                defenseSelected = defenseSelected.filter(z => z !== zone);
            }
            checkButton();
        });
    });
}
