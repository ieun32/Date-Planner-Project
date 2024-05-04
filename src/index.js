import "./styles/style.css";
import * as tags from "./constants/tags";

class App {
  boyfriend = "";
  girlfriend = "";

  constructor() {
    tags.$boyfriendChooser.addEventListener(
      "change",
      this.selectHandler.bind(this, "boyfriend"),
    );

    tags.$girlfriendChooser.addEventListener(
      "change",
      this.selectHandler.bind(this, "girlfriend"),
    );

    tags.$checkDateButton.addEventListener("click", this.clickHandler);
  }

  selectHandler(type, event) {
    switch (event.target.value) {
      case "day shift":
        if (type === "boyfriend") this.boyfriend = "day shift";
        if (type === "girlfriend") this.boyfriend = "day shift";
        break;
      case "two shift":
        if (type === "boyfriend") this.boyfriend = "two shift";
        if (type === "girlfriend") this.boyfriend = "two shift";
        break;
      case "three shift":
        if (type === "boyfriend") this.boyfriend = "three shift";
        if (type === "girlfriend") this.boyfriend = "three shift";
        break;
    }
  }

  clickHandler() {
    console.log("버튼 눌렀다잉");
  }
}

new App();
