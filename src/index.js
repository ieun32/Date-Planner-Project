import "./styles/style.css";
import * as tags from "./constants/tags";
import { SCHEDULE_TYPE } from "./constants/schedule";

import DatePlanner from "./utils/datePlanner";
import HighLighter from "./utils/highlighter";
import Calender from "./utils/calender";
class App {
  constructor({ datePlanner, highLighter, calender }) {
    this.boyfriend = SCHEDULE_TYPE.dayShift;
    this.girlfriend = SCHEDULE_TYPE.dayShift;

    this.DatePlanner = datePlanner;
    this.HighLighter = highLighter;
    this.Calender = calender;

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

      this.HighLighter.initialClassName();
      this.HighLighter.addClassName(days);
    });

    // 달력 이동 버튼 이벤트 리스너 등록
    tags.$prevButton.addEventListener("click", () => {
      this.Calender.prevMonth();
    });

    tags.$nextButton.addEventListener("click", () => {
      this.Calender.nextMonth();
    });

    tags.$todayButton.addEventListener("click", () => {
      this.Calender.goToday();
    });

    // 달력 초기화
    this.Calender.initial();
  }

  /**
   * 셀렉트 이벤트 핸들러
   * @param {Event} event 이벤트 객체
   * @param {string} chooserType 남친, 여친 여부
   */
  selectHandler(event, chooserType) {
    const SELECT_TYPE = SCHEDULE_TYPE[event.target.value];
    if (chooserType === "boyfriend") this.boyfriend = SELECT_TYPE;
    if (chooserType === "girlfriend") this.girlfriend = SELECT_TYPE;
  }
}

const datePlanner = new DatePlanner();
const highLighter = new HighLighter();
const calender = new Calender();

new App({
  datePlanner: datePlanner,
  highLighter: highLighter,
  calender: calender,
});
