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
        <h2>Game Field</h2>
      </div>
    </div>
  
    <div class="profile">
      <div class="profileField">
        <h2>Profile Field</h2>
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
      <button class="logInBtn">Log In</button>
      </div>
    </div>
    `;
}
