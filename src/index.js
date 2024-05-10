import "./styles/style.css";
import * as tags from "./constants/tags";
import { SCHEDULE_TYPE } from "./constants/schedule";

// import DatePlanner from "./utils/datePlanner";
// import HighLighter from "./utils/highlighter";
import Calender from "./utils/calender";
import DatePlanner from "./utils/datePlanner";
import HighLighter from "./utils/highlighter";
class App {
  constructor() {
    this.date = new Date();
    this.boyfriend = SCHEDULE_TYPE.dayShift;
    this.girlfriend = SCHEDULE_TYPE.dayShift;

    // this.DatePlanner = datePlanner;
    // this.HighLighter = highLighter;

    // 셀렉트 이벤트 리스너 등록 (남친, 여친 근무표 업데이트)
    tags.$boyfriendChooser.addEventListener("change", (event) =>
      this.selectHandler(event, "boyfriend"),
    );

    tags.$girlfriendChooser.addEventListener("change", (event) =>
      this.selectHandler(event, "girlfriend"),
    );

    // 버튼 이벤트 리스너 등록 (데이트 가능 날짜 계산 후 하이라이팅)
    tags.$checkDateButton.addEventListener(
      "click",
      this.highLightHandler.bind(this),
    );

    // 달력 초기화
    Calender.initial(this.date);

    // 달력 이동 버튼 이벤트 리스너 등록
    tags.$prevButton.addEventListener("click", () => {
      const prevDate = Calender.prevMonth(this.date);
      this.date = prevDate;
    });

    tags.$nextButton.addEventListener("click", () => {
      const nextDate = Calender.nextMonth(this.date);
      this.date = nextDate;
    });

    tags.$todayButton.addEventListener("click", () => {
      Calender.goToday();
      this.date = new Date();
    });
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

  /**
   * 하이라이트 버튼 핸들러
   */
  highLightHandler() {
    const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const countDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0,
    ).getDate();
    console.log(countDays);
    const diff = DatePlanner.getDiffInDays(firstDay);
    const startIdx_boy = DatePlanner.getStartIdxOfPattern(this.boyfriend, diff);
    const startIdx_girl = DatePlanner.getStartIdxOfPattern(
      this.girlfriend,
      diff,
    );
    const pattern_boy = DatePlanner.getMonthPattern(
      this.boyfriend,
      startIdx_boy,
      countDays,
    );
    const pattern_girl = DatePlanner.getMonthPattern(
      this.girlfriend,
      startIdx_girl,
      countDays,
    );
    const dateDays = DatePlanner.findDatedays(
      pattern_boy,
      pattern_girl,
      countDays,
    );
    console.log(diff, dateDays);
    console.log(pattern_boy, pattern_girl);
    HighLighter.initialClassName();
    HighLighter.addClassName(dateDays);
  }
}

// const datePlanner = new DatePlanner();
// const highLighter = new HighLighter();

new App();
