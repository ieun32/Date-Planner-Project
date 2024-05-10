import * as tags from "../constants/tags";

// static으로 빼고 싶음 최적화 필요
export default class Calendar {
  constructor() {
    this.date = new Date();
    this.curDate = new Date();
  }

  initial() {
    const viewYear = this.date.getFullYear();
    const viewMonth = this.date.getMonth();

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const prevDates = [];
    const thisDates = [...Array(thisLast.getDate()).keys()].map((i) => i + 1);
    const nextDates = [];

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    const dates = [];

    // 캘린더 헤드에 연도와 월 설정
    tags.$calenderHeadDate.textContent = `${viewYear}년 ${viewMonth + 1}월`;

    // 이전 달의 날짜
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }

    // 다음 달의 날짜
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    // 날짜 배열 생성
    dates.push(...prevDates, ...thisDates, ...nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    // HTML로 변환하여 삽입
    tags.$calenderBody.innerHTML = dates
      .map((date, i) => {
        const condition =
          i >= firstDateIndex && i < lastDateIndex + 1
            ? "calender__item--this"
            : "calender__item--other";
        return `<li class="calender__item calender__item--body"><span class="${condition}">${date}</span></li>`;
      })
      .join("");

    // 오늘 날짜 스타일링
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
      for (let date of document.querySelectorAll(".calender__item--this")) {
        if (+date.innerHTML === today.getDate()) {
          date.classList.add("calender__item--active");
          tags.$memoDate.innerHTML = `${viewYear}년 ${viewMonth + 1}월 ${today.getDate()}일`;
          break;
        }
      }
    }

    // 날짜 태그 이벤트 리스너 등록 (메모 받기 위함)
    // updatedom util 필요 dom 요소가 생성, 삭제될 때마다 업데이트 필요한 tags 업데이트
    document.querySelectorAll(".calender__item--body").forEach((item) => {
      item.addEventListener("click", (event) => {
        for (let date of document.querySelectorAll(".calender__item--this")) {
          const curDay = +event.target.childNodes[0].innerHTML;
          if (+date.innerHTML === curDay) {
            date.classList.add("calender__item--active");
            tags.$memoDate.innerHTML = `${viewYear}년 ${viewMonth + 1}월 ${curDay}일`;
          } else {
            date.classList.remove("calender__item--active");
          }
        }
      });
    });
  }

  prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.initial();
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.initial();
  }

  goToday() {
    this.date = new Date();
    this.initial();
  }
}
