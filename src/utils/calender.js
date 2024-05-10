import * as tags from "../constants/tags";

// static으로 빼고 싶음 최적화 필요
export default class Calendar {
  static initial(date) {
    const viewYear = date.getFullYear(); // 현재 년도
    const viewMonth = date.getMonth(); // 현재 월

    const prevLast = new Date(viewYear, viewMonth, 0); // 지난 달 마지막 일자 (YYYYMMDD)
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번 달 마지막 일자 (YYYYMMDD)

    const prevDates = [];
    const thisDates = [...Array(thisLast.getDate()).keys()].map((i) => i + 1); // 이번 달 마지막 날짜 개수만큼 일자 배열 만들기
    const nextDates = [];

    const PLDate = prevLast.getDate(); // 지난 달 마지막 날 (DD)
    const PLDay = prevLast.getDay(); // 지난 달 마지막 날 요일 (0~6)
    const TLDate = thisLast.getDate(); // 이번 달 마지막 날 (DD)
    const TLDay = thisLast.getDay(); // 이번 달 마지막 날 요일 (0~6)
    const dates = [];

    // 캘린더 헤드에 연도와 월 설정
    tags.$calenderHeadDate.textContent = `${viewYear}년 ${viewMonth + 1}월`;

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

  // 현재 날짜 정보를 주입 받고 이후 날짜 정보를 초기화 함수에 다시 주입한다.
  // 초기화 함수는 주입받은 날짜를 기준으로 UI를 변경해준다.
  static prevMonth(date) {
    const prevMonth = date.setMonth(date.getMonth() - 1);
    const prevDate = new Date(prevMonth);
    Calendar.initial(prevDate);
    return prevDate;
  }

  static nextMonth(date) {
    const nextMonth = date.setMonth(date.getMonth() + 1);
    const nextDate = new Date(nextMonth);
    Calendar.initial(nextDate);
    return nextDate;
  }

  static goToday() {
    Calendar.initial(new Date());
  }

  hi(date) {
    console.log(date);
  }
}
