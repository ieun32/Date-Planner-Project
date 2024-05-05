import "./styles/style.css";
import * as tags from "./constants/tags";
import { dayShift, twoShift, threeShift } from "./constants/schedule";

import DatePlanner from "./utils/datePlanner";
import HighLighter from "./utils/highlighter";
class App {
  constructor({ datePlanner, highLighter }) {
    this.boyfriend = dayShift;
    this.girlfriend = dayShift;
    this.days = [];

    this.DatePlanner = datePlanner;
    this.HighLighter = highLighter;

    // 셀렉트 이벤트 리스너 등록 (남친, 여친 근무표 업데이트)
    tags.$boyfriendChooser.addEventListener("change", (event) =>
      this.selectHandler(event, "boyfriend"),
    );

    tags.$girlfriendChooser.addEventListener("change", (event) =>
      this.selectHandler(event, "girlfriend"),
    );

    // 버튼 이벤트 리스너 등록 (데이트 가능 날짜 계산 후 하이라이팅)
    tags.$checkDateButton.addEventListener("click", () => {
      const days = this.DatePlanner.findDay({
        boyfriend: this.boyfriend,
        girlfriend: this.girlfriend,
      });

      console.log(days);

      this.HighLighter.initialClassName();
      this.HighLighter.addClassName(days);
    });

    // 날짜 태그 이벤트 리스너 등록 (메모 받기 위함)
    tags.$calenderBodyItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target.childNodes);
      });
    });
  }

  /**
   * 셀렉트 이벤트 핸들러
   * @param {Event} event 이벤트 객체
   * @param {string} chooserType 남친, 여친 여부
   */
  selectHandler(event, chooserType) {
    switch (event.target.value) {
      case "dayShift":
        if (chooserType === "boyfriend") this.boyfriend = dayShift;
        if (chooserType === "girlfriend") this.girlfriend = dayShift;
        break;
      case "twoShift":
        if (chooserType === "boyfriend") this.boyfriend = twoShift;
        if (chooserType === "girlfriend") this.girlfriend = twoShift;
        break;
      case "threeShift":
        if (chooserType === "boyfriend") this.boyfriend = threeShift;
        if (chooserType === "girlfriend") this.girlfriend = threeShift;
        break;
    }
  }
}

const datePlanner = new DatePlanner();
const highLighter = new HighLighter();
new App({ datePlanner: datePlanner, highLighter: highLighter });
