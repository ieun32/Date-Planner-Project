import CalendarView from "./calenderView";
import LocalStorage from "./localstorage";

export default class Calendar {
  /**
   * 캘린더 관련 로직 초기화 혹은 업데이트
   * @param {Date} date 현재 일자
   */
  static initial(date) {
    const viewYear = date.getFullYear(); // 현재 년도
    const viewMonth = date.getMonth(); // 현재 월

    const dates = Calendar.getDates(viewYear, viewMonth);

    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(
      new Date(viewYear, viewMonth + 1, 0).getDate(),
    );

    // 캘린더 뷰 업데이트
    CalendarView.setHead(viewYear, viewMonth);
    CalendarView.setMemoDate(viewYear, viewMonth, new Date().getDate());
    CalendarView.setDates(dates, firstDateIndex, lastDateIndex);
    CalendarView.setActiveDates(viewYear, viewMonth);

    // 메모 관련 캘린더 뷰 업데이트
    const list = Calendar.getDatesOfMemo(date);
    CalendarView.displayMemoDates(list);

    // 날짜 클릭 이벤트 리스너 등록
    // 해당 날짜 활성화, 메모 불러오기
    document.querySelectorAll(".calender__item--body").forEach((item) => {
      item.addEventListener("click", (event) => {
        for (let date of document.querySelectorAll(".calender__item--this")) {
          const curDay = +event.target.childNodes[0].innerHTML;

          if (+date.innerHTML === curDay) {
            date.classList.add("calender__item--active");

            CalendarView.setMemoDate(viewYear, viewMonth, curDay);

            const memo = LocalStorage.getMemo(
              new Date(viewYear, viewMonth, curDay),
            );

            CalendarView.setMemo(memo);
          } else {
            date.classList.remove("calender__item--active");
          }
        }
      });
    });
  }

  /**
   * 현재 달의 모든 일자를 배열로 반환하는 메서드
   * @param {number} viewYear 현재 년도
   * @param {number} viewMonth 현재 월
   * @returns dates 배열
   */
  static getDates(viewYear, viewMonth) {
    const prevLast = new Date(viewYear, viewMonth, 0); // 지난 달 마지막 일자 (YYYYMMDD)
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번 달 마지막 일자 (YYYYMMDD)

    const prevDates = [];
    const thisDates = [...Array(thisLast.getDate()).keys()].map((i) => i + 1); // 이번 달 마지막 날짜 개수만큼 일자 배열 만들기
    const nextDates = [];

    const PLDate = prevLast.getDate(); // 지난 달 마지막 날 (DD)
    const PLDay = prevLast.getDay(); // 지난 달 마지막 날 요일 (0~6)
    const TLDay = thisLast.getDay(); // 이번 달 마지막 날 요일 (0~6)
    const dates = [];

    // 지난 달 마지막 날이 토요일이 아닐 경우
    // 이번 달 캘린더에 지난 달 일자 삽입 위해 prevDates 배열에 (마지막 날 - 0), (마지막 날 - 1)... 을 unshift
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }

    // 이번 달 마지막 날이 토요일이 아닐 경우
    // 이번 달 캘린더에 다음 달 일자 삽입 위해 nextDates 배열에 (7 - 마지막 요일) - 1 개수 만큼 push
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    // 날짜 배열 생성
    dates.push(...prevDates, ...thisDates, ...nextDates);
    return dates;
  }

  static getDatesOfMemo(date) {
    const curYear = date.getFullYear();
    const curMonth = date.getMonth();
    const list = LocalStorage.getList();
    const days = list
      .map((info) => {
        if (info[0] !== "girlSchedule" && info[0] !== "boySchedule") {
          const obj = JSON.parse(info[1]);
          const date = new Date(obj.date);
          if (date.getFullYear() === curYear && date.getMonth() === curMonth) {
            return date.getDate();
          }
        }
      })
      .filter((item) => item !== undefined);
    return days;
  }

  /**
   * 날짜를 이전 달로 변경하고 캘린더에 반영한 뒤 날짜 객체를 반환하는 메서드
   * @param {Date} date 현재 날짜
   * @returns 변경된 날짜 객체
   */
  static prevMonth(date) {
    const prevMonth = date.setMonth(date.getMonth() - 1);
    const prevDate = new Date(prevMonth);
    Calendar.initial(prevDate);
    return prevDate;
  }

  /**
   * 날짜를 다음 달로 변경하고 캘린더에 반영한 뒤 날짜 객체를 반환하는 메서드
   * @param {Date} date 현재 날짜
   * @returns 변경된 날짜 객체
   */
  static nextMonth(date) {
    const nextMonth = date.setMonth(date.getMonth() + 1);
    const nextDate = new Date(nextMonth);
    Calendar.initial(nextDate);
    return nextDate;
  }

  /**
   * 이번 달로 날짜 변경하고 캘린더에 반영하는 메서드
   */
  static goToday() {
    Calendar.initial(new Date());
  }
}
