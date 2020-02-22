<template>
  <div class="calendar">
    <h3 class="year">{{ year }}</h3>

    <div class="header">
      <button @click="subtractMonth" class="header__button">
        <v-icon name="chevron-left" class="header__button__icon" />
      </button>

      <h2 class="header__title">{{ month }}</h2>

      <button @click="addMonth" class="header__button">
        <v-icon name="chevron-right" class="header__button__icon" />
      </button>
    </div>

    <ul class="weekdays">
      <li v-for="(day, index) in days" :key="day + index" class="weekday">{{ day }}</li>
    </ul>

    <ul class="dates">
      <li v-for="blank in firstDayOfMonth" :key="blank + month + 'dates'" class="blank"></li>

      <li
        v-for="(date, index) in daysInMonth"
        :key="date"
        :class="{
					'current-day':
						date == initialDate && month == initialMonth && year == initialYear,
					last:
						(firstDayOfMonth + daysInMonth) % 7 > 0 && index === daysInMonth - 1
				}"
        class="day"
      >
        <span>{{ date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  mounted() {},
  data() {
    return {
      today: this.$moment(),
      dateContext: this.$moment(),
      days: ["M", "T", "W", "T", "F", "S", "S"]
    };
  },
  methods: {
    addMonth() {
      return (this.dateContext = this.$moment(this.dateContext).add(
        1,
        "month"
      ));
    },
    subtractMonth() {
      return (this.dateContext = this.$moment(this.dateContext).subtract(
        1,
        "month"
      ));
    }
  },
  computed: {
    year() {
      return this.dateContext.format("Y");
    },
    month() {
      return this.dateContext.format("MMMM");
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    currentDate() {
      return this.dateContext.get("date");
    },
    firstDayOfMonth() {
      let firstDay = this.$moment(this.dateContext).subtract(
        this.currentDate - 1,
        "days"
      );

      let day = firstDay.weekday();
      console.log(day);

      if (day !== 0) {
        return day - 1;
      } else {
        return 6;
      }
    },
    initialDate() {
      return this.today.get("date");
    },
    initialMonth() {
      return this.today.format("MMMM");
    },
    initialYear() {
      return this.today.format("Y");
    }
  }
};
</script>

<style scoped lang="scss">
.calendar {
  width: 90%;

  .year {
    text-align: center;
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    widows: 100%;

    &__title {
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
    }

    &__button {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      background-color: transparent;
      // border-color: rgb(221, 221, 221);
      border: none;
      border-radius: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .weekdays,
  .dates {
    display: flex;
    padding: none;
    width: 100%;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    .weekday {
      border-top: 1px solid rgb(221, 221, 221);
      font-weight: bold;
      padding-bottom: 0.5rem;
      color: gray;
    }
    .weekday,
    .blank,
    .day {
      list-style: none;
      border-bottom: 1px solid rgb(221, 221, 221);
      border-left: 1px solid rgb(221, 221, 221);
      text-align: center;
      padding-top: 0.5rem;
      width: 14.25%;
      max-width: 14.25%;
      background-color: white;

      &:nth-child(7n + 0) {
        border-right: 1px solid rgb(221, 221, 221);
      }
    }

    .day {
      height: 6rem;
    }

    .current-day {
      color: $primary;
      border: 1px solid $primary;
      margin-top: -1px;
    }

    .last {
      border-right: 1px solid rgb(221, 221, 221);
    }
  }
}
</style>
