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

		<!-- -------------------------------------------------- -->
		<!--                    days in week                    -->
		<!-- -------------------------------------------------- -->
		<ul class="weekdays">
			<li v-for="(day, index) in days" :key="day + index" class="weekday">
				{{ day }}
			</li>
		</ul>

		<ul class="dates">
			<!-- -------------------------------------------------- -->
			<!--                     blank spots                    -->
			<!-- -------------------------------------------------- -->
			<li
				v-for="blank in firstDayOfMonth"
				:key="blank + month + 'dates'"
				class="blank"
			></li>

			<!-- -------------------------------------------------- -->
			<!--                        dates                       -->
			<!-- -------------------------------------------------- -->
			<li
				v-for="(day, index) in daysInMonth"
				:key="day.date + index"
				:class="{
					'current-day':
						day.date == initialDate &&
						month == initialMonth &&
						year == initialYear,
					last:
						(firstDayOfMonth + daysInMonth) % 7 > 0 && index === daysInMonth - 1
				}"
				class="day"
				@click.self="handleDateClick(day.moment)"
			>
				<span class="day__date">{{ day.date }}</span>

				<!-- -------------------------------------------------- -->
				<!--                        events                      -->
				<!-- -------------------------------------------------- -->

				<ul class="day__events">
					<li
						v-for="(event, innerIndex) in day.events"
						:key="event.id + innerIndex"
						@mousedown="showEvent(event)"
						class="day__events__event"
						:class="{
							'multiple-left':
								daysInMonth[index - 1] !== undefined &&
								daysInMonth[index - 1].events.some(
									item => item.title === event.title
								),
							'multiple-right':
								daysInMonth[index + 1] !== undefined &&
								daysInMonth[index + 1].events.some(
									item => item.title === event.title
								),
							passed: hasPassed(event.moment)
						}"
					>
						{{ event.title }}
					</li>
				</ul>
			</li>
		</ul>

		<!-- -------------------------------------------------- -->
		<!--                       popup                        -->
		<!-- -------------------------------------------------- -->
		<popup
			v-if="popup === true"
			@close="popup = false"
			@save="saveEvent"
			:beginning="eventStart"
			:today="today"
			:event="viewedEvent"
		></popup>

		<viewed-event
			v-if="event === true"
			:event="viewedEvent"
			@close="event = false"
			@delete="deleteEvent"
			@edit="editEvent"
		></viewed-event>
	</div>
</template>

<script>
import Popup from './Popup';
import ViewedEvent from './ViewedEvent';

export default {
	name: 'Calendar',
	components: {
		Popup,
		ViewedEvent
	},
	mounted() {},

	data() {
		return {
			today: this.$moment(),
			dateContext: this.$moment(),
			days: [
				'Maanantai',
				'Tiistai',
				'Keskiviikko',
				'Torstai',
				'Perjantai',
				'Lauantai',
				'Sunnuntai'
			],
			allEvents: [],
			popup: false,
			event: false,
			eventStart: null,
			viewedEvent: null
		};
	},
	methods: {
		editEvent({ event }) {
			console.log('edit');
			this.popup = true;
			this.viewedEvent = event;
		},
		deleteEvent({ eventId }) {
			// TODO delete for one or multiple days
			console.log('delete');
			this.allEvents = this.allEvents.filter(event => event.id !== eventId);
		},
		showEvent(event) {
			this.viewedEvent = event;
			this.event = true;
		},
		hasPassed(moment) {
			return (
				this.$moment(moment).isBefore(this.$moment(this.today)) &&
				this.$moment(moment)._i !==
					this.$moment(this.today).format('MM-DD-YYYY')
			);
		},
		handleDateClick(date) {
			this.eventStart = date;
			this.popup = true;
		},
		saveEvent(data) {
			console.log(data);
			if (data.edit === true) {
				this.allEvents.map(item =>
					item.id === data.event.id ? data.event : item
				);
			} else {
				if (!this.$moment(data.event.start).isSame(data.event.ending)) {
					// start and end not the same
					let eventDuration =
						Math.abs(
							this.$moment(data.event.start).diff(data.event.ending, 'days')
						) + 1;

					// alert(eventDuration);

					for (let i = 0; i < eventDuration; i++) {
						if (i === 0) {
							this.allEvents.push({
								id: this.$uuid.v4(),
								attachedTo: data.event.moment,
								start: data.event.start,
								ending: this.$moment(data.event.ending),
								title: data.event.title,
								description: data.event.description
							});
						} else {
							this.allEvents.push({
								id: this.$uuid.v4(),
								attachedTo: this.$moment(data.event.start).add(i, 'days'),
								start: data.event.start,
								ending: this.$moment(data.event.ending),
								title: data.event.title,
								description: data.event.description
							});
						}
					}
				} else {
					console.log('start and end the same');
					this.allEvents.push({
						id: this.$uuid.v4(),
						attachedTo: data.event.start,
						start: data.event.start,
						ending: this.$moment(data.event.ending),
						title: data.event.title,
						description: data.event.description
					});
				}
			}
			this.popup = false;
			this.viewedEvent = null;
		},
		addMonth() {
			return (this.dateContext = this.$moment(this.dateContext).add(
				1,
				'month'
			));
		},
		subtractMonth() {
			return (this.dateContext = this.$moment(this.dateContext).subtract(
				1,
				'month'
			));
		}
	},
	computed: {
		year() {
			return this.dateContext.format('Y');
		},
		month() {
			return this.dateContext.format('MMMM');
		},
		daysInMonth() {
			let numberOfDays = this.dateContext.daysInMonth();
			let days = [];

			for (let i = 0; i < numberOfDays; i++) {
				let day = i > 9 ? i : '0' + i;
				let fullDate =
					this.dateContext.format('MM') + '-' + (i + 1) + '-' + this.year;

				let events = this.allEvents.filter(item =>
					this.$moment(item.attachedTo).isSame(fullDate)
				);

				days.push({
					date: i + 1,
					moment: this.$moment(fullDate, 'MM-DD-YYYY'),
					events
				});
			}

			return days;
		},
		currentDate() {
			return this.dateContext.get('date');
		},
		firstDayOfMonth() {
			let firstDay = this.$moment(this.dateContext).subtract(
				this.currentDate - 1,
				'days'
			);

			let day = firstDay.weekday();

			if (day !== 0) {
				return day - 1;
			} else {
				return 6;
			}
		},
		initialDate() {
			return this.today.get('date');
		},
		initialMonth() {
			return this.today.format('MMMM');
		},
		initialYear() {
			return this.today.format('Y');
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
			min-height: 6rem;

			&__events {
				padding: 0;
				width: 100%;
				margin-top: 5px;

				&__event {
					list-style: none;
					background-color: $primary;

					font-size: 0.8rem;
					letter-spacing: 0.5px;
					color: white;
					padding: 4px;
					width: 95%;
					border-radius: 3px;
					margin: 0 auto;
					margin-bottom: 4px;
				}

				.multiple-left {
					margin-left: -1px;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}

				.multiple-right {
					margin-right: 0;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}

				.multiple-left.multiple-right {
					width: calc(100% + 1px);
				}

				.passed {
					opacity: 0.5;
				}
			}
		}

		.last {
			border-right: 1px solid rgb(221, 221, 221) !important;
		}

		.current-day {
			color: $primary;
			border: 1px solid $primary;
			border-right: 1px solid $primary !important;

			margin-top: -1px;
		}
	}
}
</style>
