export function renderLayout() {
    document.querySelector("body").innerHTML = `
     <nav class="navigation">
        <ul>
            <li class="navItem">
                <button class="navItemBtn">Game</button>
            </li>
            <li class="navItem">
                <button class="navItemBtn">Profile</button>
            </li>
        </ul>
    </nav>
  
    <div class="game">
      <div class="gameField">
        <div class="header">
            <h1>Battle</h1>
        </div>
        
        <div class="text" id="status-text">Your move! Choose your attack and defense zones.</div>
        <div class="instructions" id="instructions">Choose 1 attack zone and 2 defense zones</div>

        <div class="fighters">
            <div class="player fighter">
                <img class="" src="" alt="avatar">
                <div class="playerName fighterName">Player: <span id="playerName">Player</span></div>
                <div class="healthBar">
                    <div class="healthFill" id="playerHealthBar"></div>
                </div>
                <div class="playerHelth healthText" id="playerHealthText">150/150</div>
            </div>
            <div class="zonesContainer">
                <div class="zoneSelector">
                    <h3>Attack zones</h3>
                    <div class="zoneList" id="attackZones">
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="attack-head" data-zone="head">
                            <label for="attack-head" class="zoneLabel">Head</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="attack-neck" data-zone="neck">
                            <label for="attack-neck" class="zoneLabel">Neck</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="attack-body" data-zone="body">
                            <label for="attack-body" class="zoneLabel">Body</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="attack-belly" data-zone="belly">
                            <label for="attack-belly" class="zoneLabel">Belly</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="attack-legs" data-zone="legs">
                            <label for="attack-legs" class="zoneLabel">Legs</label>
                        </div>
                    </div>
                </div>
                <div class="zoneSelector">
                    <h3>Defense zones</h3>
                    <div class="zoneList" id="defenseZones">
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="defense-head" data-zone="head">
                            <label for="defense-head" class="zoneLabel">Head</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="defense-neck" data-zone="neck">
                            <label for="defense-neck" class="zoneLabel">Neck</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="defense-body" data-zone="body">
                            <label for="defense-body" class="zoneLabel">Body</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="defense-belly" data-zone="belly">
                            <label for="defense-belly" class="zoneLabel">Belly</label>
                        </div>
                        <div class="zoneOption">
                            <input type="checkbox" class="zoneCheckbox" id="defense-legs" data-zone="legs">
                            <label for="defense-legs" class="zoneLabel">Legs</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="enemy fighter">
                <img class="" src="" alt="avatar">
                <div class="enemyName fighterName">Enemy: <span id="enemy-name">Troll</span></div>
                <div class="healthBar">
                    <div class="healthFill" id="enemy-health-bar"></div>
                </div>
                <div class="enemyrHelth healthText" id="enemy-health-text">150/150</div>
            </div>
        </div>
      </div>

      <button class="attackBtn" id="attackBtn" disabled>ATTACK!</button>

      <div class="battleLog">
            <h3>Battle log</h3>
            <div id="battleLogContent">
                <div class="logEntry">The battle has begun! Enemy issues a challenge.</div>
            </div>
        </div>
    </div>
  
    <div class="profile">
        <div class="profileField">
            <div class="avatar">img</div>
            <div class="profileInfoText">
                <h2 id="profile-username">Username</h2>
                <p>Wins: <span id="profile-wins">0</span></p>
                <p>Battles: <span id="profile-battles">0</span></p>
                <p>Winrate: <span id="profile-winrate">0</span>%</p>
            </div>
        </div>
    </div>
  
    <div class="authorization">
        <div class="authorizationField">
            <h2>Authorization Field</h2>
            <label for="userNameInput"> Username</label>
            <input class="userNameInput" name="userNameInput" type="text"></input>
            <label for="userPasswordInput">Password</label>
            <input class="userPasswordInput" name="userPasswordInput" type="text"></input>
            <button class="saveInfo">Registration</button>
            <button class="loginBtn">Login</button>
        </div>
    </div>
    `;
}