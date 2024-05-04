import "./styles/style.css";
import * as tags from "./constants/tags";

class App {
  constructor() {
    tags.$boyfriendChooser.addEventListener(
      "change",
      this.selectHandler.bind(this),
    );
  }

  selectHandler(e) {
    switch (e.target.value) {
      case "day shift":
        console.log("5일");
        break;
      case "two shift":
        console.log("3조 2교대");
        break;
      case "three shift":
        console.log("5조 3교대");
        break;
    }
  }
}

new App();
